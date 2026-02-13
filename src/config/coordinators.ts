// Coordinators configuration for VYUGA 26

export interface Coordinator {
  id: string;
  name: string;
  role: "hod" | "department-chair-person" | "staff-coordinator" | "chief-coordinator" | "associate-coordinator" | "main-coordinator" | "coordinator" | "technical-head" | "non-technical-head" | "digital-team";
  year?: number;
  department: string;
  section?: string;
  phone: string;
  image?: string;
  eventIds: string[];
}

export const coordinators: Coordinator[] = [
  {
    id: "hod-1",
    name: "DR.MURUGADOSS",
    role: "hod",
    department: "AI & DS",
    phone: "",
    eventIds: [],
    image: "/images/hod1.jpeg",
  },
  {
    id: "hod-2",
    name: "G. NITHYA",
    role: "hod",
    department: "AI & DS",
    phone: "",
    eventIds: [],
    image: "/images/hod2.png",
  },
  // Department Chair Persons
  {
    id: "chair-1",
    name: "POTRISELVAN K",
    role: "department-chair-person",
    department: "IV AI & DS",
    phone: "",
    eventIds: [],
  },
  {
    id: "chair-2",
    name: "CHANDRAMUGI P S",
    role: "department-chair-person",
    department: "IV AI & DS",
    phone: "",
    eventIds: [],
  },
  {
    id: "chair-3",
    name: "HEMAMALINI S",
    role: "department-chair-person",
    department: "IV AI & DS",
    phone: "",
    eventIds: [],
  },
  // Staff Coordinators
  {
    id: "staff-1",
    name: "Prof. B. Jebaranjani",
    role: "staff-coordinator",
    department: "AI & DS",
    phone: "8220221144",
    eventIds: [],
  },
  {
    id: "staff-2",
    name: "Prof. G. Priyadharshini",
    role: "staff-coordinator",
    department: "AI & DS",
    phone: "9042354723",
    eventIds: [],
  },
  // Chief Event Coordinators
  {
    id: "chief-1",
    name: "Saihareesh S",
    role: "chief-coordinator",
    department: "III AI & DS",
    phone: "9597846005",
    eventIds: [],
  },
  {
    id: "chief-2",
    name: "Jayashree K",
    role: "chief-coordinator",
    department: "III AI & DS",
    phone: "9345585918",
    eventIds: [],
  },
  // Associate Event Coordinators
  {
    id: "assoc-1",
    name: "N.SATHWIK",
    role: "associate-coordinator",
    department: "III AI & DS",
    phone: "",
    eventIds: [],
  },
  {
    id: "assoc-2",
    name: "Likethan K J",
    role: "associate-coordinator",
    department: "III AI & DS",
    phone: "",
    eventIds: [],
  },

  // Technical Heads
  { id: "tech-head-1", name: "Rahul R", role: "technical-head", department: "IV AI & DS", year: 4, phone: "", eventIds: [] },
  { id: "tech-head-2", name: "Varshith R", role: "technical-head", department: "IV AI & DS", year: 4, phone: "", eventIds: [] },
  { id: "tech-head-3", name: "Aiswarya Ramesh", role: "technical-head", department: "III AI & DS", year: 3, phone: "", eventIds: [] },
  { id: "tech-head-4", name: "Vishal N", role: "technical-head", department: "III AI & DS", year: 3, phone: "", eventIds: [] },

  // Non-Technical Heads
  { id: "non-tech-head-1", name: "Anbu Selvam M", role: "non-technical-head", department: "IV AI & DS", year: 4, phone: "", eventIds: [] },
  { id: "non-tech-head-2", name: "Nandhakumar S", role: "non-technical-head", department: "III AI & DS", year: 3, phone: "", eventIds: [] },
  { id: "non-tech-head-3", name: "Madhu Mitha R", role: "non-technical-head", department: "III AI & DS", year: 3, phone: "", eventIds: [] },

  // Digital Team
  { id: "digital-1", name: "Varshith R", role: "digital-team", department: "IV AI & DS", year: 4, phone: "", eventIds: [] },
  { id: "digital-2", name: "Rahul R", role: "digital-team", department: "IV AI & DS", year: 4, phone: "", eventIds: [] },
  { id: "digital-3", name: "Sanjay Kumar R", role: "digital-team", department: "IV AI & DS", year: 4, phone: "", eventIds: [] },
  { id: "digital-4", name: "Sacin Manova A", role: "digital-team", department: "III AI & DS", year: 4, phone: "", eventIds: [] },
  { id: "digital-5", name: "Mohamed Shaheedh B", role: "digital-team", department: "III AI & DS", year: 3, phone: "", eventIds: [] },
  { id: "digital-6", name: "Ashwin S", role: "digital-team", department: "III AI & DS", year: 3, phone: "", eventIds: [] },
  { id: "digital-7", name: "Nirmal Kishore B.S", role: "digital-team", department: "II AI & DS", year: 2, phone: "", eventIds: [] },
  { id: "digital-8", name: "Ashwin S", role: "digital-team", department: "II AI & DS", year: 2, phone: "", eventIds: [] },

  // E-SPORTS
  { id: "esports-1", name: "Poorna Ferdin J", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "esports-2", name: "Mohan Kumar S", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "esports-3", name: "Sanju P G", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "esports-4", name: "Aruna Nishanth T", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "esports-5", name: "Susenther E", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "esports-6", name: "Vaishnav Dinesh", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["e-sports"] },

  // STARTUP ARENA
  { id: "startup-1", name: "Dharunchandru B", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["startup"] },
  { id: "startup-2", name: "Nijai J H", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["startup"] },

  // SPOTLIGHT
  { id: "spotlight-1", name: "Harshan S K", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["spotlight"] },
  { id: "spotlight-2", name: "Srinithi V", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["spotlight"] },

  // IDEATHON
  { id: "ideathon-1", name: "Muralikarthick S", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "ideathon-2", name: "Madhushree R M", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["ideathon"] },

  // CODATHON
  { id: "codathon-1", name: "Sivaraj K", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "codathon-2", name: "Kamali R", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["codathon"] },

  // PROJECT EXPO
  { id: "project-expo-1", name: "Sahithyan M", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "project-expo-2", name: "Archana M", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["project-expo"] },

  // UI/UX
  { id: "ui-ux-1", name: "Yogaraj S", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "ui-ux-2", name: "Muthuppapa T", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["ui-ux"] },

  // WEB DEVELOPMENT
  { id: "web-dev-1", name: "Vignesh D", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "web-dev-2", name: "Poornisha K", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "web-dev-3", name: "Srinithi V", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["web-development"] },

  // TECH ARCH
  { id: "tech-arch-1", name: "Srikanth K", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "tech-arch-2", name: "Divyapriya B", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["tech-architecture"] },

  // CONNECTION
  { id: "connection-1", name: "Bharath P", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["connections"] },
  { id: "connection-2", name: "Divyapriya B", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["connections"] },

  // QUIZ
  { id: "quiz-1", name: "Srihariharan S", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "quiz-2", name: "Madhushree R.M", role: "coordinator", department: "IV AI & DS", phone: "", eventIds: ["quiz"] },

  // --- RESTORED III YEAR COORDINATORS ---

  // Ideathon
  { id: "mathivadhana-p", name: "Mathivadhana P", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "preethika-mh", name: "Preethika M H", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "dharshini-p", name: "Dharshini P", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "sanjai-krishnan-s", name: "Sanjai Krishnan S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "barath-r", name: "Barath R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },

  // Project Expo
  { id: "madhu-mitha-r", name: "Madhu Mitha R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "pratthima-s", name: "Pratthima S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "sandhiya-k", name: "Sandhiya K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "chenthurr-c-k", name: "Chenthurr C K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "harsith-s-j", name: "Harsith S J", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },

  // Codathon
  { id: "divya-harini", name: "Divya Harini", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "kaviya", name: "Kaviya", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "subha", name: "Subha M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "thangam-s-k", name: "Thangam S K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "vishal-n", name: "Vishal N", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "sowmiyan-s", name: "Sowmiyan S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "sudarson-b", name: "Sudarson B", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },

  // UI/UX
  { id: "shijitha-jenifer", name: "Shijitha Jenifer J", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "ramya-s", name: "Ramya S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "oviya-maheswari", name: "Oviya Maheswari N", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "manojkrishna-m", name: "Manojkrishna M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "kabeel-raj-k", name: "Kabeel Raj K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },

  // Web Development
  { id: "sathya-k", name: "Sathya K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "anurathi-l", name: "Anurathi L", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "aiswarya-v", name: "Aiswarya V", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "pooja-m", name: "Pooja M M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "jaya-surya", name: "Jaya Surya M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "deepan-m", name: "Deepan M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },

  // Quiz
  { id: "blessy-r", name: "Blessy R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "monica-g", name: "Monica G", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "gowtham-m", name: "Gowtham M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "prithiv-a-k", name: "Prithiv A K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "thowseena-safrin-j", name: "Thowseena Safrin J", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },

  // Connections
  { id: "semmozhi-s", name: "Semmozhi S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "agneya-p-k", name: "Agneya P K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "saru-bala-b", name: "Saru Bala B", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "reshma-b", name: "Reshma B", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "arun-m", name: "Arun M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "divakar-r", name: "Divakar R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "kannan-r", name: "Kannan R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },

  // Spotlight
  { id: "sasmita-r", name: "Sasmita R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },
  { id: "nithanya-k", name: "Nithanya K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },
  { id: "ashmita-p", name: "Ashmita P", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },
  { id: "juwairiya-m", name: "Juwairiya M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },

  // Startup Arena
  { id: "priyaadharshini-s-k", name: "Priyaadharshini S K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "sri-dharshini", name: "Sri Dharshini R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "mithun-m", name: "Mithun M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "naveen-m", name: "Naveen M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "abinesh-a", name: "Abinesh A", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },

  // Tech Architecture
  { id: "aiswarya-r", name: "Aiswarya R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "kokiladevi-a", name: "Kokiladevi A", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "pilo-francy-f", name: "Pilo Francy A", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "shivani-t", name: "Shivani T", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "amar-karthik", name: "Amar Karthik", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },

  // Esports
  { id: "prasanth", name: "Prasanth C", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "sebin", name: "Sebin S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "harshit", name: "Harshit", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "rishvan", name: "Rishvan R K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "nandha-kumar", name: "Nandha Kumar S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
];

export const getHODs = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "hod");
};

// Deprecated: kept for backward compatibility if needed temporarily, but returns first HOD
export const getHOD = (): Coordinator | undefined => {
  return coordinators.find(c => c.role === "hod");
};

export const getDepartmentChairPersons = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "department-chair-person");
};

export const getStaffCoordinators = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "staff-coordinator");
};

export const getChiefCoordinators = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "chief-coordinator");
};

export const getAssociateCoordinators = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "associate-coordinator");
};

export const getMainCoordinators = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "main-coordinator");
};

export const getEventCoordinators = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "coordinator");
};

export const getTechnicalHeads = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "technical-head");
};

export const getNonTechnicalHeads = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "non-technical-head");
};

export const getDigitalTeam = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "digital-team");
};

export const getCoordinatorById = (id: string): Coordinator | undefined => {
  return coordinators.find(c => c.id === id);
};

export const getCoordinatorsByEventId = (eventId: string): Coordinator[] => {
  return coordinators.filter(c => c.eventIds.includes(eventId));
};

export default coordinators;
