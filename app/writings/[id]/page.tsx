import * as React from 'react';
import { NotionAPI } from 'notion-client';
import 'react-notion-x/src/styles.css';
import { Navbar } from '@/components/navbar';
import { NotionRendererWrapper } from './notion-renderer-wrapper';
import { ChatBar } from '@/components/chat-bar';
import { fetchPortfolioContent } from '@/lib/portfolio-cms';

const notion = new NotionAPI();

export default async function NotionBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const portfolioData = await fetchPortfolioContent();
  
  try {
    const recordMap = await notion.getPage(resolvedParams.id);
    
    return (
      <main className="min-h-screen relative z-0 flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 w-full flex-grow">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[50vh]">
            <NotionRendererWrapper recordMap={recordMap} />
          </div>
        </div>
        <ChatBar portfolioData={portfolioData} />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 relative z-0">
        <Navbar />
        <div className="text-center flex-grow flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">Error loading Notion page</h1>
          <p className="text-zinc-500">The page might not be public or the ID is incorrect.</p>
        </div>
        <ChatBar portfolioData={portfolioData} />
      </main>
    );
  }
}
