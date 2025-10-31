# SkillNest Backend API

This is the backend API for the SkillNest e-learning platform, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Role-based access control (Admin, Learner)
- Course management (CRUD operations)
- Quiz system with auto-grading and negative marking
- Discussion forum with comments
- User progress tracking
- Analytics dashboard for admins
- Password reset and email verification
- CSV export functionality for analytics

## Prerequisites

- Node.js v14 or higher
- MongoDB database
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

5. Update the `.env` file with your configuration:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/verify-email/:token` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

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
- `GET /api/analytics/courses/:courseId/export` - Export course analytics as CSV
- `GET /api/analytics/users/export` - Export user analytics as CSV

## Seeding Data

To populate the database with sample data:

```bash
node seeder.js -i
```

To delete all data:

```bash
node seeder.js -d
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Application environment | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/skillnest |
| JWT_SECRET | Secret key for JWT tokens | (required) |
| JWT_EXPIRE | JWT token expiration | 30d |

## Project Structure

```
backend/
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── config/          # Configuration files
├── .env             # Environment variables
├── server.js        # Application entry point
└── seeder.js        # Data seeding script
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## License

This project is licensed under the MIT License.