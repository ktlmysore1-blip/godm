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

2. **Configure Environment Variables** in Render Dashboard:
   - Go to your service → Environment tab
   - Add each variable manually (see section below)
   - **Important**: Never commit sensitive values to Git

#### Redis Database (Choose One Option)

**Option A: Use Render Redis (Recommended for new projects)**
1. **Create Redis Service**:
   - Name: `godm-redis`
   - Plan: `Starter`
   - Auto-connects to backend service

**Option B: Use External Redis (e.g., Redis Cloud)**
1. **Use existing Redis instance**
2. **Set REDIS_URL manually** in environment variables
3. **No additional Render Redis service needed**

#### Frontend (Optional - Static Site)
1. **Create Static Site**:
   - Name: `godm-frontend`
   - Build Command: `npm install && npm run build:frontend`
   - Publish Directory: `./dist`

## 🔧 Environment Variables

**IMPORTANT**: Set these manually in Render Dashboard → Service → Environment tab. Never commit sensitive values to Git.

### How to Set Environment Variables in Render:
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your `godm-backend` service
3. Click **Environment** tab
4. Click **Add Environment Variable**
5. Enter Key and Value for each variable below

### Required Variables (Set Manually)
| Key | Description | Example Value |
|-----|-------------|---------------|
| `INSTAGRAM_CLIENT_ID` | Facebook App ID | `123456789012345` |
| `INSTAGRAM_CLIENT_SECRET` | Facebook App Secret | `abcdef123456...` |
| `FACEBOOK_APP_ID` | Same as Client ID | `123456789012345` |
| `FACEBOOK_APP_SECRET` | Same as Client Secret | `abcdef123456...` |
| `INSTAGRAM_REDIRECT_URI` | OAuth callback URL | `https://dm2comment.netlify.app/auth/callback` |
| `INSTAGRAM_BOT_ACCESS_TOKEN` | Long-lived Page Access Token | `EAABwz...` |
| `INSTAGRAM_BUSINESS_ACCOUNT_ID` | Instagram Business Account ID | `17841400...` |
| `WEBHOOK_VERIFY_TOKEN` | Secure random string | `your_secure_token_123` |
| `REDIS_URL` | External Redis connection | `redis://default:password@host:port` |

### Auto-Generated Variables (Don't Set These)
These are automatically provided by Render:
- `PORT` - Assigned automatically by Render
- `NODE_ENV` - Set to `production` in render.yaml
- `AUTO_MIGRATE` - Set to `true` in render.yaml

**Note**: If using external Redis (like Redis Cloud), you'll need to set `REDIS_URL` manually.

## 📋 Pre-Deployment Checklist

- [ ] Facebook App created and configured
- [ ] Instagram Business Account connected
- [ ] Webhook URL configured in Facebook App
- [ ] All environment variables set
- [ ] Repository connected to Render

## 🔗 Service URLs

**Current Infrastructure:**
- **Frontend**: [`https://dm2comment.netlify.app`](https://dm2comment.netlify.app) (Netlify)
- **Redis**: Redis Cloud (ap-south-1 region)

**After Render Backend Deployment:**
- **Backend API**: `https://godm-backend-xxx.onrender.com`
- **Health Check**: `https://godm-backend-xxx.onrender.com/health`
- **Webhook URL**: `https://godm-backend-xxx.onrender.com/webhook/instagram`

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