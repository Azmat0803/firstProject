const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  phone: { 
    type: String,
    trim: true
  },
  subject: { 
    type: String, 
    required: true,
    trim: true
  },
  message: { 
    type: String, 
    required: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'resolved'], 
    default: 'pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add index for faster queries
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ status: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);