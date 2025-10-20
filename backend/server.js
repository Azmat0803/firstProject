require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const inquiriesRouter = require('./routes/inquiries');
const authRouter = require('./routes/auth');
const { testEmailConnection } = require('./services/emailService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/auth', authRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'RUWAD CAPS Backend API',
    status: 'running',
    endpoints: {
      auth: '/api/auth/login',
      inquiries: '/api/inquiries'
    }
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ MongoDB Connected');

  // Test email connection
  await testEmailConnection();

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
