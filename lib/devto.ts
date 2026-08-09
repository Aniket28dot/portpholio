export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  readable_publish_date: string;
  url: string;
  canonical_url: string;
  comments_count: number;
  public_reactions_count: number;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string | null;
  tag_list: string[];
  tags: string;
  slug: string;
  body_markdown?: string;
  body_html?: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
}

export async function fetchDevToArticles(username: string = 'aniket28dot'): Promise<DevToArticle[]> {
  try {
    const apiKey = process.env.DEVTO_API_KEY;
    const url = apiKey
      ? `https://dev.to/api/articles/me/published?per_page=100`
      : `https://dev.to/api/articles?username=${username}&per_page=100`;

    const headers: Record<string, string> = {};
    if (apiKey) {
      headers['api-key'] = apiKey;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      console.error(`Dev.to API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch articles from Dev.to:', error);
    return [];
  }
}

export async function fetchDevToArticleById(id: string | number): Promise<DevToArticle | null> {
  try {
    const res = await fetch(`https://dev.to/api/articles/${id}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`Dev.to API error fetching article ${id}: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch Dev.to article ${id}:`, error);
    return null;
  }
}
