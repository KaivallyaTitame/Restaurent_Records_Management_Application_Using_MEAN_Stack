# 🚀 Deployment Guide - Restaurant Manager

This guide will help you deploy the Restaurant Manager application to Vercel with MongoDB Atlas.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier works)
- MongoDB Atlas account (free tier works)

## 🗄️ Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `MEAN_Project`

   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/MEAN_Project?retryWrites=true&w=majority
   ```

## 📤 Step 2: Push to GitHub

1. **Initialize Git Repository** (if not already done)
   ```bash
   cd Restaurent_Records_Management_Application_Using_MEAN_Stack
   git init
   git add .
   git commit -m "Initial commit - Restaurant Manager MEAN Stack"
   ```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com)
   - Click "New Repository"
   - Name it (e.g., "restaurant-manager-mean")
   - Don't initialize with README (we already have one)
   - Click "Create Repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## 🌐 Step 3: Deploy Backend to Vercel

1. **Install Vercel CLI** (optional, can use web interface)
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend**
   
   **Option A: Using Vercel CLI**
   ```bash
   cd Server
   vercel
   ```
   - Follow the prompts
   - Choose "yes" to link to existing project or create new
   - Select your project settings

   **Option B: Using Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set Root Directory to `Server`
   - Click "Deploy"

3. **Configure Environment Variables**
   - In Vercel Dashboard, go to your backend project
   - Go to "Settings" → "Environment Variables"
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `FRONTEND_URL`: (will add after frontend deployment)
   - Click "Save"

4. **Redeploy** (if needed)
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

5. **Copy Backend URL**
   - Your backend will be deployed at: `https://your-backend-name.vercel.app`
   - Save this URL for the next step

## 🎨 Step 4: Deploy Frontend to Vercel

1. **Update Production Environment**
   - Open `Client/src/environments/environment.prod.ts`
   - Replace the baseUrl with your backend URL:
   ```typescript
   export const environment = {
     production: true,
     baseUrl: 'https://your-backend-name.vercel.app/restaurents'
   };
   ```
   - Commit and push this change:
   ```bash
   git add .
   git commit -m "Update production API URL"
   git push
   ```

2. **Deploy Frontend**
   
   **Option A: Using Vercel CLI**
   ```bash
   cd Client
   vercel
   ```

   **Option B: Using Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository (or select existing)
   - Set Root Directory to `Client`
   - Build Command: `npm run build`
   - Output Directory: `dist/resto-proj/browser`
   - Click "Deploy"

3. **Copy Frontend URL**
   - Your frontend will be deployed at: `https://your-frontend-name.vercel.app`

## 🔄 Step 5: Update Backend CORS

1. **Add Frontend URL to Backend Environment**
   - Go to Vercel Dashboard → Backend Project
   - Go to "Settings" → "Environment Variables"
   - Add/Update:
     - `FRONTEND_URL`: `https://your-frontend-name.vercel.app`
   - Click "Save"

2. **Redeploy Backend**
   - Go to "Deployments" tab
   - Click the three dots on the latest deployment
   - Click "Redeploy"

## ✅ Step 6: Test Your Application

1. Visit your frontend URL: `https://your-frontend-name.vercel.app`
2. Try adding a restaurant
3. Try editing and deleting records
4. Check that all operations work correctly

## 🔧 Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in backend environment variables
- Check that both URLs are using HTTPS
- Redeploy backend after changing environment variables

### MongoDB Connection Errors
- Verify MongoDB Atlas connection string is correct
- Check that IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions
- Verify password doesn't contain special characters that need URL encoding

### Build Errors
- Check Node.js version compatibility
- Clear build cache in Vercel
- Check for any TypeScript errors in the code

### API Not Responding
- Check Vercel function logs in the dashboard
- Verify environment variables are set
- Check that `vercel.json` is in the Server directory

## 📝 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database user is created with correct permissions
- [ ] Network access allows connections from anywhere
- [ ] Backend is deployed to Vercel
- [ ] Backend environment variables are set (MONGODB_URI, FRONTEND_URL)
- [ ] Frontend is deployed to Vercel
- [ ] Frontend environment.prod.ts has correct backend URL
- [ ] CORS is configured correctly
- [ ] Application is accessible and functional

## 🔐 Security Recommendations

1. **MongoDB Atlas**
   - Use strong passwords
   - Regularly rotate credentials
   - Monitor database access logs

2. **Environment Variables**
   - Never commit .env files
   - Use Vercel's environment variable encryption
   - Rotate secrets periodically

3. **Production Enhancements**
   - Implement authentication (JWT, OAuth)
   - Add rate limiting
   - Enable HTTPS only
   - Add input sanitization
   - Implement proper error handling

## 🎉 Success!

Your Restaurant Manager application is now live and accessible worldwide!

- **Frontend**: https://your-frontend-name.vercel.app
- **Backend**: https://your-backend-name.vercel.app

## 📞 Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Review browser console for errors
4. Check Network tab for API calls

---

**Happy Deploying! 🚀**
