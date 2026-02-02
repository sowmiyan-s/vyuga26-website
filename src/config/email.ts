// Email configuration for SIRAGU 26
// Configure your Gmail SMTP settings here

export const emailConfig = {
  // Gmail SMTP Settings
  smtp: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "vyuga2026@gmail.com",
      pass: "vyuga@mds143",
    },
  },

  // Email Templates
  templates: {
    registration: {
      subject: "Welcome to Vyuga 26 - Registration Successful",
      from: "Vyuga 26 <vyuga2026@gmail.com>",
    },
    paymentVerified: {
      subject: "Vyuga 26 - Payment Verified Successfully",
      from: "Vyuga 26 <vyuga2026@gmail.com>",
    },
    entryConfirmed: {
      subject: "Vyuga 26 - Entry Confirmed",
      from: "Vyuga 26 <vyuga2026@gmail.com>",
    },
  },
};

export default emailConfig;
