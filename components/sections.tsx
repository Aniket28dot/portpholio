'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ExternalLink, Github, Calendar, Link as LinkIcon } from 'lucide-react';
import type { ExperienceItem, ProjectItem, WritingItem } from '@/lib/portfolio-content';
import { GlassCard } from './ui/glass-card';

export function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="py-20">
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
                    className="px-3 py-1 bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] text-zinc-600 dark:text-zinc-300 text-xs rounded-full neu-pressed-sm"
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
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-zinc-900 dark:text-zinc-50">Projects</h2>
        
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
              <div className="mb-6 rounded-xl overflow-hidden neu-pressed h-48 relative shrink-0">
                <img 
                  src={((project.demoUrl || (project as any).demoURL) && (project.demoUrl || (project as any).demoURL) !== '#') ? `https://api.microlink.io/?url=${encodeURIComponent(project.demoUrl || (project as any).demoURL)}&screenshot=true&meta=false&embed=screenshot.url` : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'} 
                  alt={`Preview of ${project.title}`} 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
              </div>
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
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] text-[var(--color-accent)] neu-pressed-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-4 text-sm font-medium">
                <a
                  href={project.demoUrl || (project as any).demoURL || '#'}
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

export function Writings({ writings }: { writings?: WritingItem[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [devtoArticles, setDevtoArticles] = React.useState<WritingItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function loadDevtoPosts() {
      try {
        const res = await fetch('/api/devto');
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped: WritingItem[] = data.map((item: any) => {
            const rawTags = Array.isArray(item.tag_list)
              ? item.tag_list
              : typeof item.tag_list === 'string'
              ? item.tag_list.split(',').map((t: string) => t.trim()).filter(Boolean)
              : typeof item.tags === 'string'
              ? item.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
              : Array.isArray(item.tags)
              ? item.tags
              : [];

            return {
              title: item.title,
              excerpt: item.description,
              date: item.readable_publish_date,
              url: `/blog/${item.id}`,
              categories: rawTags.length > 0 ? rawTags : ['Dev.to']
            };
          });
          setDevtoArticles(mapped);
        }
      } catch (err) {
        console.error('Failed to load Dev.to articles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDevtoPosts();
  }, []);

  const articlesToList = devtoArticles;

  if (loading && !articlesToList.length) {
    return (
      <section id="writings" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-zinc-500 dark:text-zinc-400">
          Loading articles...
        </div>
      </section>
    );
  }

  if (!articlesToList.length) {
    return (
      <section id="writings" className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-zinc-500 dark:text-zinc-400">
          No articles found.
        </div>
      </section>
    );
  }

  const allCategories = new Set<string>();
  articlesToList.forEach((w) => {
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
    ? articlesToList 
    : articlesToList.filter(w => {
        if (w.categories && w.categories.length > 0) {
          return w.categories.includes(selectedCategory);
        }
        if (w.category) {
          return w.category === selectedCategory;
        }
        return selectedCategory === "Uncategorized";
      });

  return (
    <section id="writings" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">Blog & Writings</h2>
        
        {categoriesList.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedCategory === category
                    ? "bg-[var(--color-accent)] text-white neu-pressed border-transparent"
                    : "bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] text-zinc-600 dark:text-zinc-400 border-transparent neu-sm hover:translate-y-[-1px]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWritings.map((post, i) => {
            const isExternal = post.url.startsWith('http');

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
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto"
                    >
                      Read Article <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={post.url}
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
