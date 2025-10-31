import axios from 'axios';

// Base API URL - Update this when connecting to backend
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout')
};

// Course APIs
export const courseAPI = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (courseData) => api.post('/courses', courseData),
  update: (id, courseData) => api.put(`/courses/${id}`, courseData),
  delete: (id) => api.delete(`/courses/${id}`),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`)
};

// Module APIs
export const moduleAPI = {
  create: (courseId, moduleData) => api.post(`/courses/${courseId}/modules`, moduleData),
  update: (courseId, moduleId, moduleData) => api.put(`/courses/${courseId}/modules/${moduleId}`, moduleData),
  delete: (courseId, moduleId) => api.delete(`/courses/${courseId}/modules/${moduleId}`)
};

// Quiz APIs
export const quizAPI = {
  getAll: () => api.get('/quizzes'),
  getByCourse: (courseId) => api.get(`/quizzes/course/${courseId}`),
  getById: (id) => api.get(`/quizzes/${id}`),
  create: (quizData) => api.post('/quizzes', quizData),
  update: (id, quizData) => api.put(`/quizzes/${id}`, quizData),
  delete: (id) => api.delete(`/quizzes/${id}`),
  submit: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers })
};

// Discussion APIs
export const discussionAPI = {
  getByCourse: (courseId) => api.get(`/discussions/course/${courseId}`),
  create: (discussionData) => api.post('/discussions', discussionData),
  addComment: (discussionId, commentData) => api.post(`/discussions/${discussionId}/comments`, commentData),
  like: (discussionId) => api.post(`/discussions/${discussionId}/like`),
  delete: (discussionId) => api.delete(`/discussions/${discussionId}`),
  deleteComment: (discussionId, commentId) => api.delete(`/discussions/${discussionId}/comments/${commentId}`)
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getEnrollments: () => api.get('/users/enrollments'),
  updateProgress: (courseId, moduleId) => api.post('/users/progress', { courseId, moduleId })
};

// Analytics APIs
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getCourseStats: (courseId) => api.get(`/analytics/courses/${courseId}`),
  exportCourseStats: (courseId) => api.get(`/analytics/courses/${courseId}/export`, { responseType: 'blob' }),
  exportUserStats: () => api.get('/analytics/users/export', { responseType: 'blob' })
};

export default api;