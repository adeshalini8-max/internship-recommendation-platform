import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)

# Create/Select the database
db = client.internmatch_db

# Collections
users_collection = db.users
resumes_collection = db.resumes