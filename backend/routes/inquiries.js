const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const jwt = require('jsonwebtoken');
const { sendEnquiryNotification } = require('../services/emailService');

// Middleware to protect admin routes
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

// ---------------------------
// PUBLIC ROUTE - Create new inquiry (contact form)
// ---------------------------
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'Name, email, subject, and message are required' 
      });
    }

    // Create inquiry
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      subject,
      message,
      status: 'pending'
    });

    await inquiry.save();

    // Send email notification (don’t fail request if email fails)
    sendEnquiryNotification(inquiry).catch(err => {
      console.error('Email notification failed:', err);
    });

    res.status(201).json({ 
      message: 'Inquiry submitted successfully',
      inquiry: {
        id: inquiry._id,
        name: inquiry.name,
        email: inquiry.email
      }
    });
  } catch (err) {
    console.error('Create inquiry error:', err);
    res.status(400).json({ 
      message: 'Error submitting inquiry', 
      error: err.message 
    });
  }
});

// ---------------------------
// ADMIN ROUTE - Get all inquiries
// ---------------------------
router.get('/', authMiddleware, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error('Get all inquiries error:', err);
    res.status(500).json({ 
      message: 'Error fetching inquiries', 
      error: err.message 
    });
  }
});

// ---------------------------
// ADMIN ROUTE - Get single inquiry by ID
// ---------------------------
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json(inquiry);
  } catch (err) {
    console.error('Get inquiry error:', err);
    res.status(500).json({ 
      message: 'Error fetching inquiry', 
      error: err.message 
    });
  }
});

// ---------------------------
// ADMIN ROUTE - Update inquiry status
// ---------------------------
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!['pending', 'reviewed', 'resolved'].includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status. Must be: pending, reviewed, or resolved' 
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({ 
      message: 'Inquiry updated successfully',
      inquiry 
    });
  } catch (err) {
    console.error('Update inquiry error:', err);
    res.status(400).json({ 
      message: 'Error updating inquiry', 
      error: err.message 
    });
  }
});

// ---------------------------
// ADMIN ROUTE - Delete inquiry
// ---------------------------
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.json({ 
      message: 'Inquiry deleted successfully',
      deletedId: req.params.id
    });
  } catch (err) {
    console.error('Delete inquiry error:', err);
    res.status(500).json({ 
      message: 'Error deleting inquiry', 
      error: err.message 
    });
  }
});

// ---------------------------
// ADMIN ROUTE - Get inquiry statistics
// ---------------------------
router.get('/stats/summary', authMiddleware, async (req, res) => {
  try {
    const total = await Inquiry.countDocuments();
    const pending = await Inquiry.countDocuments({ status: 'pending' });
    const reviewed = await Inquiry.countDocuments({ status: 'reviewed' });
    const resolved = await Inquiry.countDocuments({ status: 'resolved' });

    res.json({
      total,
      pending,
      reviewed,
      resolved
    });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ 
      message: 'Error fetching statistics', 
      error: err.message 
    });
  }
});

module.exports = router;
