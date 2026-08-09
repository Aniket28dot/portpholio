import { NextRequest, NextResponse } from 'next/server';
import { fetchDevToArticles, fetchDevToArticleById } from '@/lib/devto';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const username = searchParams.get('username') || 'aniket28dot';

  try {
    if (id) {
      const article = await fetchDevToArticleById(id);
      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json(article, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      });
    }

    const articles = await fetchDevToArticles(username);
    return NextResponse.json(articles, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error: any) {
    console.error('Error in Dev.to API proxy route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Dev.to content', details: error.message },
      { status: 500 }
    );
  }
}
