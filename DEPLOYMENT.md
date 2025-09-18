# GizmoTech E-Commerce Deployment Guide

## 🚀 Quick Deployment to Vercel (Recommended)

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/Hackz098/GizmoTech-E-Commerce.git`
4. Vercel will automatically detect it's a Next.js project

### Step 2: Configure Environment Variables
In your Vercel project dashboard, add these environment variables:

```
DATABASE_URL=file:./dev.db
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

### Step 3: Deploy
- Click "Deploy" and Vercel will build and deploy your app
- Your app will be live at `https://your-app-name.vercel.app`

## 🗄️ Database Setup for Production

### Option 1: SQLite (Simple)
- The current setup uses SQLite which works on Vercel
- No additional configuration needed

### Option 2: PostgreSQL (Recommended for production)
1. Sign up for a free PostgreSQL database at [Railway](https://railway.app) or [Supabase](https://supabase.com)
2. Get your database URL
3. Update your `DATABASE_URL` in Vercel environment variables
4. Run database migrations in production

## 🔧 Manual Deployment Steps

### 1. Build the Project
```bash
npm run build
```

### 2. Test Production Build Locally
```bash
npm start
```

### 3. Deploy to Vercel via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## 🌐 Alternative Deployment Options

### Netlify
- Good for static sites
- Limited serverless functions
- May require modifications for API routes

### Railway
- Full-stack deployment
- Built-in PostgreSQL
- Easy database management

### Heroku
- Traditional hosting
- Requires Procfile
- Good for full-stack apps

## 📝 Post-Deployment Checklist

- [ ] Test admin login functionality
- [ ] Verify product addition works
- [ ] Check cart functionality
- [ ] Test responsive design on mobile
- [ ] Verify all links work
- [ ] Check database operations

## 🔒 Security Notes

- Change default admin credentials in production
- Use strong JWT secrets
- Enable HTTPS (automatic on Vercel)
- Consider adding rate limiting for API routes

## 🆘 Troubleshooting

### Common Issues:
1. **Build Errors**: Check environment variables are set
2. **Database Issues**: Ensure DATABASE_URL is correct
3. **Authentication Issues**: Verify JWT_SECRET is set
4. **Image Loading**: Check image URLs are accessible

### Support:
- Check Vercel deployment logs
- Review browser console for errors
- Test API endpoints individually

