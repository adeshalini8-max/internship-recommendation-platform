import axios from 'axios';

// Create a central Axios instance pointing to your FastAPI backend
const API = axios.create({
  baseURL: 'http://localhost:8000', 
});

// Automatically attach the JWT token to every request if the user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 1. Authentication Endpoints (Used by Login & Signup)
export const authApi = {
  signup: (data) => API.post('/api/auth/signup', data),
  login: (data) => API.post('/api/auth/login', data),
};

// 2. AI Resume Endpoints (Used by ResumeUploader)
export const internApi = {
  uploadResume: (formData) => API.post('/api/upload-resume', formData, {
    headers: {
      // Must be multipart/form-data for file uploads
      'Content-Type': 'multipart/form-data', 
    },
  }),
};

// 3. Internship Matching Endpoints (Used by Recommendations)
export const jobApi = {
  getRecommendations: (skills) => API.post('/api/recommendations', { skills }),
};

export default API;