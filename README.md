# SkillNest - E-Learning Platform (React)

A modern, responsive E-Learning web application built with React, featuring role-based access for Admin and Learner users.

## 🚀 Features

### Authentication
- Login and Registration
- Password visibility toggle
- Input validation
- Role-based authentication (Admin/Learner)
- Password reset functionality
- Email verification

### Learner Features
- **Dashboard**: Overview of enrolled courses, progress tracking, upcoming quizzes
- **Course Browser**: Search and filter courses by level
- **Course Player**: Video and PDF materials viewer with progress tracking
- **Quiz System**: 
  - Timed quizzes with countdown
  - Multiple question types (MCQ, True/False, Short Answer)
  - Question navigation and marking for review
  - Auto-grading with detailed results
  - Negative marking for incorrect answers
- **Discussion Forum**: 
  - Course-specific threads
  - Comments and likes
  - Profanity filter

### Admin Features
- **Admin Dashboard**: Analytics overview with charts and statistics
- **Course Management**: Create, edit, delete courses and modules
- **Quiz Management**: Create and manage quizzes and assessments
- **Discussion Moderation**: Monitor and moderate discussions
- **Analytics Export**: Export course and user analytics as CSV

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Footer.jsx
│   ├── QuizTimer.jsx
│   ├── PDFViewer.jsx
│   ├── VideoPlayer.jsx
│   ├── DiscussionThread.jsx
│   └── DashboardWidget.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   ├── Quiz.jsx
│   ├── Discussion.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminCourseManager.jsx
│   └── AdminQuizManager.jsx
├── context/
│   ├── AuthContext.jsx
│   └── UserRoleContext.jsx
├── utils/
│   ├── api.js
│   └── mockData.js
├── styles/
│   ├── global.css
│   ├── layout.css
│   └── components.css
├── App.jsx
└── main.jsx
```

## 🛠️ Tech Stack

- **Framework**: React 19.2.0 with Vite 7.1.12
- **Routing**: React Router DOM v7.9.5
- **State Management**: Context API
- **HTTP Client**: Axios 1.13.1
- **Icons**: Lucide React 0.548.0
- **Styling**: Modern CSS (Custom)

## 📦 Installation

### Frontend

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

### Backend

1. **Navigate to backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env` file in the backend directory with the following:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillnest
JWT_SECRET=skillnest_jwt_secret_key_here
JWT_EXPIRE=30d
```

4. **Run development server**:
```bash
npm run dev
```

5. **Seed the database with sample data**:
```bash
node seeder.js -i
```

## 🔐 Demo Credentials

### Admin Account
- Email: `admin@elearn.com`
- Password: `admin123`

### Learner Account
- Email: `learner@elearn.com`
- Password: `learner123`

## 🎯 Key Components

### Authentication System
- Uses Context API for global auth state
- Persists login state in localStorage
- Role-based route protection
- Password reset and email verification

### Quiz System
- **Timer**: Countdown with warning at 5 minutes
- **Question Types**: MCQ, True/False, Short Answer
- **Visual States**: Answered, Unanswered, Marked for Review
- **Auto-Grading**: Immediate feedback for objective questions
- **Negative Marking**: Deducts marks for incorrect answers

### Discussion Forum
- **Profanity Filter**: Client-side regex-based filtering
- **Threading**: Nested comments with likes
- **Moderation**: Admin can delete/flag inappropriate content

### Course Player
- **Material Types**: PDF viewer and video player
- **Progress Tracking**: Mark modules as complete
- **Navigation**: Easy module and material switching

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔗 API Integration

The app is ready for backend integration. API calls are centralized in `src/utils/api.js`:

```javascript
import { courseAPI, quizAPI, discussionAPI } from './utils/api';

// Example usage
const courses = await courseAPI.getAll();
const quiz = await quizAPI.getById(quizId);
```

To connect to your backend:
1. Update `API_BASE_URL` in `src/utils/api.js`
2. Replace mock data calls with actual API calls
3. Handle authentication tokens properly

## 🎨 Customization

### Theme Colors
Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #10b981;
  --danger-color: #ef4444;
  /* ... more colors */
}
```

### Mock Data
Update `src/utils/mockData.js` to customize:
- Users
- Courses and modules
- Quizzes and questions
- Discussions
- Analytics data

## 🚧 Future Enhancements

- Real-time notifications
- Certificate generation
- Course recommendations
- Advanced analytics dashboard
- Video conferencing integration
- File upload functionality
- Email notifications
- Payment integration

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

The application uses mock data for demonstration. All CRUD operations work in-memory and will reset on page refresh. Connect to a backend API for persistent data storage.

---

Built with ❤️ using React and Vite
# E-Learning-WebSite