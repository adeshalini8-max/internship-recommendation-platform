from fastapi import APIRouter, HTTPException, status
from models import UserSignup, UserLogin, TokenResponse
from database import users_collection
from auth import get_password_hash, verify_password, create_access_token
from datetime import datetime

router = APIRouter()

@router.post("/signup", response_model=TokenResponse)
async def signup(user: UserSignup):
    # 1. Check if user already exists
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # 2. Hash the password
    hashed_password = get_password_hash(user.password)
    
    # 3. Save to MongoDB
    new_user = {
        "fullName": user.fullName,
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    result = users_collection.insert_one(new_user)
    
    # 4. Generate JWT Token
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(result.inserted_id),
            "fullName": user.fullName,
            "email": user.email
        }
    }

@router.post("/login", response_model=TokenResponse)
async def login(user: UserLogin):
    # 1. Find user by email
    db_user = users_collection.find_one({"email": user.email})
    
    # 2. Verify existence and password
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # 3. Generate JWT Token
    access_token = create_access_token(data={"sub": user.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(db_user["_id"]),
            "fullName": db_user["fullName"],
            "email": db_user["email"]
        }
    }