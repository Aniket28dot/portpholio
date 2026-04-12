"use client";

import * as React from "react";
import { motion } from "motion/react";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-bottom border-zinc-200 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-mono font-bold text-lg tracking-tighter">
          byAniket<span className="text-blue-600">.</span>
        </a>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {["About", "Experience", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-zinc-500 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
