# Quick Start Guide - SkillNest

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:3000`

---

## 🔐 Demo Login Credentials

### For Admin Experience:
```
Email: admin@elearn.com
Password: admin123
```

**What you'll see:**
- Admin Dashboard with analytics
- Course Management (Create/Edit/Delete)
- Quiz Management
- Discussion Moderation
- User Statistics

### For Learner Experience:
```
Email: learner@elearn.com
Password: learner123
```

**What you'll see:**
- Personal Dashboard
- Enrolled Courses (Web Development, Data Science)
- Available Quizzes
- Course Materials (Videos & PDFs)
- Discussion Forums

---

## 📚 Quick Tour

### As Learner:

1. **Login** → Use learner credentials
2. **Dashboard** → See your enrolled courses and progress
3. **Courses** → Browse and view course details
4. **Course Detail** → Watch videos, view PDFs, mark modules complete
5. **Quiz** → Take HTML or Python quiz with timer
6. **Discussions** → Ask questions, comment, like posts

### As Admin:

1. **Login** → Use admin credentials
2. **Admin Dashboard** → View platform analytics and charts
3. **Courses** → Create new course, add modules
4. **Quizzes** → Create new quiz, set duration and passing score
5. **Discussions** → Moderate discussions, delete inappropriate content

---

## 🎯 Key Features to Try

### Quiz System
- Navigate to Dashboard → Click "Start Quiz" on any quiz
- Experience:
  - ⏱️ Live countdown timer
  - 📝 Different question types (MCQ, True/False, Short Answer)
  - 🔖 Mark questions for review
  - 📊 Instant results with answer review

### Course Player
- Go to Courses → Click on "Web Development Basics"
- Click "Enroll Now" if not enrolled
- Experience:
  - 📺 Video player with controls
  - 📄 PDF viewer with download
  - ✅ Progress tracking
  - 📚 Module navigation

### Discussion Forum
- Navigate to Discussions
- Create a new thread
- Comment on existing discussions
- Try the profanity filter (type banned words like "bad", "stupid")

### Admin Features
- Create a new course (Admin → Courses → Add Course)
- Add modules to existing courses
- Create a quiz with custom settings
- View analytics dashboard

---

## 📱 Responsive Testing

Test the responsive design:
- Desktop: Full experience
- Tablet: Open browser dev tools, resize to 768-1024px
- Mobile: Resize to < 768px, see mobile-optimized layout

---

## 🎨 Customization Tips

### Change Theme Colors
Edit `src/styles/global.css`:
```css
:root {
  --primary-color: #4f46e5;  /* Change to your color */
  --secondary-color: #10b981;
  /* ... more colors */
}
```

### Add More Mock Courses
Edit `src/utils/mockData.js` → `mockCourses` array

### Modify Quiz Questions
Edit `src/utils/mockData.js` → `mockQuizzes` array

---

## 🔌 Backend Integration (Future)

When ready to connect to backend:

1. Update API URL in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url/api';
```

2. Replace mock data imports with actual API calls:
```javascript
// Instead of:
import { mockCourses } from '../utils/mockData';

// Use:
import { courseAPI } from '../utils/api';
const courses = await courseAPI.getAll();
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3001
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check for syntax errors
npm run build
```

---

## 📖 Project Structure Overview

```
src/
├── components/       # Reusable UI components
├── pages/           # Route pages
├── context/         # Global state (Auth, Role)
├── utils/           # API calls, mock data
├── styles/          # CSS files
├── App.jsx          # Main app with routing
└── main.jsx         # Entry point
```

---

## ✅ Feature Checklist

- [x] Authentication (Login/Register)
- [x] Role-based Access (Admin/Learner)
- [x] Course Browsing & Enrollment
- [x] Video & PDF Players
- [x] Quiz System with Timer
- [x] Discussion Forum
- [x] Admin Dashboard
- [x] Course Management (CRUD)
- [x] Quiz Management (CRUD)
- [x] Responsive Design
- [x] Mock Data
- [x] API Integration Ready

---

## 🎓 Learning Resources

- React Router: https://reactrouter.com/
- React Context API: https://react.dev/reference/react/useContext
- Vite: https://vitejs.dev/
- Lucide Icons: https://lucide.dev/

---

**Enjoy exploring SkillNest! 🚀**
