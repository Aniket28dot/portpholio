"use client";

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { ChatBar } from '@/components/chat-bar';
import { fetchPortfolioContent } from '@/lib/portfolio-cms';
import { Loader2, Calendar, ArrowLeft, Heart, MessageSquare, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { DevToArticle } from '@/lib/devto';

export default function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [article, setArticle] = React.useState<DevToArticle | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [portfolioData, setPortfolioData] = React.useState<any>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const resolvedParams = await params;
        const articleId = resolvedParams.id;

        const [cmsData, devtoRes] = await Promise.all([
          fetchPortfolioContent(),
          fetch(`/api/devto?id=${articleId}`)
        ]);

        if (isMounted) {
          setPortfolioData(cmsData);
        }

        if (!devtoRes.ok) {
          const errJson = await devtoRes.json().catch(() => ({}));
          throw new Error(errJson.details || errJson.error || 'Failed to fetch article');
        }

        const data = await devtoRes.json();
        if (isMounted) {
          setArticle(data);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Error fetching Dev.to article:", err);
          setError(err.message || 'Error loading article');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [params]);

  return (
    <main className="min-h-screen relative z-0 flex flex-col bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] text-zinc-800 dark:text-zinc-200">
      <Navbar />
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 w-full flex-grow flex flex-col">
        {loading ? (
          <div className="bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] rounded-3xl neu-flat min-h-[50vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Loading article...</p>
          </div>
        ) : error || !article ? (
          <div className="bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] rounded-3xl neu-flat min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">Error loading article</h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm mb-6">
              {error || "The article content could not be retrieved."}
            </p>
            <Link 
              href="/blog" 
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-[var(--color-accent)] text-white neu-flat hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        ) : (
          <article className="bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] rounded-3xl neu-flat overflow-hidden p-6 sm:p-10 flex flex-col gap-6">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            {article.cover_image && (
              <div className="rounded-2xl overflow-hidden neu-pressed h-64 sm:h-80 w-full relative">
                <img 
                  src={article.cover_image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time>{article.readable_publish_date}</time>
                </div>
                {article.public_reactions_count > 0 && (
                  <div className="flex items-center gap-1.5 text-rose-500">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>{article.public_reactions_count}</span>
                  </div>
                )}
                {article.comments_count > 0 && (
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>{article.comments_count}</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 leading-tight">
                {article.title}
              </h1>

              {(() => {
                const tagsArray: string[] = Array.isArray(article.tag_list)
                  ? article.tag_list
                  : typeof article.tag_list === 'string'
                  ? (article.tag_list as string).split(',').map(t => t.trim()).filter(Boolean)
                  : typeof article.tags === 'string'
                  ? (article.tags as string).split(',').map(t => t.trim()).filter(Boolean)
                  : Array.isArray(article.tags)
                  ? article.tags
                  : [];

                if (tagsArray.length === 0) return null;

                return (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tagsArray.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-[var(--color-neu-base)] dark:bg-[var(--color-neu-base-dark)] text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full neu-pressed-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                );
              })()}
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 leading-relaxed text-base sm:text-lg border-t border-zinc-200 dark:border-zinc-800 pt-6">
              {article.body_html ? (
                <div 
                  className="article-body space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-xl [&_img]:my-4"
                  dangerouslySetInnerHTML={{ __html: article.body_html }} 
                />
              ) : article.body_markdown ? (
                <ReactMarkdown>{article.body_markdown}</ReactMarkdown>
              ) : (
                <p>{article.description}</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read & Comment on Dev.to <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </article>
        )}
      </div>
      <ChatBar portfolioData={portfolioData} />
    </main>
  );
}
