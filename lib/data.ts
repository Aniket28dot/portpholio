export const portfolioData = {
  name: "Alex Chen",
  role: "Senior Full Stack Engineer",
  bio: "I build high-performance web applications with a focus on clean architecture and exceptional user experiences. Based in San Francisco, I specialize in React, Node.js, and AI integrations.",
  profileImage: "/profile_pic.png",
  socials: [
    { name: "GitHub", url: "https://github.com", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { name: "Email", url: "mailto:alex@example.com", icon: "Mail" }
  ],
  experience: [
    {
      company: "TechFlow Systems",
      role: "Senior Software Engineer",
      period: "2022 - Present",
      description: "Leading the frontend team in developing a real-time collaborative design tool. Improved application performance by 40% through strategic state management and code splitting.",
      skills: ["React", "TypeScript", "WebSockets", "Node.js"]
    },
    {
      company: "Innovate AI",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Developed and deployed multiple LLM-powered features for a customer support platform. Scaled the backend infrastructure to handle 1M+ monthly active users.",
      skills: ["Next.js", "Python", "PostgreSQL", "OpenAI API"]
    },
    {
      company: "StartUp Hub",
      role: "Junior Developer",
      period: "2018 - 2020",
      description: "Built responsive landing pages and internal dashboards. Collaborated closely with designers to implement pixel-perfect UI components.",
      skills: ["JavaScript", "CSS", "Vue.js", "Firebase"]
    }
  ],
  projects: [
    {
      title: "AI Canvas",
      problem: "Product teams struggled to turn rough ideas into clear technical diagrams during remote planning sessions.",
      solution: "Built a collaborative whiteboard with AI-assisted shape generation, prompt-driven diagram suggestions, and real-time multiplayer sync.",
      impact: "Cut planning time by 35% and increased design-to-build alignment across distributed teams.",
      techStack: ["React", "TypeScript", "Canvas API", "WebSockets", "Gemini API"],
      demoUrl: "https://example.com/ai-canvas",
      codeUrl: "https://github.com/example/ai-canvas"
    },
    {
      title: "EcoTrack",
      problem: "Users wanted sustainability insights but found manual carbon tracking tedious and inconsistent.",
      solution: "Created a mobile-first tracker with OCR-based receipt scanning, automatic category mapping, and personalized reduction tips.",
      impact: "Improved weekly logging consistency by 2.4x and helped users reduce reported footprint by 18% in 3 months.",
      techStack: ["Next.js", "Tailwind CSS", "OCR", "PostgreSQL", "Server Actions"],
      demoUrl: "https://example.com/ecotrack",
      codeUrl: "https://github.com/example/ecotrack"
    },
    {
      title: "StreamLine",
      problem: "Streaming operators lacked a single dashboard for live quality metrics and viewer behavior insights.",
      solution: "Developed a real-time analytics console combining stream health telemetry, engagement charts, and anomaly alerts.",
      impact: "Reduced incident response time by 42% and improved stream uptime during peak events.",
      techStack: ["TypeScript", "Next.js", "WebRTC", "D3.js", "Node.js"],
      demoUrl: "https://example.com/streamline",
      codeUrl: "https://github.com/example/streamline"
    }
  ],
  interests: [
    "Generative AI & LLMs",
    "Clean Code & Architecture",
    "Digital Minimalism",
    "Mechanical Keyboards",
    "Urban Photography"
  ]
};
