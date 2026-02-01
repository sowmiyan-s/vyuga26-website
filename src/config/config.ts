// Main configuration file for SIRAGU 26 Symposium

export const siteConfig = {
  // Event Information
  eventName: "Vyuga 26",
  departmentName: "Department of Artificial Intelligence and Data Science",
  tagline: "presents",
  eventDate: "14/02/2026",
  eventDateFull: new Date("2026-02-14T09:00:00"),

  // Registration Limits
  registrationCloseDate: "10/02/2026",
  outerCollegeLimit: 300,
  interCollegeLimit: 100,

  // Site Status (controlled from admin)
  maintenanceMode: false,
  registrationOpen: true,

  // Admin Credentials
  adminPassword: "vyuga@26",
  deletePassword: "del@it",

  // Prize Pool
  prizePool: 20000, // in INR

  // Pass Details
  passPrice: 300, // Outer college price in INR
  interCollegePassPrice: 100, // Inter college price in INR
  passIncludes: ["Food", "Participate in all events", "Certificate"],

  // Inter College Departments
  interCollegeDepartments: ["AGRI", "AIDS", "CIVIL", "CSC", "ECE", "EEE", "MECH", "IT", "AIML"],

  // Inter College QR Code (different from outer college)
  interCollegePaymentQR: "/images/intercollege-payment-qr.png",
  interCollegePaymentUPI: "intercollege@upi",
  interCollegePaymentPhone: "9876543211",

  // Payment Details
  paymentQR: "/images/payment-qr.png",
  paymentPhone: "9876543210",
  paymentUPI: "symposium@upi",

  // Social Links
  whatsappGroupLink: "https://chat.whatsapp.com/your-group-link",
  instagramLink: "https://instagram.com/siragu26",

  // College Info
  collegeName: "VSB College of Engineering Technical Campus",
  collegeLocation: "Coimbatore",
  collegeAddress: "VSB College of Engineering Technical Campus, Kinathukadavu, Coimbatore - 642109, Tamil Nadu",

  // Google Maps Embed - Accurate location
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8544799253516!2d77.0361!3d10.8847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85a4c73c41c15%3A0x8e13c6c41c15c5c!2sVSB%20College%20of%20Engineering%20Technical%20Campus!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",

  // Terms of Service
  tosLink: "/terms",

  // Event Categories
  eventCategories: [
    {
      id: "technical",
      title: "Technical",
      description: "Coding, circuits, and cutting-edge challenges",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      gradient: "from-uiverse-purple/80 to-uiverse-sky/80",
    },
    {
      id: "non-technical",
      title: "Non-Technical",
      description: "Fun, creativity, and exciting competitions",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
      gradient: "from-uiverse-green/80 to-uiverse-sky/80",
    },
  ],

  // Header Poster
  headerPoster: "/images/header-poster.jpg",
};

export default siteConfig;
