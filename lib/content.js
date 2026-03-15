export const person = {
  name: "M Talha Manzoor",
  location: "Lahore, Pakistan",
  title: "Full-Stack Developer",
  email: "mtalhamanzoor32@gmail.com",
  phone: "+92 323 4003815",
  github: "https://github.com/happiestt-talha",
  linkedin: "https://linkedin.com/in/mt4lha",
};

export const roles = [
  "Full-Stack Developer",
  "React & Next.js Engineer",
  "MERN Stack Specialist",
  "UI/UX Craftsman",
];

export const about = {
  label: "// about me",
  bio:
    "Full-Stack Developer with 2+ years of experience based in Lahore, Pakistan. I’m studying at Lahore Garrison University (CGPA 3.65) and I’m passionate about building performant, beautiful web applications. Currently, I’m working on a Computer Vision-powered Cricket Coaching Assistant as my Final Year Project.",
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "3.65", label: "CGPA" },
    { value: "3+", label: "Client Products Shipped" },
    { value: "5+", label: "International Clients Served" },
  ],
};

export const experience = [
  {
    company: "Penova Tech",
    role: "Full-stack Developer",
    range: "Jun 2025 – Oct 2025",
    location: "Lahore, Pakistan",
    bullets: [
      "Built and shipped product features across frontend and backend with a focus on performance and reliability.",
      "Collaborated with design and QA to deliver polished UI with strong accessibility and responsiveness.",
      "Improved API integration patterns and reduced regressions via better component structure and testing discipline.",
    ],
  },
  {
    company: "Zai Systems",
    role: "Frontend Developer",
    range: "Oct 2024 – Mar 2025",
    location: "Lahore, Pakistan",
    bullets: [
      "Delivered responsive, production-grade React UIs with clean state management and reusable components.",
      "Implemented micro-interactions and motion patterns to elevate UX quality without sacrificing performance.",
      "Partnered with backend engineers to integrate REST APIs and handle edge cases gracefully.",
    ],
  },
  {
    company: "Dextrologix",
    role: "Web Developer",
    range: "Sep 2023 – Aug 2024",
    location: "Lahore, Pakistan",
    bullets: [
      "Developed and maintained client-facing web apps with modern JavaScript and clean UI structure.",
      "Shipped features for international clients with high attention to detail and consistent delivery cadence.",
      "Improved UI consistency and component reuse to speed up iteration across projects.",
    ],
  },
  {
    company: "Lahore Garrison University",
    role: "Final Year Project — Cricket Coaching Assistant",
    range: "Nov 2025 – Present",
    location: "Lahore, Pakistan",
    bullets: [
      "Designing a computer vision pipeline for cricket action analysis and feedback.",
      "Building APIs and an interface to visualize insights with clear UX and readable outputs.",
    ],
  },
];

export const skills = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Material UI",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    title: "Auth & Cloud",
    items: ["Firebase", "OAuth", "JWT", "Vercel", "Docker"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub Actions", "Postman", "Figma", "VS Code"],
  },
];

export const projects = [
  {
    slug: "cricket-coaching-assistant",
    featured: true,
    name: "Cricket Coaching Assistant (FYP)",
    description:
      "Computer vision-powered coaching assistant that analyzes technique and surfaces actionable feedback.",
    tech: ["Python", "YOLO", "REST APIs"],
    // image: "/projects/cricket-coaching-assistant.svg",
    video: "/videos/cricket-coaching-assistant.webm",
    github: "",
    live: "",
    overview:
      "A final year project that combines computer vision detection with a clean interface to help players refine technique using repeatable insights.",
    features: [
      "Action detection and key event identification",
      "REST API layer to serve predictions and metadata",
      "Readable UX for feedback and progress tracking",
    ],
    challenges: [
      {
        problem: "Balancing model accuracy with real-time constraints.",
        solution:
          "Optimized inference settings and designed the UI to communicate confidence and uncertainty clearly.",
      },
    ],
  },
  {
    slug: "devido",
    name: "Devido — Video Sharing Platform",
    description: "A modern video sharing platform with creator-friendly UX.",
    tech: ["React", "Node", "MongoDB"],
    image: "/projects/devido.svg",
    github: "",
    live: "",
    overview:
      "A full-stack video platform focused on smooth browsing, structured content, and scalable API patterns.",
    features: ["Video feeds", "Creator profiles", "Auth and secure data flows"],
    challenges: [
      {
        problem: "Keeping interactions snappy at scale.",
        solution:
          "Improved component structure and optimized requests while keeping the UI animation-rich.",
      },
    ],
  },
  {
    slug: "chick-kart",
    name: "Chick Kart — E-commerce Store",
    description: "A MERN e-commerce experience with payments and admin flows.",
    tech: ["MERN", "Stripe"],
    image: "/projects/chick-kart.svg",
    github: "",
    live: "",
    overview:
      "An end-to-end store including product browsing, cart + checkout, and secure payment handling.",
    features: ["Cart & checkout", "Payment integration", "Order management"],
    challenges: [
      {
        problem: "Reliable checkout with edge cases.",
        solution:
          "Handled validation, retries, and clear UI feedback throughout the payment flow.",
      },
    ],
  },
  {
    slug: "journivo",
    name: "Journivo — Blogging App",
    description: "A clean blogging platform with structured state management.",
    tech: ["React", "Redux", "Material UI"],
    image: "/projects/journivo.svg",
    github: "",
    live: "",
    overview:
      "A blog platform with a focus on consistent UI patterns and maintainable state flows.",
    features: ["Post CRUD", "UI consistency", "Reusable components"],
    challenges: [
      {
        problem: "Keeping UI state predictable with complex forms.",
        solution: "Standardized state updates and consolidated validation logic.",
      },
    ],
  },
  {
    slug: "online-tutoring-system",
    name: "Online Tutoring System",
    description: "A real-time tutoring platform with payments and live sessions.",
    tech: ["Node", "GraphQL", "WebRTC", "Stripe"],
    image: "/projects/online-tutoring-system.svg",
    github: "",
    live: "",
    overview:
      "A tutoring platform with scheduling, payments, and real-time sessions, designed with strong UX for students and tutors.",
    features: ["GraphQL API", "WebRTC sessions", "Stripe payments"],
    challenges: [
      {
        problem: "Real-time session reliability across networks.",
        solution:
          "Designed resilient signaling flows and clear UX fallbacks for reconnect scenarios.",
      },
    ],
  },
];

export const certifications = [
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    year: "2024",
  },
  {
    name: "Cybersecurity Attack and Defense Fundamentals",
    issuer: "EC-Council",
    year: "2024",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getNextProjectSlug(slug) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return projects[0]?.slug ?? null;
  return projects[(idx + 1) % projects.length]?.slug ?? null;
}

