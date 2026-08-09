export const portfolioData = {
  name: "Aniket Bhatia",
  role: "Backend Developer",
  bio: "Specializing in high-performance Python backends, AWS Cloud infrastructure, AI integrations, and web application vulnerability mitigations. Based in Mumbai.",
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
    },
    {
      title: "SaferScans — Privacy-First QR Code Scanner",
      problem: "QR codes can obscure malicious URLs leading to phishing (quishing), homograph attacks, and hidden redirects without user inspection.",
      solution: "Built a 100% client-side camera feed decoding engine using jsQR and Web APIs with a security pipeline that analyzes URLs before opening.",
      impact: "Zero external dependencies or data transmission. Hosted on Cloudflare Pages with automated edge deployment, localized error pages, and dynamic XML sitemaps for SEO.",
      techStack: ["Astro", "TypeScript", "Tailwind CSS", "Vite", "Cloudflare Pages"],
      demoUrl: "https://saferscans.com",
      codeUrl: "#"
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
  writings: []
};
