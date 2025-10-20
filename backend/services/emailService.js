const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send enquiry notification email
const sendEnquiryNotification = async (inquiry) => {
  try {
    const mailOptions = {
      from: `"RUWAD CAPS Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🔔 New Enquiry: ${inquiry.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .field {
              background: white;
              padding: 15px;
              margin-bottom: 15px;
              border-radius: 5px;
              border-left: 4px solid #667eea;
            }
            .label {
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 5px;
            }
            .value {
              color: #555;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 5px;
              border: 1px solid #e0e0e0;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #777;
              font-size: 12px;
              background: #2c3e50;
              color: white;
              border-radius: 0 0 10px 10px;
            }
            .action-btn {
              display: inline-block;
              padding: 12px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 New Enquiry Received!</h1>
            <p>RUWAD CAPS Website</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${inquiry.name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">📱 Phone:</div>
              <div class="value">${inquiry.phone || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">📋 Subject:</div>
              <div class="value">${inquiry.subject}</div>
            </div>
            
            <div class="message-box">
              <div class="label">💬 Message:</div>
              <div class="value">${inquiry.message}</div>
            </div>
            
            <div style="text-align: center;">
              <a href="http://localhost:3000/admin/login" class="action-btn">
                View in Admin Dashboard
              </a>
            </div>
            
            <p style="margin-top: 20px; color: #777; font-size: 14px;">
              📅 Received: ${new Date(inquiry.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from RUWAD CAPS website.</p>
            <p>© ${new Date().getFullYear()} RUWAD CAPS. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
};

// Test email connection
const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email server is ready');
    return true;
  } catch (error) {
    console.error('❌ Email server error:', error);
    return false;
  }
};

module.exports = {
  sendEnquiryNotification,
  testEmailConnection
};