// Email configuration for SIRAGU 26
// Configure your Gmail SMTP settings here

export const emailConfig = {
  // Gmail SMTP Settings
  smtp: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "your-email@gmail.com", // Replace with your Gmail
      pass: "your-app-password", // Replace with Gmail App Password
    },
  },
  
  // Email Templates
  templates: {
    registration: {
      subject: "Welcome to SIRAGU 26 - Registration Successful",
      from: "SIRAGU 26 <noreply@siragu26.com>",
    },
    paymentVerified: {
      subject: "SIRAGU 26 - Payment Verified Successfully",
      from: "SIRAGU 26 <noreply@siragu26.com>",
    },
    entryConfirmed: {
      subject: "SIRAGU 26 - Entry Confirmed",
      from: "SIRAGU 26 <noreply@siragu26.com>",
    },
  },
};

export default emailConfig;
