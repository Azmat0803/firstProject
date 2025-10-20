require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Get credentials from .env
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log(`Username: ${username}`);
      process.exit(0);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      username,
      passwordHash
    });

    await admin.save();
    
    console.log('\n✅ Admin user created successfully!');
    console.log('═══════════════════════════════════');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('═══════════════════════════════════');
    console.log('\n⚠️  IMPORTANT: Please change the password after first login!');
    console.log('    You can do this by updating the .env file and running this script again.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();