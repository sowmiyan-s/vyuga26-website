// Events configuration for SIRAGU 26

export type EventCategory = "technical" | "non-technical";

export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: EventCategory;
  image: string;
  rules: string[];
  time: string;
  coordinatorIds: string[];
  isSpotlight?: boolean;
}

export const events: Event[] = [
  // Technical Events
  {
    id: "ideathon",
    title: "IDEATHON",
    description: "To encourage innovation and critical thinking by enabling students to propose feasible technology-driven solutions to real-world problems.",
    fullDescription: "Ideathon provides a structured platform for students to pitch original ideas across modern technology domains. Participants must clearly articulate the problem, proposed solution, and its real-world applicability.",
    category: "technical",
    image: "/images/IDEATHON.png",
    rules: [
      "Open to all departments. Team size: Exactly 3 members",
      "Domains allowed: AI, Machine Learning, Data Science, IoT, Cyber Security, Recommendation Systems, Educational Systems",
      "Presentation language: English",
      "Equal participation from all team members is mandatory",
      "Preliminary PPT: Maximum 10 slides",
      "Final PPT: Maximum 7 slides (excluding title and thank-you slides)",
      "PPT must be created manually; AI tools are strictly prohibited",
      "Evaluation Criteria: Innovation and originality, Technical feasibility, Clarity of presentation"
    ],
    time: "10:00 AM – 1:00 PM",
    coordinatorIds: ["mathivadhana-p", "preethika-mh", "dharshini-p", "sanjai-krishnan-s", "barath-r"],
    isSpotlight: true,
  },
  {
    id: "project-expo",
    title: "Project Expo",
    description: "To provide a platform for demonstrating working projects that offer practical solutions to real-world challenges.",
    fullDescription: "Project Expo allows participants to present functional hardware or software projects, emphasizing implementation quality, clarity, and technical soundness.",
    category: "technical",
    image: "/images/PROJECT-EXPO.png",
    rules: [
      "Open to all departments. Team size: Exactly 3 members",
      "Project domains: IoT or Software-based solutions",
      "Offline presentation must be in English",
      "Equal contribution from all team members is mandatory",
      "Preliminary demo (photo/video) submission deadline: 7th February",
      "Evaluation Criteria: Innovation and originality, Technical feasibility, Presentation clarity"
    ],
    time: "10:00 AM – 1:00 PM",
    coordinatorIds: ["madhu-mitha-r", "pratthima-s", "sandhiya-k", "chenthurr-c-k", "harsith-s-j"],
  },
  {
    id: "codathon",
    title: "Codathon",
    description: "To assess participants’ problem-solving ability, coding logic, and efficiency under time constraints.",
    fullDescription: "Codathon is a competitive programming event where participants solve algorithmic and real-world problems using their preferred programming languages.",
    category: "technical",
    image: "/images/CODATHON.png",
    rules: [
      "Open to all departments. Team size: 1 to 3 members",
      "Use of AI tools, plagiarism, or malpractice is prohibited",
      "Participants must bring their own laptop and mobile device",
      "Time limit: 2 to 3 hours",
      "Any programming language is allowed",
      "Late submissions will not be accepted",
      "Evaluation Criteria: Correctness and efficiency, Logical approach, Code quality"
    ],
    time: "10:00 AM – 01:00 PM",
    coordinatorIds: ["divya-harini", "kaviya", "subha", "thangam-s-k", "vishal-n", "sowmiyan-s"],
    isSpotlight: true,
  },
  {
    id: "ui-ux",
    title: "UXplore – UI / UX Design",
    description: "To evaluate creativity and user-centric design thinking through interface and experience design challenges.",
    fullDescription: "Participants design intuitive and visually effective user interfaces while maintaining usability and experience standards.",
    category: "technical",
    image: "/images/UXPLORE-UIUX.png",
    rules: [
      "Open to all departments. Team size: 2 to 3 members",
      "Two offline rounds",
      "Evaluation Criteria: Innovation and originality, Usability and feasibility, Presentation clarity"
    ],
    time: "10:00 AM – 1:00 PM",
    coordinatorIds: ["shijitha-jenifer", "ramya-s", "oviya-maheswari", "manojkrishna-m", "kabeel-raj-k"],
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "To test participants’ ability to design and develop functional, responsive websites within a limited timeframe.",
    fullDescription: "Participants create original web solutions showcasing modern design principles, coding skills, and technical execution.",
    category: "technical",
    image: "/images/WEB-DEVELOPMENT.png",
    rules: [
      "Open to all departments. Team size: 2 to 3 members",
      "Pre-built projects are not allowed",
      "Plagiarism or malpractice leads to disqualification",
      "Minimal AI assistance allowed; prompt-generated websites are prohibited",
      "Laptop and mobile device are mandatory",
      "Duration: 3 hours",
      "Evaluation Criteria: Originality of design and code, Relevance to theme, Creativity and execution"
    ],
    time: "10:00 AM – 01:00 PM",
    coordinatorIds: ["sathya-k", "anurathi-l", "aiswarya-v", "pooja-m", "jaya-surya"],
  },

  // Non-Technical Events
  {
    id: "quiz",
    title: "Quiz",
    description: "To test general knowledge, logical reasoning, and quick decision-making skills.",
    fullDescription: "A fast-paced quiz competition conducted across multiple rounds.",
    category: "non-technical",
    image: "/images/QUIZ.png",
    rules: [
      "Open to all departments. Team size: Exactly 2 members",
      "Quizmaster’s decision is final",
      "No electronic devices allowed except during buzzer round",
      "Malpractice results in disqualification",
      "Round 1: MCQs",
      "Round 2: Buzzer",
      "Duration: 1 hour"
    ],
    time: "10:00 AM – 11:00 AM",
    coordinatorIds: ["blessy-r", "monica-g", "gowtham-m", "prithiv-a-k"],
  },
  {
    id: "connections",
    title: "Connections",
    description: "To enhance analytical and associative thinking through pattern recognition challenges.",
    fullDescription: "Participants identify logical links between images, words, or concepts.",
    category: "non-technical",
    image: "/images/CONNECTIONS.png",
    rules: [
      "Open to all departments. Team size: 2 to 3 members",
      "No discussion between teams",
      "No mobile or internet usage",
      "Answers once submitted cannot be changed",
      "Quizmaster’s decision is final",
      "Evaluation Criteria: Accuracy, Relevance, Clarity of explanation"
    ],
    time: "11:30 AM – 12:30 PM",
    coordinatorIds: ["semmozhi-s", "agneya-p-k", "saru-bala-b", "reshma-b"],
  },
  {
    id: "e-sports",
    title: "E-Sports",
    description: "To promote teamwork, strategic thinking, and competitive gaming skills.",
    fullDescription: "Teams compete in selected multiplayer games through structured matches.",
    category: "non-technical",
    image: "/images/ESPORTS.png",
    rules: [
      "Open to all departments. Team size: As per game rules",
      "Preliminary and final rounds",
      "Duration: As per match schedule"
    ],
    time: "As per match schedule",
    coordinatorIds: [], // No coordinators listed in the prompt
    isSpotlight: true,
  },
  {
    id: "spotlight",
    title: "Spotlight",
    description: "To assess communication skills, confidence, and spontaneity.",
    fullDescription: "Participants compete in debate and Just-A-Minute (JAM) speaking rounds based on on-the-spot topics.",
    category: "non-technical",
    image: "/images/SPOTLIGHT.png",
    rules: [
      "Open to all departments. Individual participation only",
      "Topics will be given on the spot",
      "Offensive or inappropriate language is prohibited",
      "Round 1: Debate",
      "Round 2: JAM"
    ],
    time: "2:00 PM – 3:30 PM",
    coordinatorIds: ["sasmita-r", "nithanya-k", "ashmita-p", "juwairiya-m"],
    isSpotlight: true,
  },
  {
    id: "startup",
    title: "Startup Arena",
    description: "To encourage entrepreneurial thinking and business innovation among students.",
    fullDescription: "Participants pitch startup ideas focusing on innovation, market relevance, and feasibility.",
    category: "non-technical",
    image: "/images/STARTUP.png",
    rules: [
      "Open to all departments. Team size: 2 to 3 members",
      "Preliminary: Online PPT submission",
      "Final: Offline presentation before judges",
      "Duration: 10 minutes per team (presentation and Q&A)",
      "Evaluation Criteria: Innovation and originality, Business and technical feasibility, Clarity of presentation"
    ],
    time: "2:00 PM – 3:30 PM",
    coordinatorIds: ["priyaadharshini-s-k", "sri-dharshini", "mithun-m", "naveen-m", "abinesh-a", "amar-karthik"],
    isSpotlight: true,
  },
];

export const getEventsByCategory = (category: EventCategory): Event[] => {
  return events.filter(event => event.category === category);
};

export const getSpotlightEvents = (): Event[] => {
  return events.filter(event => event.isSpotlight);
};

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

export default events;
