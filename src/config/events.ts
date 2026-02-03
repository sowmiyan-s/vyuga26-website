// Events configuration for VYUGA 26

import { siteConfig } from "./config";

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
  hasCashPrize?: boolean;
  isPreRegistration?: boolean;
  submissionLink?: string;
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
    hasCashPrize: true,
    isPreRegistration: true,
    submissionLink: "https://docs.google.com/forms/d/e/1FAIpQLSeO7HIiZ-oI2spHVyGf7oS2Dt55A0UgFHcicYbnH883yiYUhg/viewform",
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
      `Preliminary demo (photo/video) submission deadline: ${siteConfig.registrationCloseDate}`,
      "Evaluation Criteria: Innovation and originality, Technical feasibility, Presentation clarity"
    ],
    time: "10:00 AM – 1:00 PM",
    coordinatorIds: ["madhu-mitha-r", "pratthima-s", "sandhiya-k", "chenthurr-c-k", "harsith-s-j"],
    hasCashPrize: true,
  },
  {
    id: "codathon",
    title: "Codathon",
    description: "Codathon is a competitive programming event designed to evaluate participants’ problem-solving ability, algorithmic thinking, and coding efficiency.",
    fullDescription: "Codathon is a competitive programming event designed to evaluate participants’ problem-solving ability, algorithmic thinking, and coding efficiency. Participants will solve Data Structures and Algorithms (DSA)–based problems on an online coding platform using their own laptops. The problem set will include Easy, Medium, and Hard difficulty levels, and submissions will be evaluated through an automated judging system that ensures fair and unbiased scoring. Strict monitoring will be enforced, and the use of AI tools or any form of malpractice is not permitted.",
    category: "technical",
    image: "/images/CODATHON.png",
    rules: [
      "Participants must bring their own laptop to take part in the event",
      "All problems must be solved on the designated online coding platform",
      "Use of AI tools, plagiarism, or any external assistance is strictly prohibited",
      "Any programming language is allowed",
      "Late submissions will not be accepted",
      "Participants must follow the instructions provided by the coordinators throughout the event",
      "Open to all departments. Team size: 1 – 3 members",
      "Rounds: Single round (Online Coding Challenge)",
      "Duration: 2 – 3 hours",
      "Problem levels: Easy / Medium / Hard",
      "Scoring: Fully automated evaluation",
      "Evaluation Criteria: Correctness and efficiency of solutions, Logical and algorithmic approach, Code quality and optimization"
    ],
    time: "Duration: 2 – 3 hours",
    coordinatorIds: ["divya-harini", "kaviya", "subha", "thangam-s-k", "vishal-n", "sowmiyan-s"],
    isSpotlight: true,
    hasCashPrize: true,
  },
  {
    id: "ui-ux",
    title: "UXplore – UI / UX Design",
    description: "UXplore is an exciting UI/UX design competition that challenges participants to explore, analyze, and design meaningful digital experiences.",
    fullDescription: "UXplore is an exciting UI/UX design competition that challenges participants to explore, analyze, and design meaningful digital experiences. The event focuses on user-centered design, encouraging students to think beyond visuals and craft interfaces that are intuitive, accessible, and impactful. Participants will be given a real-world problem statement and are expected to design creative and functional solutions within a limited time. UXplore provides a platform for students to showcase their design thinking, creativity, and problem-solving skills using modern UI/UX tools.",
    category: "technical",
    image: "/images/UXPLORE-UIUX.png",
    rules: [
      "Open to all departments. Team size: 1 – 3 members",
      "Designs must be original. Plagiarism or copying direct disqualification",
      "No pre-made templates allowed",
      "The use of AI tools for creating designs is strictly prohibited",
      "Participants must design only during the event time. Any prior work is not allowed",
      "Participants may use only UI/UX design tools (Figma, Adobe XD, Penpot, Canva, etc.). Coding is not required",
      "Participants should be ready to explain their design decisions if asked by the judges",
      "Organizers reserve the right to modify rules or disqualify entries if necessary",
      "Rounds: Preliminary / Final",
      "Duration: 180 minutes",
      "Evaluation Criteria: User Experience (UX) & Flow, Creativity & Innovation, Visual Design (UI), Usability & Accessibility, Problem Understanding, Presentation / Explanation"
    ],
    time: "Duration: 180 minutes",
    coordinatorIds: ["manojkrishna-m", "kabeel-raj-k", "shijitha-jenifer", "ramya-s", "oviya-maheswari"],
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

  {
    id: "tech-architecture",
    title: "TECH ARCHITECTURE",
    description: "Tech Architecture is a hands-on technical event where participants are required to analyse, design, and clone the architecture of a given application within a limited time.",
    fullDescription: "The event focuses on system design thinking, architectural planning, scalability, feasibility, and clarity of presentation rather than just coding. Participants must demonstrate their understanding of how real-world applications are structured and delivered efficiently.",
    category: "technical",
    image: "/images/TECH-ARCHITECTURE.png",
    rules: [
      "Open to all departments. Team size: 2 – 3 members",
      "A specific application/problem statement will be provided on the spot",
      "The architecture design must be original and created during the event",
      "Any form of plagiarism or copying existing architectures will lead to immediate disqualification",
      "Participants are allowed to use tools such as VS Code, Figma, Lucid chart, Draw.io, or similar design tools",
      "The decision of the judges will be final and binding",
      "Laptop (mandatory)",
      "Basic knowledge of system design, architecture patterns, and application flow",
      "Number of Rounds: Single Round",
      "Evaluation Criteria: Innovation & Creativity, Technical Feasibility, Architecture clarity & structure, Presentation & Communication skills"
    ],
    time: "Duration: 3 Hours",
    coordinatorIds: ["amar-karthik", "aiswarya-r", "kokiladevi-a", "pilo-francy-f", "shivani-t"],
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
    title: "Esports",
    description: "Esports is a competitive gaming tournament featuring popular multiplayer battle royale titles such as Free Fire and PUBG/BGMI.",
    fullDescription: "Esports is a competitive gaming tournament featuring popular multiplayer battle royale titles such as Free Fire and PUBG/BGMI. The event is designed to test players’ strategic gameplay, teamwork, reflexes, and in-game decision-making skills. Matches will be conducted as full-map battle royale games under standard tournament conditions to ensure fair and competitive play.",
    category: "non-technical",
    image: "/images/ESPORTS.png",
    rules: [
      "Matches will be conducted in full-map battle royale format",
      "Players must use their own mobile devices and stable internet connection",
      "Only in-game voice chat is allowed during matches",
      "Use of hacks, mods, emulators (unless permitted), or any third-party software is strictly prohibited",
      "Teaming with other squads, exploiting glitches, or intentional unfair play is not allowed",
      "Players must join the custom room on time; late entry may lead to disqualification",
      "All participants must follow the instructions given by the coordinators",
      "The coordinators reserve the right to modify rules or match settings at any time to ensure fair conduct of the tournament",
      "Open to all departments",
      "Team size: As per game rules (Solo / Duo / Squad)",
      "Game titles: Free Fire / PUBG (BGMI)",
      "Match type: Full-map custom room match",
      "Rounds: Preliminary and Final (based on number of teams)",
      "Duration: As per match progression and game rules",
      "Evaluation Criteria: Placement / Rank achieved, Team coordination and fair play"
    ],
    time: "As per match schedule",
    coordinatorIds: ["prasanth", "sebin", "harshit", "rishvan", "nandha-kumar"],
    isSpotlight: true,
    hasCashPrize: true,
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
      "Open to all departments. Team size: 1 to 3 members",
      "Preliminary: Online PPT submission",
      "Final: Offline presentation before judges",
      "Duration: 10 minutes per team (presentation and Q&A)",
      "Evaluation Criteria: Innovation and originality, Business and technical feasibility, Clarity of presentation"
    ],
    time: "2:00 PM – 3:30 PM",
    coordinatorIds: ["priyaadharshini-s-k", "sri-dharshini", "mithun-m", "naveen-m", "abinesh-a"],
    isSpotlight: true,
    isPreRegistration: true,
    submissionLink: "https://docs.google.com/forms/d/1rBud14mlpEXRUGruziuF3H2oWdjULKhdyPxUdSkyY4g/edit?pli=1",
  },
];

export const getEventsByCategory = (category: EventCategory): Event[] => {
  return events.filter(event => event.category === category);
};

export const getSpotlightEvents = (): Event[] => {
  return events.filter(event => event.isSpotlight);
};

export const getCashPrizeEvents = (): Event[] => {
  return events.filter(event => event.hasCashPrize);
};

export const getPreRegistrationEvents = (): Event[] => {
  return events.filter(event => event.isPreRegistration);
};

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

export default events;
