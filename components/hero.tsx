'use client';

import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Twitter, Mail, Link2 } from 'lucide-react';
import type { PortfolioContent } from '@/lib/portfolio-content';

const iconMap = {
  Github,
  Linkedin,
  Twitter,
  Mail
};

function resolveSocialIcon(iconName: string) {
  const normalized = iconName.trim().toLowerCase();

  if (normalized === 'github') return Github;
  if (normalized === 'linkedin') return Linkedin;
  if (normalized === 'twitter' || normalized === 'x') return Twitter;
  if (normalized === 'mail' || normalized === 'email') return Mail;

  return iconMap[iconName as keyof typeof iconMap] ?? Link2;
}

export function Hero({ portfolioData }: { portfolioData: PortfolioContent }) {
  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-blue-600 font-mono text-sm mb-4 tracking-widest uppercase">
            Available for new opportunities
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-900 dark:text-zinc-50">
            {portfolioData.name}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-10">
            {portfolioData.role}. {portfolioData.bio}
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium hover:scale-105 transition-all flex items-center gap-2"
            >
              View Work <ArrowRight className="w-4 h-4" />
            </a>
            
            <div className="flex items-center gap-4">
              {portfolioData.socials.map((social) => {
                const Icon = resolveSocialIcon(social.icon);
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
