// Simple test script to verify backend API is working
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

async function testAPI() {
  try {
    // Test health endpoint
    const healthResponse = await api.get('/health');
    console.log('Health check:', healthResponse.data);
    
    // Test auth endpoints
    console.log('\\nTesting authentication endpoints...');
    
    // Test login
    try {
      const loginResponse = await api.post('/auth/login', {
        email: 'admin@elearn.com',
        password: 'admin123'
      });
      console.log('Login successful:', loginResponse.data);
    } catch (error) {
      console.log('Login failed (expected if no data seeded):', error.response?.data || error.message);
    }
    
    // Test courses endpoint
    try {
      const coursesResponse = await api.get('/courses');
      console.log('\\nCourses endpoint:', coursesResponse.data);
    } catch (error) {
      console.log('\\nCourses endpoint failed:', error.response?.data || error.message);
    }
    
    console.log('\\nAPI test completed!');
  } catch (error) {
    console.error('API test failed:', error.response?.data || error.message);
  }
}

testAPI();