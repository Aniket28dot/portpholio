import { portfolioData } from '@/lib/data';

export type SocialLink = {
  name: string;
  url: string;
  icon: 'Github' | 'Linkedin' | 'Twitter' | 'Mail';
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
};

export type ProjectItem = {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  demoUrl: string;
  codeUrl: string;
};

export type WritingItem = {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  notionUrl?: string;
  categories?: string[];
};

export type GoalItem = {
  title: string;
  deadline: string;
  status: 'pending' | 'completed';
  completedDate?: string;
};

export type StreakItem = {
  title: string;
  value: string;
  label: string;
  date: string;
  icon: string;
};

export type PortfolioContent = {
  name: string;
  role: string;
  bio: string;
  profileImage: string;
  socials: SocialLink[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  interests: string[];
  writings: WritingItem[];
  goals: GoalItem[];
  streaks: StreakItem[];
};

export const PORTFOLIO_STORAGE_KEY = 'portfolio-content-v1';

export const defaultPortfolioContent: PortfolioContent = portfolioData;

export function getStoredPortfolioContent(): PortfolioContent | null {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PortfolioContent;
    return {
      ...defaultPortfolioContent,
      ...parsed,
      socials: parsed.socials ?? defaultPortfolioContent.socials,
      experience: parsed.experience ?? defaultPortfolioContent.experience,
      projects: parsed.projects ?? defaultPortfolioContent.projects,
      interests: parsed.interests ?? defaultPortfolioContent.interests,
      writings: parsed.writings ?? defaultPortfolioContent.writings,
      goals: parsed.goals ?? defaultPortfolioContent.goals,
      streaks: parsed.streaks ?? defaultPortfolioContent.streaks
    };
  } catch {
    return null;
  }
}

export function savePortfolioContent(content: PortfolioContent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(content));
}

export function resetPortfolioContent() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
}
