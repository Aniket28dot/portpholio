'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ExternalLink, Github, Calendar, CheckCircle2, Circle, Activity, GitCommit, Link as LinkIcon, Clock } from 'lucide-react';
import type { ExperienceItem, ProjectItem, WritingItem, GoalItem, StreakItem } from '@/lib/portfolio-content';
import { GlassCard } from './ui/glass-card';

export function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="py-20 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-zinc-900 dark:text-zinc-50">Work Experience</h2>
        
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 md:p-8">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                <span className="text-sm font-mono text-zinc-500 dark:text-zinc-400">{exp.period}</span>
              </div>
              
              <h4 className="text-blue-600 dark:text-blue-400 font-medium mb-4">{exp.company}</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-3xl leading-relaxed">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 text-xs rounded-full border border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects({ projects }: { projects: ProjectItem[] }) {
  return (
    <section id="projects" className="py-20 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-zinc-900 dark:text-zinc-50">Selected Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <GlassCard className="p-6 h-full flex flex-col">
              <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                <p>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-300">Problem:</span> {project.problem}
                </p>
                <p>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-300">Solution:</span> {project.solution}
                </p>
                <p>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-300">Impact:</span> {project.impact}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-4 text-sm font-medium">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Writings({ writings }: { writings: WritingItem[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  if (!writings?.length) return null;

  const allCategories = new Set<string>();
  writings.forEach((w) => {
    if (w.categories && w.categories.length > 0) {
      w.categories.forEach(c => allCategories.add(c));
    } else if (w.category) {
      allCategories.add(w.category);
    } else {
      allCategories.add("Uncategorized");
    }
  });
  const categoriesList = ["All", ...Array.from(allCategories)];
  
  const filteredWritings = selectedCategory === "All" 
    ? writings 
    : writings.filter(w => {
        if (w.categories && w.categories.length > 0) {
          return w.categories.includes(selectedCategory);
        }
        if (w.category) {
          return w.category === selectedCategory;
        }
        return selectedCategory === "Uncategorized";
      });

  const getNotionId = (url: string) => {
    // Basic regex to match 32-character notion ID format
    const match = url.match(/[a-f0-9]{32}/);
    if (match) return match[0];
    
    // Also try to match dash-separated UUID
    const matchDash = url.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/);
    if (matchDash) return matchDash[0].replace(/-/g, '');
    
    return null;
  };

  return (
    <section id="writings" className="py-20 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">Writings</h2>
        
        {categoriesList.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedCategory === category
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
                    : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWritings.map((post, i) => {
            const notionId = post.notionUrl ? getNotionId(post.notionUrl) : null;
            const href = notionId ? `/writings/${notionId}` : post.url;
            const isExternal = !notionId;

            return (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <GlassCard className="p-6 h-full flex flex-col group">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <time>{post.date}</time>
                    {((post.categories && post.categories.length > 0) || post.category) && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {post.categories && post.categories.length > 0 ? post.categories.join(', ') : post.category}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  {isExternal ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto"
                    >
                      Read Article <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto"
                    >
                      Read Article <LinkIcon className="w-4 h-4" />
                    </Link>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Goals({ goals }: { goals: GoalItem[] }) {
  if (!goals?.length) return null;
  return (
    <section id="goals" className="py-20 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-zinc-900 dark:text-zinc-50">Current Goals</h2>
        <GlassCard className="p-2 md:p-6">
          <div className="space-y-2">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start md:items-center justify-between p-4 rounded-xl hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-colors gap-4"
              >
                <div className="flex items-start gap-3">
                  {goal.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 md:mt-0 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-400 dark:text-zinc-500 mt-0.5 md:mt-0 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className={`font-medium ${goal.status === 'completed' ? 'line-through text-zinc-500 dark:text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                      {goal.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                  <Clock className="w-4 h-4" />
                  {goal.status === 'completed' ? `Done: ${goal.completedDate}` : `By: ${goal.deadline}`}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

export function Streaks({ streaks }: { streaks: StreakItem[] }) {
  if (!streaks?.length) return null;
  const getIcon = (iconName: string) => {
    if (iconName === 'activity') return <Activity className="w-8 h-8" />;
    if (iconName === 'git-commit') return <GitCommit className="w-8 h-8" />;
    return <Activity className="w-8 h-8" />;
  };

  return (
    <section id="streaks" className="py-20 border-t border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-zinc-900 dark:text-zinc-50">Streaks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {streaks.map((streak, i) => (
            <motion.div
              key={streak.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 md:p-8 flex items-center gap-6">
                <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                  {getIcon(streak.icon)}
                </div>
                <div>
                  <div className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-1">
                    {streak.value}
                  </div>
                  <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    {streak.label}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {streak.title} • {streak.date}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
