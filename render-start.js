// Render-specific start script
console.log('🚀 Starting GODM backend for Render...');
console.log('📁 Current directory:', __dirname);
console.log('🔧 Node version:', process.version);
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// Render provides PORT environment variable
const PORT = process.env.PORT || 10000;
console.log(`🔍 Using PORT: ${PORT}`);

// Start the backend server
require('./backend/server-redis.js');