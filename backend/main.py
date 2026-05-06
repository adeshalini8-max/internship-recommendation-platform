import requests
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# =========================
# FASTAPI APP
# =========================

app = FastAPI(title="AI Internship Recommendation API")


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# RAPID API CONFIG
# =========================

RAPID_API_KEY = "abc8f24941msh2b05739e813230ep1c2db0jsnb5cc6114bbe6"

RAPID_API_HOST = "jsearch.p.rapidapi.com"


# =========================
# FALLBACK INTERNSHIPS
# =========================

fallback_internships = [
    {
        "id": 1,
        "title": "Software Engineering Intern",
        "company": "Google",
        "description": "Work on scalable software systems.",
        "required_skills": ["Python", "Java", "Algorithms"],
        "location": "California",
        "apply_link": "https://careers.google.com/",
    },
    {
        "id": 2,
        "title": "Machine Learning Intern",
        "company": "Meta",
        "description": "Build AI and ML systems.",
        "required_skills": ["Python", "TensorFlow", "Machine Learning"],
        "location": "Remote",
        "apply_link": "https://www.metacareers.com/",
    },
]


# =========================
# USER MODEL
# =========================

class UserProfile(BaseModel):
    skills: List[str]


# =========================
# FETCH REAL JOBS
# =========================

def fetch_real_jobs(skills):

    query = " ".join(skills) + " internship"

    url = "https://jsearch.p.rapidapi.com/search"

    querystring = {
        "query": query,
        "page": "1",
        "num_pages": "1"
    }

    headers = {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": RAPID_API_HOST
    }

    try:

        response = requests.get(
            url,
            headers=headers,
            params=querystring
        )

        data = response.json()

        jobs = []

        if "data" in data:

            for idx, job in enumerate(data["data"]):

                description = job.get("job_description") or ""

                jobs.append({
                    "id": idx + 1,
                    "title": job.get("job_title"),
                    "company": job.get("employer_name"),
                    "description": description[:300],
                    "location": job.get("job_city") or "Remote",
                    "apply_link": job.get("job_apply_link"),
                    "required_skills": skills
                })

        return jobs

    except Exception as e:

        print("API ERROR:", e)

        return fallback_internships


# =========================
# ROOT ROUTE
# =========================

@app.get("/")
def read_root():
    return {
        "message": "AI Internship Recommendation API Running"
    }


# =========================
# GET LIVE INTERNSHIPS
# =========================

@app.get("/api/internships")
def get_internships():

    return fetch_real_jobs(["Python"])


# =========================
# RECOMMENDATIONS
# =========================

@app.post("/api/recommendations")
def get_recommendations(profile: UserProfile):

    if not profile.skills:
        return fallback_internships

    # Fetch LIVE jobs
    internships_data = fetch_real_jobs(profile.skills)

    if not internships_data:
        internships_data = fallback_internships

    # Convert to dataframe
    df = pd.DataFrame(internships_data)

    # Combine text
    df["combined_text"] = (
        df["description"] + " " +
        df["required_skills"].apply(
            lambda x: " ".join(x)
        )
    )

    user_text = " ".join(profile.skills)

    # TF-IDF
    vectorizer = TfidfVectorizer()

    all_text = df["combined_text"].tolist() + [user_text]

    tfidf_matrix = vectorizer.fit_transform(all_text)

    # Similarity
    cosine_sim = cosine_similarity(
        tfidf_matrix[-1],
        tfidf_matrix[:-1]
    )

    df["match_score"] = cosine_sim[0]

    # Sort
    recommended_df = df.sort_values(
        by="match_score",
        ascending=False
    )

    top_recommendations = recommended_df.head(10).to_dict("records")

    # Match %
    for rec in top_recommendations:

        rec["match_percentage"] = int(
            rec["match_score"] * 100
        )

        # Skill Gap Analysis
        user_skills_lower = [
            s.lower() for s in profile.skills
        ]

        matched_skills = []
        missing_skills = []

        for skill in rec["required_skills"]:

            if skill.lower() in user_skills_lower:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        rec["matched_skills"] = matched_skills
        rec["missing_skills"] = missing_skills

    return top_recommendations