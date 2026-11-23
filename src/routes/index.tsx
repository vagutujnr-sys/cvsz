import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from 'react';
import clinicImage from '@/assets/clinic-care.jpg';
import crest from '@/assets/cvsz-logo.png';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight, GraduationCap, ClipboardCheck, Scale, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleImage } from '@/components/article-image';
import { useCouncilModal } from '@/components/council-site';
import { articles, pageHead } from '@/lib/council';
import fieldImage from '@/assets/veterinary-field.jpg';
import landImage from '@/assets/one-health.jpg';
export const Route = createFileRoute("/")({
  head: () => pageHead('Advancing Veterinary Excellence in Zimbabwe', 'The Council of Veterinary Surgeons of Zimbabwe regulates the veterinary profession and safeguards animal health, public health and welfare.'),
  component: Index,
});
function Index() {
  const open = useCouncilModal();
  const responsibilities = [
    { icon: GraduationCap, title: 'Veterinary Education', description: 'Building a competent veterinary workforce.', hash: 'education' },
    { icon: ClipboardCheck, title: 'Professional Registration', description: 'Upholding qualifications and accountability.', hash: 'registration' },
    { icon: Scale, title: 'Professional Conduct', description: 'Protecting the integrity of the profession.', hash: 'conduct' },
    { icon: Stethoscope, title: 'Standards of Practice', description: 'Promoting safe, ethical veterinary care.', hash: 'standards' },
  ];
  return <main className="home-page">
    <HeroSlider onVerify={() => open('verify')} />
    <section id="council" className="section-wrap scroll-mt-28"><div className="grid items-center gap-14 md:grid-cols-2">
      <div><div className="eyebrow mb-6 text-muted-foreground">About the Council</div><h2 className="section-heading">Regulating the Profession.<br /><span className="text-primary">Safeguarding the Nation.</span></h2><p className="editorial-copy mt-6">The Council of Veterinary Surgeons of Zimbabwe has the statutory mandate to regulate the veterinary profession and improve veterinary services in Zimbabwe.</p><p className="editorial-copy mt-4">Through the regulation of veterinary education, registration, professional conduct and standards of practice, the Council seeks to ensure that Zimbabwe is served by a competent, ethical and accountable veterinary workforce.</p><Link to="/about" className="text-link mt-6">Get to know the Council<ArrowRight className="size-4" /></Link></div>
      <div className="photo-frame"><img src={fieldImage} alt="Veterinary care supporting Zimbabwe’s agricultural communities" width={1920} height={1088} loading="lazy" className="aspect-[5/4] w-full object-cover object-[70%_center]" /><p className="mt-4 text-[11px] text-muted-foreground">Professional care. Lasting impact.</p></div>
    </div></section>
    <section className="bg-surface"><div className="section-wrap grid gap-12 md:grid-cols-[.9fr_1.1fr]"><div><div className="eyebrow mb-6 text-muted-foreground">Our regulatory responsibilities</div><h2 className="section-heading">A foundation<br />for excellence.</h2><p className="editorial-copy mt-6 max-w-sm">Maintaining the standards that strengthen our profession and protect the communities we serve.</p><Link to="/about" className="text-link mt-6">Explore our mandate<ArrowRight className="size-4" /></Link></div><div>{responsibilities.map((item, i) => <Link to="/about" hash={item.hash} className="responsibility" key={item.title}><span className="text-[11px] text-muted-foreground">0{i + 1}</span><item.icon className="size-6 shrink-0 text-primary" strokeWidth={1.4} /><div className="flex-1"><h3 className="text-lg font-medium">{item.title}</h3><p className="mt-1 text-xs text-muted-foreground">{item.description}</p></div><ArrowRight className="size-4" /></Link>)}</div></div></section>
    <section className="one-health"><img src={landImage} alt="Cattle and a farmer in Zimbabwe’s rural landscape" className="hero-image" width={1600} height={912} loading="lazy" /><div className="section-wrap relative z-10 w-full"><div className="eyebrow mb-6 text-accent">Our shared future</div><h2 className="section-heading max-w-lg">One Health.<br />One Welfare.<br /><span className="text-accent">One Zimbabwe.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-hero-foreground/85">Healthy animals. Healthy people. A thriving environment. Our work connects them all, for a more resilient and sustainable nation.</p><Button variant="hero" asChild className="mt-7 rounded-sm"><Link to="/about" hash="one-health">Our national contribution<ArrowRight /></Link></Button></div></section>
    <section className="section-wrap"><div className="grid gap-10 md:grid-cols-2"><div><div className="eyebrow mb-6 text-muted-foreground">National development</div><h2 className="section-heading">Stronger communities.<br />A more resilient future.</h2><p className="editorial-copy mt-6">Veterinary regulatory excellence supports the ambitions of Zimbabwe’s Agriculture and Food Systems Transformation Strategy (AFSTS II) and Vision 2030.</p></div><div className="grid grid-cols-2 gap-x-7">{['National biosecurity', 'Food safety', 'Animal health & welfare', 'Public health', 'Rural livelihoods', 'Environmental sustainability', 'Trade & export readiness', 'Agricultural competitiveness'].map(item => <div key={item} className="border-b border-border py-5 text-sm">{item}</div>)}</div></div></section>
    <section className="border-t border-border"><div className="section-wrap pt-16"><div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><div className="eyebrow mb-5 text-muted-foreground">Knowledge & perspectives</div><h2 className="section-heading">News & Updates</h2></div><Link to="/news" className="text-link">View all updates<ArrowRight className="size-4" /></Link></div><div className="grid gap-8 md:grid-cols-3">{articles.map(article => <article key={article.slug} className="group"><ArticleImage article={article} imageClassName="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="mt-5 text-[10px] uppercase tracking-wider text-muted-foreground">{article.category}</div><Link to="/news/$slug" params={{ slug: article.slug }} className="mt-3 block"><h3 className="text-xl font-medium leading-8">{article.title}</h3></Link><p className="mt-3 text-sm leading-6 text-muted-foreground">{article.description}</p><Link to="/news/$slug" params={{ slug: article.slug }} className="mt-5 inline-flex items-center gap-5 text-xs font-semibold">Read article<ArrowRight className="size-4" /></Link></article>)}</div></div></section>
  </main>;
}

const slides = [
  { image: fieldImage, alt: 'Southern African veterinary professionals examining cattle in a rural landscape', title: <>Advancing Veterinary<br />Excellence in<br /><span>Zimbabwe.</span></>, text: 'The Council of Veterinary Surgeons of Zimbabwe regulates the veterinary profession, promotes professional standards and safeguards animal health, public health and welfare.' },
  { image: clinicImage, alt: 'A veterinary surgeon examining a dog in a clinic', title: <>Care You Can<br />Trust, From a<br /><span>Registered Professional.</span></>, text: 'Every veterinary surgeon practising in Zimbabwe must be registered with the Council, so animal owners can rely on qualified, accountable care.' },
  { image: landImage, alt: 'Cattle grazing in a green Zimbabwean pasture', title: <>One Health.<br />One Welfare.<br /><span>One Zimbabwe.</span></>, text: 'Healthy animals, healthy people and a thriving environment. The veterinary profession connects them all for a more resilient nation.' },
];

function HeroSlider({ onVerify }: { onVerify: () => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const go = (n: number) => setIndex((n + slides.length) % slides.length);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((index + 1) % slides.length), 7000);
    return () => clearTimeout(t);
  }, [index, paused]);
  return <section className="hero" aria-roledescription="carousel" aria-label="Council highlights"
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onTouchStart={(e) => { touchX.current = e.touches[0]!.clientX; }}
    onTouchEnd={(e) => { if (touchX.current === null) return; const d = e.changedTouches[0]!.clientX - touchX.current; if (Math.abs(d) > 50) go(index + (d < 0 ? 1 : -1)); touchX.current = null; }}>
    {slides.map((s, i) => <img key={i} src={s.image} alt={i === index ? s.alt : ''} aria-hidden={i !== index} width={1920} height={1088} className={`hero-image hero-slide ${i === index ? 'is-active' : ''}`} fetchPriority={i === 0 ? 'high' : 'low'} />)}
    <div className="hero-content" aria-live="polite">
      <div className="hero-text-in" key={index}>
        <h1>{slides[index]!.title}</h1>
        <p className="hero-description">{slides[index]!.text}</p></div>
      <div className="mt-8 flex flex-wrap gap-3"><Button variant="gold" size="lg" asChild><Link to="/about">Discover Our Mandate<ArrowRight /></Link></Button><Button variant="hero" size="lg" onClick={onVerify}><img src={crest} alt="" aria-hidden="true" width="20" height="20" className="size-5 object-contain" />Verify a Surgeon</Button></div>
    </div>
    <div className="hero-bottom"><span className="hero-tagline">Safeguarding One Health. Inspiring a stronger nation.</span><a href="#council" className="flex items-center gap-3">Explore the Council<ArrowDown className="size-4" /></a>
      <span className="flex items-center gap-4">
        <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className="hero-arrow"><ChevronLeft className="size-4" /></button>
        <span className="flex items-center gap-2">{slides.map((_, i) => <button key={i} type="button" aria-label={`Go to slide ${i + 1}`} aria-current={i === index} onClick={() => go(i)} className={`hero-dot ${i === index ? 'is-active' : ''}`} />)}</span>
        <span className="tabular-nums">0{index + 1} / 0{slides.length}</span>
        <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className="hero-arrow"><ChevronRight className="size-4" /></button>
      </span></div>
  </section>;
}
