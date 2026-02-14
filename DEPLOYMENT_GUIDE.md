# Deployment Guide for Habit Tracker

## Option 1: Web Deployment (Recommended)

### Step 1: Build for Production
```bash
# Build Frontend
cd c:\Users\laksh\tracker-api\frontend
npm run build

# Build Backend  
cd c:\Users\laksh\tracker-api
./gradlew build
```

### Step 2: Deploy to Web Server

#### A) Using Nginx (Recommended)
1. Copy files to server:
   - Frontend: `frontend/dist/*` to `/var/www/habit-tracker/`
   - Backend: `build/libs/*.jar` to `/opt/habit-tracker/`

2. Install Nginx config:
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/habit-tracker
   sudo ln -s /etc/nginx/sites-available/habit-tracker /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

3. Run backend service:
   ```bash
   java -jar /opt/habit-tracker/habit-tracker.jar
   ```

#### B) Using Apache
1. Configure VirtualHost for frontend
2. Use `mod_proxy` to forward `/api/*` to backend port 8081

#### C) Simple Deployment (No Reverse Proxy)
1. Deploy frontend to separate domain/subdomain
2. Deploy backend to different port
3. Update API URLs in frontend

### Step 3: Configure Database
```bash
# Create production database
createdb habit_tracker_prod

# Update application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/habit_tracker_prod
spring.datasource.username=your_user
spring.datasource.password=your_password
```

## Option 2: PWA (Progressive Web App)

### Mobile App Features Added:
✅ **Offline Support** - Works without internet
✅ **Install Prompt** - "Add to Home Screen"
✅ **App Icon** - Native app feel
✅ **Full Screen** - No browser UI
✅ **Push Notifications** - Future enhancement

### Access on Phone:
1. **Build and deploy** (Option 1)
2. **Open browser** on phone
3. **Navigate to your domain**
4. **Tap "Add to Home Screen"** (iOS/Samsung)
5. **Use like native app**

## Option 3: Cloud Deployment (Easy)

### A) Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

### B) Heroku (Full Stack)
```bash
# Install Heroku CLI
npm i -g heroku

# Deploy
heroku create habit-tracker
git push heroku main
```

### C) Railway (Modern Alternative)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

## Option 4: Native Mobile App

### React Native (Advanced)
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create mobile project
npx react-native init HabitTrackerMobile

# Convert components to React Native
# Requires significant rewrite
```

### Capacitor (Easier)
```bash
# Add to existing React app
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios

# Initialize
npx cap init HabitTracker
npx cap add android
npx cap add ios

# Build and run
npm run build
npx cap open android    # Opens Android Studio
npx cap open ios        # Opens Xcode
```

## Option 5: Docker Deployment

### Create Dockerfile
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY build/libs/*.jar app.jar
EXPOSE 8081
CMD ["java", "-jar", "app.jar"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
      
  backend:
    build: .
    ports:
      - "8081:8081"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://backend:5432/demodb
```

## Quick Start (Recommended Path)

### For Immediate Phone Access:
1. **Use ngrok** (quickest):
   ```bash
   npm install -g ngrok
   ngrok http 8081  # Backend
   ngrok http 5173  # Frontend
   ```

2. **Deploy to Vercel** (frontend only):
   - Free hosting
   - Automatic HTTPS
   - Global CDN
   - Works immediately on phone

3. **Use PWA features**:
   - No app store needed
   - Install from browser
   - Works offline

## Security Notes

### Production Checklist:
- [ ] Use HTTPS (SSL certificate)
- [ ] Environment variables for secrets
- [ ] Database connection security
- [ ] CORS configuration
- [ ] Rate limiting
- [ ] Input validation

Choose the option that best fits your needs!
