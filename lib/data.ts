export const portfolioData = {
  name: "Aniket Bhatia",
  role: "Backend Developer",
  bio: "I try to build high-performance web applications with a focus on clean architecture and exceptional user experiences. Based in Mumbai, I specialize in backend development using Python and AI integrations.",
  profileImage: "/profile_image_canva_edit.png",
  socials: [
    { name: "GitHub", url: "https://github.com/Aniket28dot", icon: "Github" as const },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aniket-bhatia-1b04811bb/", icon: "Linkedin" as const },
    { name: "Twitter", url: "https://x.com/aniketbhatia28", icon: "Twitter" as const },
    { name: "Email", url: "mailto:work.aniketbhatia28@gmail.com", icon: "Mail" as const }
  ],
  experience: [
    {
      company: "BPCL",
      role: "Backend Developer",
      period: "2024 - Present",
      description: "Leading the backend for quick-commerce vertical of the organization",
      skills: ["Python", "FastAPI", "Azure/AWS Cloud", "Redis", "Elasticsearch", "Object Oriented Design"]
    },
    {
      company: "Code4GovTech",
      role: "Open Source Developer",
      period: "July'23 - August'23",
      description: "Developed a WhatsApp-based appointment booking system for Bahmni, a healthcare management system",
      skills: ["Java", "Springboot", "Meta SDK", "Meta Graph APIs"]
    },
    {
      company: "DataHive Labs",
      role: "SDE Intern",
      period: "Jan'23 - June'23",
      description: "Built doctor-patient engagement systems using AWS Cloud stack",
      skills: ["Python", "Problem Solving", "API Integrations", "AWS Cloud"]
    }
  ],
  projects: [
    {
      title: "NFR - Non Fuel Retail",
      problem: "BPCL owned In-Out (I&O stores) faced challenges in penetrating the market with the rise of quick-commerce based solutions",
      solution: "Developing a backend system using FastAPI that integrates with the existing inventory and sales systems to penetrate the relevant customers and reduce the cost of acquisition",
      impact: "With this going live, the e-commerce vertical is expected to grow by 10-20% in the next year",
      techStack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Elasticsearch"],
      demoUrl: "https://example.com/nfr",
      codeUrl: "https://github.com/example/nfr"
    },
    {
      title: "Seekers Feed",
      problem: "Lack of a single platform for people seeking answers to some relevant questions",
      solution: "A simple CMS based blog platform to help people seek answers to their questions",
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
    "Backend Development",
    "Problem Solving",
    "Clean Code & Architecture",
    "Yoga & Sportz",
    "Mangoes during Summers",
    "Pakodas during Rains",
    "Soaking Sun during Winters",
    "Blooming Trees during Spring"
  ],
  writings: [
    {
      title: "Kaikeyi & Manthara: Devastation by Disinformation",
      excerpt: "Embedded Notion Blog",
      date: "May 02, 2026",
      url: "#",
      notionUrl: "https://www.notion.so/Kaikeyi-Manthara-Devastation-by-Disinformation-b6d6bd6cad2548ed9183d4c8ddeb5bd2?source=copy_link",
      categories: ["Mythology", "History"]
    },
    {
      title: "Building Resilient APIs with FastAPI",
      excerpt: "Lessons learned from building the quick-commerce backend at BPCL.",
      date: "Oct 12, 2025",
      url: "https://example.com/blog/fastapi-resilience",
      categories: ["Tech", "Backend"]
    },
    {
      title: "Why I Love Clean Architecture",
      excerpt: "Separating concerns makes your code maintainable and testable.",
      date: "Aug 05, 2025",
      url: "https://example.com/blog/clean-architecture",
      categories: ["Tech", "Architecture"]
    }
  ],
  goals: [
    {
      title: "Master Rust Programming",
      deadline: "Dec 31, 2026",
      status: "pending" as const
    },
    {
      title: "Launch Personal AI Assistant",
      deadline: "Jun 01, 2026",
      status: "completed" as const,
      completedDate: "May 15, 2026"
    },
    {
      title: "Run a Half Marathon",
      deadline: "Nov 20, 2026",
      status: "pending" as const
    }
  ],
  streaks: [
    {
      title: "Morning Run",
      value: "45",
      label: "Days Streak",
      date: "Last run: Today",
      icon: "activity"
    },
    {
      title: "Open Source Contributions",
      value: "12",
      label: "Weeks Streak",
      date: "Last PR: Yesterday",
      icon: "git-commit"
    }
  ]
};
