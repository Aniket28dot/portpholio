"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Experience, Projects } from "@/components/sections";
import { ChatBar } from "@/components/chat-bar";
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
    <main className="min-h-screen">
      <Navbar />

      <Hero portfolioData={portfolioData} />

      <div id="about" className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12 items-start"
        >
          <div className="md:col-span-2 space-y-5">
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm mx-auto md:mx-0">
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
              <p className="text-sm font-medium text-zinc-700">
                Mumbai, Maharashtra
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed text-lg mb-8">
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
                    className="text-zinc-900 font-medium flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <Experience experience={portfolioData.experience} />

      <Projects projects={portfolioData.projects} />

      <section id="contact" className="py-20 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-zinc-900 text-white rounded-[2rem] p-12 md:p-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Let&apos;s build something{" "}
              <span className="text-blue-600 italic">extraordinary</span>{" "}
              together.
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Whether you have a specific project in mind or just want to chat
              about the future of tech, I&apos;m always open to new connections.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href="mailto:alex@example.com"
                className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" /> Say Hello
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-10 py-4 border border-zinc-700 rounded-full font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                LinkedIn <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="pt-24 pb-12 bg-zinc-950 text-zinc-200 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <p className="text-zinc-400 max-w-md leading-relaxed text-sm md:text-base">
                Actively building useful web experiences and AI-native products
                for teams that want speed, clarity, and real impact.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Sections
              </h4>
              <ul className="space-y-3 text-sm">
                {["About", "Experience", "Projects", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-zinc-300 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Connect
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:alex@example.com"
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-10">
            <h2 className="text-[15vw] md:text-[11vw] font-black tracking-tighter leading-[0.9] text-white/10 select-none mb-6">
              byAniket.com
            </h2>
            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-zinc-500 text-[11px] font-mono uppercase tracking-widest">
              <p>© {year} byAniket.com All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <ChatBar portfolioData={portfolioData} />
    </main>
  );
}
