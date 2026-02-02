// Main configuration file for VYUGA 26 Symposium

export const siteConfig = {
  // Event Information
  eventName: "Vyuga 26",
  departmentName: "Department of Artificial Intelligence and Data Science",
  tagline: "presents",
  eventDate: "17/02/2026",
  eventDateFull: new Date("2026-02-17T09:00:00"),

  // Registration Limits
  registrationCloseDate: "12/02/2026",
  registrationCloseDateFull: new Date("2026-02-12T23:59:59"),
  outerCollegeLimit: 300,
  interCollegeLimit: 100,

  // Site Status (controlled from admin)
  maintenanceMode: false,
  registrationOpen: true,

  // Admin Credentials
  adminPassword: "vyuga@26",
  deletePassword: "del@it",

  // Prize Pool
  prizePool: 100000, // in INR

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
  whatsappGroupLink: "https://chat.whatsapp.com/KjaAKqK9NcO1CVl3zrCZA8?mode=gi_t",
  instagramLink: "https://www.instagram.com/vsbcetc_aids/",

  // College Info
  collegeName: "VSB College of Engineering Technical Campus",
  collegeLocation: "Coimbatore",
  collegeAddress: "VSB College of Engineering Technical Campus, Kinathukadavu, Coimbatore - 642109, Tamil Nadu",

  // Google Maps Embed - Accurate location
  // Google Maps Embed - Accurate location
  googleMapsEmbed: "https://maps.google.com/maps?q=10.843058,77.017975+(VSB%20College%20of%20Engineering%20Technical%20Campus)&t=&z=14&ie=UTF8&iwloc=B&output=embed",

  // Terms of Service
  tosLink: "/terms",

  // Brochure
  brochureLink: "https://drive.google.com/file/d/1og_dpeSQAThRQj7RUUaLTYHGQ9IjdHFI/view?usp=sharing",

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
