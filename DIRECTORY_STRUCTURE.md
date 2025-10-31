# SkillNest Project Directory Structure

```
e:\Projects\SkillNest\
│
├── 📁 public/
│   └── vite.svg                    # Vite logo
│
├── 📁 src/
│   │
│   ├── 📁 components/              # Reusable UI Components
│   │   ├── DashboardWidget.jsx    # Stat display widget
│   │   ├── DiscussionThread.jsx   # Discussion card with comments
│   │   ├── Footer.jsx             # Footer with links
│   │   ├── Navbar.jsx             # Top navigation bar
│   │   ├── PDFViewer.jsx          # PDF embed viewer
│   │   ├── QuizTimer.jsx          # Countdown timer for quiz
│   │   ├── Sidebar.jsx            # Side navigation menu
│   │   └── VideoPlayer.jsx        # Video player component
│   │
│   ├── 📁 pages/                   # Route Pages
│   │   ├── AdminCourseManager.jsx # Admin: CRUD courses
│   │   ├── AdminDashboard.jsx     # Admin: Analytics dashboard
│   │   ├── AdminQuizManager.jsx   # Admin: CRUD quizzes
│   │   ├── CourseDetail.jsx       # Course player & enrollment
│   │   ├── Courses.jsx            # Course browser & search
│   │   ├── Dashboard.jsx          # Learner dashboard
│   │   ├── Discussion.jsx         # Discussion forum
│   │   ├── Login.jsx              # Login page
│   │   ├── Quiz.jsx               # Quiz player & results
│   │   └── Register.jsx           # Registration page
│   │
│   ├── 📁 context/                 # Global State Management
│   │   ├── AuthContext.jsx        # Authentication state
│   │   └── UserRoleContext.jsx    # User role helpers
│   │
│   ├── 📁 utils/                   # Utilities
│   │   ├── api.js                 # Axios API client
│   │   └── mockData.js            # Mock data for testing
│   │
│   ├── 📁 styles/                  # CSS Stylesheets
│   │   ├── global.css             # Global styles & utilities
│   │   ├── layout.css             # Layout components
│   │   └── components.css         # Component-specific styles
│   │
│   ├── App.jsx                    # Main app component & routing
│   └── main.jsx                   # React entry point
│
├── 📄 index.html                   # HTML template
├── 📄 vite.config.js              # Vite configuration
├── 📄 package.json                # Dependencies & scripts
├── 📄 package-lock.json           # Dependency lock file
├── 📄 .gitignore                  # Git ignore rules
│
├── 📘 README.md                    # Main documentation
├── 📘 QUICK_START.md              # Quick start guide
├── 📘 PROJECT_SUMMARY.md          # Project overview
├── 📘 FEATURES.md                 # Complete feature list
├── 📘 DEPLOYMENT.md               # Deployment guide
└── 📘 DIRECTORY_STRUCTURE.md      # This file
```

---

## 📊 File Statistics

### By Category:

| Category | Files | Lines of Code |
|----------|-------|---------------|
| Components | 8 | ~800 |
| Pages | 10 | ~2,800 |
| Context | 2 | ~150 |
| Utils | 2 | ~450 |
| Styles | 3 | ~1,100 |
| Config | 3 | ~50 |
| Documentation | 6 | ~1,500 |
| **TOTAL** | **34** | **~6,850** |

---

## 🎯 File Purposes

### Components (Reusable UI)
- **DashboardWidget**: Display statistics cards
- **DiscussionThread**: Discussion card with expandable comments
- **Footer**: Site footer with links and social icons
- **Navbar**: Top navigation with user info and logout
- **PDFViewer**: Embed and display PDF files
- **QuizTimer**: Live countdown for quizzes
- **Sidebar**: Navigation menu (role-based)
- **VideoPlayer**: HTML5 video player

### Pages (Routes)
- **Login**: Authentication page
- **Register**: User registration
- **Dashboard**: Learner's main dashboard
- **Courses**: Browse and search courses
- **CourseDetail**: Course overview & player
- **Quiz**: Quiz player with timer & results
- **Discussion**: Forum for discussions
- **AdminDashboard**: Analytics for admins
- **AdminCourseManager**: Manage courses (CRUD)
- **AdminQuizManager**: Manage quizzes (CRUD)

### Context (State)
- **AuthContext**: Global auth state & functions
- **UserRoleContext**: Role-based helpers

### Utils (Helpers)
- **api.js**: Centralized API calls
- **mockData.js**: Mock data for development

### Styles (CSS)
- **global.css**: Base styles, variables, utilities
- **layout.css**: Navbar, sidebar, footer, page layouts
- **components.css**: Component-specific styles

---

## 🔍 Key Files to Modify

### To Change Theme:
- `src/styles/global.css` (CSS variables)

### To Add Mock Data:
- `src/utils/mockData.js`

### To Configure API:
- `src/utils/api.js`

### To Add Routes:
- `src/App.jsx`

### To Modify Auth Logic:
- `src/context/AuthContext.jsx`

---

## 📦 Dependencies

### Production:
- react (18.x)
- react-dom (18.x)
- react-router-dom (6.x)
- axios
- lucide-react

### Development:
- vite
- @vitejs/plugin-react

---

## 🚀 Build Output

After running `npm run build`:

```
dist/
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── index-[hash].css     # Compiled CSS
│   └── [other chunks]
├── vite.svg
└── index.html
```

**Typical bundle size**: ~200-300 KB (gzipped)

---

## 🔗 Import Paths

All imports use relative paths:

```javascript
// Components
import Navbar from './components/Navbar'

// Pages
import Dashboard from './pages/Dashboard'

// Context
import { useAuth } from './context/AuthContext'

// Utils
import { mockCourses } from './utils/mockData'
import { courseAPI } from './utils/api'

// Styles
import './styles/global.css'
```

---

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `DashboardWidget.jsx`)
- **Pages**: PascalCase (e.g., `CourseDetail.jsx`)
- **Context**: PascalCase + Context suffix (e.g., `AuthContext.jsx`)
- **Utils**: camelCase (e.g., `mockData.js`)
- **Styles**: kebab-case (e.g., `global.css`)
- **Variables**: camelCase
- **CSS Classes**: kebab-case

---

**Total Project Size**: ~15 MB (with node_modules)
**Source Code Size**: ~500 KB
**Production Build**: ~300 KB (gzipped)

---

This structure follows React best practices and is easily scalable! 🎉
