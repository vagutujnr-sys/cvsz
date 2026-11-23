import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, Clock3 } from 'lucide-react';
import { ArticleImage } from '@/components/article-image';
import { articles, pageHead } from '@/lib/council';

export const Route = createFileRoute('/news/$slug')({
  loader: ({ params }) => {
    const article = articles.find(item => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => pageHead(
    loaderData?.title ?? 'Article not found',
    loaderData?.description ?? 'This Council article could not be found.',
  ),
  component: Article,
});

function Article() {
  const article = Route.useLoaderData();
  const readingMinutes = Math.max(
    1,
    Math.ceil(article.paragraphs.join(' ').trim().split(/\s+/).length / 200),
  );
  const relatedArticles = articles.filter(item => item.slug !== article.slug);

  return (
    <main className="article-page">
      <header className="article-hero">
        <div className="article-hero-inner">
          <div className="article-hero-copy">
            <nav className="article-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight aria-hidden="true" />
              <Link to="/news">News & Updates</Link>
              <ChevronRight aria-hidden="true" />
              <span aria-current="page">{article.category}</span>
            </nav>
            <p className="article-category">{article.category}</p>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-deck">{article.description}</p>
            <div className="article-reading-time">
              <Clock3 aria-hidden="true" />
              <span>{readingMinutes} min read</span>
            </div>
          </div>
          <div className="article-hero-photo">
            <ArticleImage
              article={article}
              imageClassName="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </header>
      <article className="article-reading">
        <div className="article-reading-inner">
          {article.paragraphs.map(paragraph => (
            <p key={paragraph} className="article-paragraph">{paragraph}</p>
          ))}
          <Link to="/news" className="article-back-link">
            <ArrowRight aria-hidden="true" />Back to all articles
          </Link>
        </div>
      </article>
      <section className="article-related" aria-labelledby="related-articles-heading">
        <div className="article-related-inner">
          <div className="article-related-heading">
            <div>
              <p className="eyebrow text-muted-foreground">Continue reading</p>
              <h2 id="related-articles-heading">More perspectives</h2>
            </div>
            <Link to="/news" className="text-link">All articles<ArrowRight className="size-4" /></Link>
          </div>
          <div className="article-related-grid">
            {relatedArticles.map(item => (
              <Link
                key={item.slug}
                to="/news/$slug"
                params={{ slug: item.slug }}
                className="article-related-card"
              >
                <span>{item.category}<ArrowRight aria-hidden="true" /></span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
