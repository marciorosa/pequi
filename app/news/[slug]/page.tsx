import NewsArticleExperience from './NewsArticleExperience';

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <NewsArticleExperience slug={slug} />;
}
