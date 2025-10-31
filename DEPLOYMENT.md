# Deployment Guide

## 🚀 Deployment Options

This React application can be deployed to various platforms. Here are the most popular options:

---

## Option 1: Vercel (Recommended)

Vercel offers the easiest deployment for Vite/React apps with automatic builds.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - Add `VITE_API_URL` in Vercel dashboard
   - Settings → Environment Variables

**Your app will be live at**: `https://your-app.vercel.app`

---

## Option 2: Netlify

### Steps:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect GitHub repository for auto-deploys

3. **Configure**
   - Build command: `npm run build`
   - Publish directory: `dist`

**Your app will be live at**: `https://your-app.netlify.app`

---

## Option 3: GitHub Pages

### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/'
   })
   ```

3. **Add deploy scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

**Your app will be live at**: `https://username.github.io/repo-name/`

---

## Option 4: AWS S3 + CloudFront

### Steps:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**
   - Name: `your-app-name`
   - Enable static website hosting
   - Upload `dist` folder contents

3. **Configure CloudFront**
   - Create distribution
   - Point to S3 bucket
   - Set default root object: `index.html`

4. **Route 53** (optional)
   - Configure custom domain

---

## Option 5: Docker + Self-Hosted

### Dockerfile:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Deploy:

```bash
docker build -t elearning-frontend .
docker run -p 80:80 elearning-frontend
```

---

## 🔧 Pre-Deployment Checklist

- [ ] Remove console.log statements
- [ ] Update API base URL for production
- [ ] Test all features one final time
- [ ] Check responsive design on multiple devices
- [ ] Optimize images (if any added)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up environment variables
- [ ] Test in production mode locally: `npm run build && npm run preview`

---

## 🌐 Connecting to Backend

When you have a backend ready:

1. **Update API URL**
   
   Create `.env` file:
   ```env
   VITE_API_URL=https://your-backend-api.com
   ```

   Update `src/utils/api.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
   ```

2. **Replace Mock Data Calls**

   In pages, replace:
   ```javascript
   // Old (mock data)
   import { mockCourses } from '../utils/mockData';
   const [courses] = useState(mockCourses);

   // New (API call)
   import { courseAPI } from '../utils/api';
   const [courses, setCourses] = useState([]);
   
   useEffect(() => {
     const fetchCourses = async () => {
       const response = await courseAPI.getAll();
       setCourses(response.data);
     };
     fetchCourses();
   }, []);
   ```

3. **Handle Authentication**

   Update `AuthContext.jsx` to use real API:
   ```javascript
   const login = async (email, password) => {
     const response = await authAPI.login({ email, password });
     const { token, user } = response.data;
     localStorage.setItem('token', token);
     setUser(user);
   };
   ```

---

## 📊 Performance Optimization

Before deploying:

1. **Code Splitting**
   ```javascript
   // In App.jsx
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   const Courses = lazy(() => import('./pages/Courses'));
   // ... etc
   ```

2. **Image Optimization**
   - Use WebP format
   - Implement lazy loading
   - Add proper alt texts

3. **Bundle Analysis**
   ```bash
   npm run build
   # Check dist folder size
   ```

---

## 🔒 Security Considerations

- [ ] Never commit API keys or secrets
- [ ] Use environment variables for sensitive data
- [ ] Implement HTTPS (automatic on Vercel/Netlify)
- [ ] Add Content Security Policy headers
- [ ] Sanitize user inputs (already implemented)
- [ ] Set up CORS properly on backend

---

## 📈 Post-Deployment

1. **Monitor Performance**
   - Use Lighthouse in Chrome DevTools
   - Check Core Web Vitals
   - Monitor bundle size

2. **Set Up Analytics**
   ```bash
   npm install react-ga4
   ```

3. **Error Tracking**
   ```bash
   npm install @sentry/react
   ```

4. **Set Up CI/CD**
   - GitHub Actions
   - Automatic deployments on push

---

## 🐛 Troubleshooting

### Routes not working after deployment

Add `_redirects` file (Netlify) or `vercel.json`:

**Netlify** (`public/_redirects`):
```
/*    /index.html   200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment variables not working

- Prefix with `VITE_`
- Restart dev server after adding
- Rebuild for production

### Build fails

```bash
# Clear cache and retry
rm -rf node_modules dist
npm install
npm run build
```

---

## 📞 Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Docs: https://vitejs.dev/guide/

---

**Ready to deploy your SkillNest! 🚀**
