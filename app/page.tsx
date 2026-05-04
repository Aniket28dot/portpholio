"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Experience, Projects } from "@/components/sections";
import { ChatBar } from "@/components/chat-bar";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "motion/react";
import { Mail, ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { defaultPortfolioContent } from "@/lib/portfolio-content";
import { fetchPortfolioContent } from "@/lib/portfolio-cms";

export default function Home() {
  const year = 2026;
  const [portfolioData, setPortfolioData] = React.useState(
    defaultPortfolioContent,
  );

  React.useEffect(() => {
    let cancelled = false;
    fetchPortfolioContent().then((content) => {
      if (!cancelled) setPortfolioData(content);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen relative z-0">
      <Navbar />

      <Hero portfolioData={portfolioData} />

      <div id="about" className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start">
              <div className="md:col-span-2 space-y-5">
                <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm mx-auto md:mx-0">
                  <Image
                    src={portfolioData.profileImage}
                    alt={`${portfolioData.name} profile photo`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 224px, 176px"
                    priority
                  />
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-600">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Mumbai, Maharashtra
                  </p>
                </div>
              </div>

              <div className="md:col-span-3">
                <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">About Me</h2>
                <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-8">
                  <p>
                    I&apos;m a software engineer who loves building tools that
                    empower people. My journey started with a curiosity for how
                    things work under the hood, which led me to dive deep into web
                    technologies and eventually AI.
                  </p>
                  <p>
                    Currently, I&apos;m focused on exploring the intersection of
                    human creativity and artificial intelligence. I believe that AI
                    should be a co-pilot, not a replacement, and I strive to build
                    backend systems in a way that reflects this philosophy.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-400 mb-4">
                    Interests
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {portfolioData.interests.map((interest) => (
                      <li
                        key={interest}
                        className="text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <Experience experience={portfolioData.experience} />

      <Projects projects={portfolioData.projects} />

      <section id="contact" className="py-20 border-t border-zinc-200/50 dark:border-zinc-800/50 relative z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-[2rem] p-12 md:p-20 text-zinc-900 dark:text-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Let&apos;s build something{" "}
              <span className="text-blue-600 italic">extraordinary</span>{" "}
              together.
            </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                Whether you have a specific project in mind or just want to chat
                about the future of tech, I&apos;m always open to new connections.
              </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a
                  href="mailto:alex@example.com"
                  className="w-full md:w-auto px-10 py-4 bg-blue-600/90 hover:bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-500/20 backdrop-blur-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" /> Say Hello
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-10 py-4 border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 hover:bg-white/80 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white rounded-full font-bold backdrop-blur-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  LinkedIn <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 relative z-10 overflow-hidden mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50 dark:to-zinc-950/50 -z-10" />
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-none text-zinc-900/5 dark:text-white/5 select-none mb-10 hover:text-zinc-900/10 dark:hover:text-white/10 transition-colors duration-500">
            byAniket.com
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16 text-sm md:text-base font-medium text-zinc-600 dark:text-zinc-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter</a>
            <a href="mailto:alex@example.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Email</a>
          </div>

          <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent mb-8" />
          
          <div className="flex flex-col items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            <p>Actively building useful web experiences</p>
            <p>© {year} byAniket.com All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatBar portfolioData={portfolioData} />
    </main>
  );
}
