# internship-recommendation-platform
AI-powered Internship Recommendation Platform built with React and FastAPI that suggests internships based on user skills and preferences.
# 🚀 Internship Recommendation Platform

An intelligent web application that recommends personalized internship opportunities based on user skills, interests, and preferences.

---

## 📌 Overview

Finding the right internship can be overwhelming. This platform simplifies the process by analyzing user input and suggesting relevant opportunities using a recommendation system.

---

## 🧠 Features

* 🎯 Personalized internship recommendations
* 🧩 Skill-based filtering
* ⚡ Fast API responses with FastAPI
* 💻 Interactive and responsive UI (React + Vite)
* 🔄 Scalable backend architecture

---

## 🏗️ Tech Stack

| Layer     | Technology       |
| --------- | ---------------- |
| Frontend  | React (Vite)     |
| Backend   | FastAPI (Python) |
| ML Engine | Scikit-learn     |
| Styling   | CSS              |

---

## 📂 Project Structure

```
portfolio/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── venv/
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the repository

```
git clone https://github.com/your-username/internship-recommendation-platform.git
cd internship-recommendation-platform
```

---

### 🔹 2. Backend Setup (FastAPI)

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on:
👉 http://127.0.0.1:8000

API Docs:
👉 http://127.0.0.1:8000/docs

---

### 🔹 3. Frontend Setup (React)

```
cd frontend
npm install
npm run dev
```

Frontend will run on:
👉 http://localhost:5173

---

## 🔄 How It Works

1. User inputs skills/interests
2. Backend processes data using recommendation logic
3. System returns relevant internship suggestions
4. Frontend displays results dynamically

---

## 🚧 Future Improvements

* 🔐 User authentication system
* 🌐 Integration with real internship/job APIs
* 📊 Advanced ML recommendation model
* 💾 Database integration

---

