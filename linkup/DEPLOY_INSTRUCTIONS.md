# 🚀 Google Cloud Deployment Instructions

## Current Status
✅ **Billing Enabled**: Google Cloud project `linkup-463620` has billing enabled  
✅ **Services Enabled**: Cloud Run, Cloud Build, Artifact Registry, Container Registry  
⚠️ **Issue**: Local disk space preventing direct deployment  

## 🎯 SOLUTION: Deploy via Cloud Shell

### **Option A: Use Google Cloud Shell (RECOMMENDED)**

1. **Open Google Cloud Shell**: Go to [Google Cloud Console](https://console.cloud.google.com) → Click Cloud Shell icon (>_)

2. **Clone your repository**:
```bash
git clone https://github.com/FenesiErmias/LinkUp.git
cd LinkUp/linkup
```

3. **Deploy to Cloud Run**:
```bash
gcloud config set project linkup-463620
gcloud run deploy linkup \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1
```

4. **Confirm prompts**:
   - Create Artifact Registry repository? **Y**
   - Continue with deployment? **Y**

### **Option B: Manual Docker Build (If Option A fails)**

1. **In Cloud Shell**:
```bash
# Build the Docker image
docker build -t gcr.io/linkup-463620/linkup .

# Push to Container Registry  
docker push gcr.io/linkup-463620/linkup

# Deploy to Cloud Run
gcloud run deploy linkup \
  --image gcr.io/linkup-463620/linkup \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```

### **Option C: Local Cleanup & Retry**

1. **Free up disk space**:
```bash
# Clean Docker
docker system prune -a

# Clean npm cache
npm cache clean --force

# Remove large files
rm -rf ~/.npm
rm -rf /tmp/*
```

2. **Retry deployment**:
```bash
cd linkup
gcloud run deploy linkup --source . --platform managed --region us-central1 --allow-unauthenticated --port 3000
```

## 🎉 Expected Result

After successful deployment, you'll get:
```
Service URL: https://linkup-[hash]-uc.a.run.app
```

## 🎪 Demo Your App

1. **Visit the URL** → Professional landing page
2. **Go to /dashboard** → Swipe through hilarious profiles
3. **Check /matches** → See funny Discord integration
4. **Show /profile** → Profile management features

## 🏆 Hackathon Ready!

Your LinkUp app will be live with:
- ✅ All 6 hilarious profiles
- ✅ Professional UI/UX
- ✅ Smooth animations
- ✅ Complete user flow
- ✅ Judge-winning comedy gold!

**Go make those judges laugh! 🎭** 