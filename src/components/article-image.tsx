import type { CouncilArticle } from '@/lib/council';

export function ArticleImage({
  article,
  imageClassName,
  loading = 'lazy',
}: {
  article: CouncilArticle;
  imageClassName: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden">
        <img
          src={article.image}
          alt={article.imageAlt}
          width={article.imageWidth}
          height={article.imageHeight}
          loading={loading}
          className={imageClassName}
        />
      </div>
      <figcaption className="mt-2 text-[10px] leading-5 text-muted-foreground">
        Photo: <a href={article.imageSourceUrl} target="_blank" rel="noreferrer" className="underline">{article.imageCredit}</a>
        {' · '}
        {article.imageLicenseUrl
          ? <a href={article.imageLicenseUrl} target="_blank" rel="noreferrer" className="underline">{article.imageLicense}</a>
          : article.imageLicense}
      </figcaption>
    </figure>
  );
}
