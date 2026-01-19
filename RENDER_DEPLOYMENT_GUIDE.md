# GODM - Render Deployment Guide

This guide will help you deploy the GODM (Instagram Automation System) to Render.com.

## 🚀 Quick Deploy

### Option 1: Using render.yaml (Recommended)

1. **Fork/Clone this repository** to your GitHub account
2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Set Environment Variables** (see section below)
4. **Deploy** - Render will create all services automatically

### Option 2: Manual Setup

#### Backend Service
1. **Create Web Service**:
   - Name: `godm-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server-redis.js`
   - Plan: `Starter` (or higher)

2. **Configure Environment Variables** (see section below)

#### Redis Database
1. **Create Redis Service**:
   - Name: `godm-redis`
   - Plan: `Starter`
   - Connect to backend service

#### Frontend (Optional - Static Site)
1. **Create Static Site**:
   - Name: `godm-frontend`
   - Build Command: `npm install && npm run build:frontend`
   - Publish Directory: `./dist`

## 🔧 Environment Variables

Set these in your Render service dashboard:

### Required Variables
```bash
# Instagram/Facebook API
INSTAGRAM_CLIENT_ID=your_facebook_app_id
INSTAGRAM_CLIENT_SECRET=your_facebook_app_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Instagram Configuration
INSTAGRAM_REDIRECT_URI=https://your-frontend-url.onrender.com/auth/callback
INSTAGRAM_BOT_ACCESS_TOKEN=your_long_lived_access_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id

# Webhook Configuration
WEBHOOK_VERIFY_TOKEN=your_secure_webhook_token

# System Configuration
NODE_ENV=production
AUTO_MIGRATE=true
```

### Auto-Generated Variables
These are automatically set by Render:
- `PORT` - Render assigns this automatically
- `REDIS_URL` - Connected from Redis service

## 📋 Pre-Deployment Checklist

- [ ] Facebook App created and configured
- [ ] Instagram Business Account connected
- [ ] Webhook URL configured in Facebook App
- [ ] All environment variables set
- [ ] Repository connected to Render

## 🔗 Service URLs

After deployment, your services will be available at:
- **Backend API**: `https://godm-backend-xxx.onrender.com`
- **Frontend**: `https://godm-frontend-xxx.onrender.com`
- **Health Check**: `https://godm-backend-xxx.onrender.com/health`

## 🔄 Post-Deployment Setup

1. **Update Facebook App Settings**:
   - Set Webhook URL to: `https://your-backend-url.onrender.com/webhook/instagram`
   - Update OAuth redirect URI to: `https://your-frontend-url.onrender.com/auth/callback`

2. **Test the Application**:
   - Visit the health check endpoint
   - Test Instagram authentication
   - Verify webhook functionality

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Redis Connection Issues**:
   - Ensure Redis service is running
   - Check REDIS_URL environment variable
   - Verify service connections

3. **Instagram API Issues**:
   - Verify all environment variables are set
   - Check Facebook App configuration
   - Ensure webhook URL is accessible

### Debug Commands

```bash
# Check Redis connection
curl https://your-backend-url.onrender.com/health

# Test Instagram auth
curl https://your-backend-url.onrender.com/api/auth/instagram

# Check token permissions
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://your-backend-url.onrender.com/api/debug/token-permissions
```

## 📊 Monitoring

- **Logs**: Available in Render dashboard
- **Metrics**: Built-in Render monitoring
- **Health Check**: `/health` endpoint
- **Redis Status**: Included in health check

## 🔄 Updates

To update your deployment:
1. Push changes to your GitHub repository
2. Render will automatically redeploy
3. Monitor deployment logs for any issues

## 💰 Pricing

**Estimated Monthly Cost** (Render Starter Plans):
- Backend Web Service: $7/month
- Redis Database: $7/month
- Static Site: Free
- **Total**: ~$14/month

## 🆘 Support

If you encounter issues:
1. Check Render service logs
2. Review environment variables
3. Test endpoints manually
4. Check Facebook App configuration

---

**Note**: This replaces the previous Railway deployment. Remove `railway.json` and `nixpacks.toml` after successful Render deployment.