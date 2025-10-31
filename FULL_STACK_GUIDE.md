# SkillNest Full Stack Guide

This guide explains how to set up and run the complete SkillNest e-learning platform with both frontend and backend.

## Project Structure

```
├── backend/              # Node.js/Express backend API
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── config/          # Configuration files
│   ├── .env             # Environment variables
│   ├── server.js        # Application entry point
│   └── seeder.js        # Data seeding script
├── src/                 # React frontend application
├── package.json         # Frontend package configuration
└── backend/package.json # Backend package configuration
```

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or cloud instance)
3. **npm** or **yarn** package manager

## Setup Instructions

### 1. Install Dependencies

First, install frontend dependencies:
```bash
npm install
```

Then, install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:
```bash
cd backend
cp .env.example .env
```

Update the `.env` file with your configuration:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillnest
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
```

### 3. Start MongoDB

Make sure MongoDB is running on your system. If you have MongoDB installed locally:
```bash
mongod
```

Or use a cloud MongoDB service like MongoDB Atlas and update the `MONGODB_URI` accordingly.

### 4. Seed the Database (Optional)

To populate the database with sample data:
```bash
cd backend
node seeder.js -i
```

### 5. Run the Application

You have two options to run the application:

#### Option A: Run Frontend and Backend Separately

In one terminal, start the backend:
```bash
cd backend
npm run dev
```

In another terminal, start the frontend:
```bash
npm run dev
```

#### Option B: Run Both Together

From the root directory:
```bash
npm run dev:full
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Backend Health Check**: http://localhost:5000/api/health

## API Documentation

The backend provides a complete REST API for all frontend features:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course (Admin only)
- `PUT /api/courses/:id` - Update a course (Admin only)
- `DELETE /api/courses/:id` - Delete a course (Admin only)
- `POST /api/courses/:id/enroll` - Enroll in a course

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/course/:courseId` - Get quizzes for a specific course
- `GET /api/quizzes/:id` - Get a specific quiz
- `POST /api/quizzes` - Create a new quiz (Admin only)
- `PUT /api/quizzes/:id` - Update a quiz (Admin only)
- `DELETE /api/quizzes/:id` - Delete a quiz (Admin only)
- `POST /api/quizzes/:id/submit` - Submit quiz answers

### Discussions
- `GET /api/discussions/course/:courseId` - Get discussions for a course
- `POST /api/discussions` - Create a new discussion
- `POST /api/discussions/:id/like` - Like a discussion
- `POST /api/discussions/:id/comments` - Add a comment to a discussion
- `DELETE /api/discussions/:id` - Delete a discussion (Admin or author)
- `DELETE /api/discussions/:id/comments/:commentId` - Delete a comment (Admin or author)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/enrollments` - Get user enrollments
- `POST /api/users/progress` - Update user progress

### Analytics (Admin only)
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/courses/:courseId` - Get course-specific analytics

## Development Workflow

1. **Frontend Development**: Work in the `src/` directory
2. **Backend Development**: Work in the `backend/` directory
3. **API Integration**: The frontend already has API calls configured in `src/utils/api.js`
4. **Testing**: Use the provided test scripts or tools like Postman

## Deployment

For production deployment:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Set `NODE_ENV=production` in the backend `.env` file

3. Deploy the backend and frontend to your preferred hosting platform

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: 
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in the `.env` file

2. **Port Conflicts**:
   - Change the `PORT` in the backend `.env` file
   - Update the API base URL in `src/utils/api.js` if needed

3. **CORS Errors**:
   - The backend already includes CORS middleware
   - Ensure you're using the correct API endpoints

### Need Help?

- Check the individual README files in each directory
- Review the API documentation
- Examine the source code for implementation details