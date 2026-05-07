import os
import requests
import pandas as pd
import json
import io
import PyPDF2
import google.generativeai as genai
from datetime import datetime, timedelta
from typing import List, Optional
from dotenv import load_dotenv

# FastAPI
from fastapi import FastAPI, HTTPException, status, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# ML/AI
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Database & Security
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from passlib.context import CryptContext
from jose import JWTError, jwt

# ==========================================
# CONFIGURATION & ENV LOADING
# ==========================================
load_dotenv()

# Required Environment Variables
RAPID_API_KEY = os.getenv("RAPID_API_KEY")
RAPID_API_HOST = os.getenv("RAPID_API_HOST", "jsearch.p.rapidapi.com")
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-here")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# ==========================================
# GEMINI 2.5 FLASH SETUP
# ==========================================
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

generation_config = {
  "temperature": 0.2, # Low temp for structured, factual JSON output
  "response_mime_type": "application/json",
}
gemini_model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    generation_config=generation_config
)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts text from PDF bytes."""
    reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

# ==========================================
# DATABASE SETUP (With Health Check)
# ==========================================
print("⏳ Connecting to MongoDB...")
try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("✅ MongoDB Connected Successfully!")
except ConnectionFailure:
    print("❌ MongoDB Connection Failed! Check your MONGO_URI.")
except Exception as e:
    print(f"❌ Unexpected DB Error: {e}")

db = client.internmatch_db
users_collection = db.users

# ==========================================
# SECURITY SETUP
# ==========================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ==========================================
# MODELS
# ==========================================
class UserSignup(BaseModel):
    fullName: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfile(BaseModel):
    skills: List[str]

# ==========================================
# APP INITIALIZATION
# ==========================================
app = FastAPI(title="InternMatch AI - Production API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# ROUTES: AUTHENTICATION
# ==========================================
@app.post("/api/auth/signup", tags=["Authentication"])
async def signup(user: UserSignup):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_dict = user.dict()
    user_dict["password"] = get_password_hash(user.password)
    user_dict["created_at"] = datetime.utcnow()
    
    result = users_collection.insert_one(user_dict)
    token = create_access_token(data={"sub": user.email})
    
    return {"access_token": token, "token_type": "bearer", "user": {"id": str(result.inserted_id), "email": user.email}}

@app.post("/api/auth/login", tags=["Authentication"])
async def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user": {"email": user.email}}

# ==========================================
# ROUTES: AI RESUME PARSING (GEMINI)
# ==========================================
@app.post("/api/upload-resume", tags=["AI Processing"])
async def upload_and_analyze_resume(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are currently supported.")
    
    try:
        # Read the uploaded PDF file
        file_bytes = await file.read()
        resume_text = extract_text_from_pdf(file_bytes)
        
        if not resume_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from this PDF.")

        # Prompt Gemini 2.5 Flash to act as an ATS
        prompt = f"""
        Act as an expert ATS (Applicant Tracking System) and IT Recruiter.
        Analyze the following resume text and extract the key information.
        
        You MUST return ONLY a valid JSON object with the following exact keys:
        - "atsScore": an integer between 0 and 100 representing the resume's strength.
        - "extractedRole": a string representing the best-fit job title (e.g., "Frontend Developer").
        - "extractedSkills": an array of strings containing the top 5-8 technical skills found.
        - "domain": a string categorizing the resume. MUST be one of: "Frontend", "Backend", "Full Stack", "Machine Learning", "Design", or "All".

        Resume Text:
        {resume_text}
        """

        response = gemini_model.generate_content(prompt)
        ai_data = json.loads(response.text)
        
        return {
            "status": "success",
            "isNewUpload": True,
            "atsScore": ai_data.get("atsScore", 70),
            "extractedRole": ai_data.get("extractedRole", "Software Engineer"),
            "extractedSkills": ai_data.get("extractedSkills", []),
            "domain": ai_data.get("domain", "All")
        }

    except Exception as e:
        print(f"Resume Processing Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process resume with AI.")

# ==========================================
# ROUTES: JOB SEARCH & ML RECOMMENDATIONS
# ==========================================
def fetch_real_jobs(skills):
    query = f"{' '.join(skills)} internship"
    url = f"https://{RAPID_API_HOST}/search"
    headers = {"X-RapidAPI-Key": RAPID_API_KEY, "X-RapidAPI-Host": RAPID_API_HOST}
    
    try:
        response = requests.get(url, headers=headers, params={"query": query, "num_pages": "1"})
        response.raise_for_status()
        data = response.json()
        
        jobs = []
        for idx, job in enumerate(data.get("data", [])):
            jobs.append({
                "id": idx + 1,
                "title": job.get("job_title"),
                "company": job.get("employer_name"),
                "description": job.get("job_description", "")[:500],
                "location": job.get("job_city", "Remote"),
                "apply_link": job.get("job_apply_link"),
                "required_skills": skills 
            })
        return jobs
    except Exception as e:
        print(f"Job API Error: {e}")
        return []

@app.post("/api/recommendations", tags=["AI Recommendations"])
async def get_recommendations(profile: UserProfile):
    if not profile.skills:
        raise HTTPException(status_code=400, detail="No skills provided")

    jobs = fetch_real_jobs(profile.skills)
    if not jobs:
        return {"message": "No jobs found", "data": []}

    df = pd.DataFrame(jobs)
    df["combined_text"] = df["description"] + " " + df["title"]
    user_text = " ".join(profile.skills)

    vectorizer = TfidfVectorizer()
    all_text = df["combined_text"].tolist() + [user_text]
    tfidf_matrix = vectorizer.fit_transform(all_text)
    
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    df["match_percentage"] = (cosine_sim[0] * 100).astype(int)
    
    # Sort and filter
    df = df.sort_values(by="match_percentage", ascending=False)
    return df.to_dict("records")

# ==========================================
# ROUTES: SYSTEM STATUS
# ==========================================
@app.get("/api/db-status", tags=["Health"])
async def db_status():
    try:
        client.admin.command('ping')
        return {"status": "connected", "database": db.name}
    except:
        return {"status": "disconnected"}

@app.get("/", tags=["Health"])
async def root():
    return {"message": "InternMatch AI API is live"}