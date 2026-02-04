// Coordinators configuration for VYUGA 26

export interface Coordinator {
  id: string;
  name: string;
  role: "hod" | "staff-coordinator" | "chief-coordinator" | "associate-coordinator" | "main-coordinator" | "coordinator";
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
    phone: "9578460005",
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
  // Ideathon Coordinators
  { id: "mathivadhana-p", name: "Mathivadhana P", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "preethika-mh", name: "Preethika M H", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "dharshini-p", name: "Dharshini P", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "sanjai-krishnan-s", name: "Sanjai Krishnan S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },
  { id: "barath-r", name: "Barath R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ideathon"] },

  // Project Expo Coordinators
  { id: "madhu-mitha-r", name: "Madhu Mitha R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "pratthima-s", name: "Pratthima S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "sandhiya-k", name: "Sandhiya K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "chenthurr-c-k", name: "Chenthurr C K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },
  { id: "harsith-s-j", name: "Harsith S J", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["project-expo"] },

  // Codathon Coordinators
  { id: "divya-harini", name: "Divya Harini", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "kaviya", name: "Kaviya", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "subha", name: "Subha", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "thangam-s-k", name: "Thangam S K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "vishal-n", name: "Vishal N", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "sowmiyan-s", name: "Sowmiyan S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },
  { id: "sudarson-b", name: "Sudarson B", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["codathon"] },

  // UI/UX Coordinators
  { id: "shijitha-jenifer", name: "Shijitha Jenifer", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "ramya-s", name: "Ramya S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "oviya-maheswari", name: "Oviya Maheswari", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "manojkrishna-m", name: "Manojkrishna M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },
  { id: "kabeel-raj-k", name: "Kabeel Raj K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["ui-ux"] },

  // Web Development Coordinators
  { id: "sathya-k", name: "Sathya K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "anurathi-l", name: "Anurathi L", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "aiswarya-v", name: "Aiswarya V", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "pooja-m", name: "Pooja M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },
  { id: "jaya-surya", name: "Jaya Surya", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["web-development"] },

  // Quiz Coordinators
  { id: "blessy-r", name: "Blessy R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "monica-g", name: "Monica G", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "gowtham-m", name: "Gowtham M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },
  { id: "prithiv-a-k", name: "Prithiv A K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["quiz"] },

  // Connections Coordinators
  { id: "semmozhi-s", name: "Semmozhi S", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "agneya-p-k", name: "Agneya P K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "saru-bala-b", name: "Saru Bala B", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },
  { id: "reshma-b", name: "Reshma B", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["connections"] },

  // Spotlight Coordinators
  { id: "sasmita-r", name: "Sasmita R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },
  { id: "nithanya-k", name: "Nithanya K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },
  { id: "ashmita-p", name: "Ashmita P", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },
  { id: "juwairiya-m", name: "Juwairiya M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["spotlight"] },

  // Startup Arena Coordinators
  { id: "priyaadharshini-s-k", name: "Priyaadharshini S K", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "sri-dharshini", name: "Sri Dharshini", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "mithun-m", name: "Mithun M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "naveen-m", name: "Naveen M", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },
  { id: "abinesh-a", name: "Abinesh A", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["startup"] },

  // Tech Architecture Coordinators
  { id: "aiswarya-r", name: "Aiswarya R", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "kokiladevi-a", name: "Kokiladevi A", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "pilo-francy-f", name: "Pilo Francy F", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "shivani-t", name: "Shivani T", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },
  { id: "amar-karthik", name: "Amar Karthik", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["tech-architecture"] },

  // Esports Coordinators
  { id: "prasanth", name: "Prasanth", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "sebin", name: "Sebin", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "harshit", name: "Harshit", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "rishvan", name: "Rishvan", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
  { id: "nandha-kumar", name: "Nandha Kumar", role: "coordinator", department: "III AI & DS", phone: "", eventIds: ["e-sports"] },
];

export const getHODs = (): Coordinator[] => {
  return coordinators.filter(c => c.role === "hod");
};

// Deprecated: kept for backward compatibility if needed temporarily, but returns first HOD
export const getHOD = (): Coordinator | undefined => {
  return coordinators.find(c => c.role === "hod");
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

export const getCoordinatorById = (id: string): Coordinator | undefined => {
  return coordinators.find(c => c.id === id);
};

export const getCoordinatorsByEventId = (eventId: string): Coordinator[] => {
  return coordinators.filter(c => c.eventIds.includes(eventId));
};

export default coordinators;
