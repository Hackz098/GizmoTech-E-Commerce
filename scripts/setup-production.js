// Production setup script
const crypto = require('crypto');

console.log('🚀 GizmoTech Production Setup');
console.log('================================');

// Generate a secure JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('\n📝 Environment Variables for Production:');
console.log('==========================================');
console.log(`DATABASE_URL=file:./dev.db`);
console.log(`JWT_SECRET=${jwtSecret}`);
console.log(`NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app`);

console.log('\n🔧 Deployment Steps:');
console.log('===================');
console.log('1. Go to https://vercel.com');
console.log('2. Import your GitHub repository');
console.log('3. Add the environment variables above');
console.log('4. Deploy!');

console.log('\n✅ Your app will be live and accessible to users!');
console.log('\n📚 For detailed instructions, see DEPLOYMENT.md');
