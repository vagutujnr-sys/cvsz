import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { ArticleImage } from '@/components/article-image';
import { PageBanner } from '@/components/council-site';
import { articles, officialNewsUrl, pageHead } from '@/lib/council';

export const Route = createFileRoute('/news/')({
  head: () => pageHead(
    'News & Updates',
    'Guidance and perspectives on professional practice, veterinary learning and One Health.',
  ),
  component: News,
});

function News() {
  return (
    <main>
      <PageBanner
        eyebrow="News & updates"
        title="Insights for a stronger profession."
        description="Guidance and perspectives on professional practice, veterinary learning and our shared One Health future."
      />
      <section className="section-wrap">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <p className="editorial-copy max-w-3xl">
            These articles cover professional registration, continuing learning and the links between animal, human and environmental health.
          </p>
          <a href={officialNewsUrl} target="_blank" rel="noreferrer" className="text-link">
            View official Council news<ArrowRight className="size-4" />
          </a>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {articles.map(article => (
            <article key={article.slug} className="group">
              <ArticleImage
                article={article}
                imageClassName="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
              />
              <p className="mt-5 text-[11px] uppercase tracking-wider text-muted-foreground">{article.category}</p>
              <Link to="/news/$slug" params={{ slug: article.slug }} className="mt-3 block">
                <h2 className="text-2xl font-medium leading-9">{article.title}</h2>
              </Link>
              <p className="editorial-copy mt-4">{article.description}</p>
              <Link to="/news/$slug" params={{ slug: article.slug }} className="text-link mt-4">
                Read article<ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
