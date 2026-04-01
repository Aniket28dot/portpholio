'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import type { ExperienceItem, ProjectItem } from '@/lib/portfolio-content';

export function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="py-20 border-t border-zinc-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Work Experience</h2>
        
        <div className="space-y-12">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l border-zinc-200"
            >
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <span className="text-sm font-mono text-zinc-500">{exp.period}</span>
              </div>
              
              <h4 className="text-blue-600 font-medium mb-4">{exp.company}</h4>
              <p className="text-zinc-600 mb-6 max-w-3xl leading-relaxed">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full border border-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects({ projects }: { projects: ProjectItem[] }) {
  return (
    <section id="projects" className="py-20 border-t border-zinc-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-zinc-50 rounded-2xl border border-zinc-200 hover:border-blue-600/50 transition-all flex flex-col"
            >
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>

              <div className="space-y-4 text-sm text-zinc-600 leading-relaxed mb-6">
                <p>
                  <span className="font-semibold text-zinc-900">Problem:</span> {project.problem}
                </p>
                <p>
                  <span className="font-semibold text-zinc-900">Solution:</span> {project.solution}
                </p>
                <p>
                  <span className="font-semibold text-zinc-900">Impact:</span> {project.impact}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100"
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
                  className="inline-flex items-center gap-1.5 text-zinc-900 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-900 hover:text-blue-600 transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
