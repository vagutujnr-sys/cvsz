import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowRight, ChevronDown, Menu, LoaderCircle, Mail, Phone, Facebook, Linkedin, Twitter, MessageCircle, ShoppingCart, Trash2, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import crest from "@/assets/cvsz-logo.png";
import { articles, validateSurgeon, verificationUnavailable } from '@/lib/council';

type ModalKind = 'verify' | 'contact' | 'complaint' | null;
const ModalContext = createContext<(kind: ModalKind) => void>(() => {});
export function useCouncilModal() { return useContext(ModalContext); }
const navigation = [
  { name: 'Home', to: '/' }, { name: 'About Us', to: '/about' }, { name: 'Our Professions', to: '/professions' },
  { name: 'News & Updates', to: '/news' }, { name: 'FAQ', to: '/faq' }, { name: 'Complaints', to: '/complaints' }, { name: 'Contact Us', to: '/contact' },
] as const;
const mainNavigation = navigation.filter(item => item.to !== '/news' && item.to !== '/faq' && item.to !== '/complaints');
const secondaryNavigation = [
  { name: 'Complaints', to: '/complaints' },
  { name: 'News & Updates', to: '/news' },
  { name: 'FAQs', to: '/faq' },
  { name: 'Privacy Policy', to: '/privacy-policy' },
  { name: 'Terms of Use', to: '/terms-of-use' },
] as const;

const paymentServices = [
  { id: 'registration-fee', name: 'Registration fee', amount: 125 },
  { id: 'certificate-of-registration', name: 'Certificate of registration', amount: 25 },
  { id: 'annual-fee', name: 'Annual fee', amount: 150 },
  { id: 'surgery-licencing-fee', name: 'Surgery licencing fee', amount: 250 },
  { id: 'hospital-licensing-fees', name: 'Hospital Licensing fees', amount: 300 },
  { id: 'letter-of-good-standing', name: 'Letter of Good Standing', amount: 75 },
] as const;
type PaymentServiceId = typeof paymentServices[number]['id'];
type PaymentMethod = 'paynow' | 'bank-account';
type PaymentCartContextValue = {
  cart: PaymentServiceId[];
  itemCount: number;
  subtotal: number;
  addItem: (id: PaymentServiceId) => void;
  removeItem: (id: PaymentServiceId) => void;
  openCart: () => void;
};
const PaymentCartContext = createContext<PaymentCartContextValue>({
  cart: [],
  itemCount: 0,
  subtotal: 0,
  addItem: () => {},
  removeItem: () => {},
  openCart: () => {},
});

export function CouncilSite({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<ModalKind>(null);
  const [cart, setCart] = useState<PaymentServiceId[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const subtotal = cart.reduce((total, id) => total + paymentServices.find(service => service.id === id)!.amount, 0);
  const paymentCart: PaymentCartContextValue = {
    cart,
    itemCount: cart.length,
    subtotal,
    addItem: id => setCart(current => current.includes(id) ? current : [...current, id]),
    removeItem: id => setCart(current => current.filter(item => item !== id)),
    openCart: () => setCartOpen(true),
  };
  return <PaymentCartContext.Provider value={paymentCart}><ModalContext.Provider value={setKind}><Header />{children}<Footer /><CouncilModal kind={kind} onClose={() => setKind(null)} /><CartDrawer open={cartOpen} onOpenChange={setCartOpen} /><WhatsAppWidget /></ModalContext.Provider></PaymentCartContext.Provider>;
}

function WhatsAppWidget() {
  return <a className="whatsapp-float" href="https://wa.me/263772347291" target="_blank" rel="noreferrer" aria-label="Chat with the Council on WhatsApp" title="Chat on WhatsApp"><MessageCircle aria-hidden="true" /></a>;
}

function Header() {
  const { itemCount, openCart } = useContext(PaymentCartContext);
  const isHome = useRouterState({ select: state => state.location.pathname === '/' });
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [practices, setPractices] = useState(false);
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const paymentsDropdown = useRef<HTMLDivElement>(null);
  const mobilePaymentsDropdown = useRef<HTMLDivElement>(null);
  const accountDropdown = useRef<HTMLDivElement>(null);
  const mobileAccountDropdown = useRef<HTMLDivElement>(null);
  const accountTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 90);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const dismiss = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!dropdown.current?.contains(event.target)) setPractices(false);
      if (!paymentsDropdown.current?.contains(event.target) && !mobilePaymentsDropdown.current?.contains(event.target)) setPaymentsOpen(false);
      if (!accountDropdown.current?.contains(event.target) && !mobileAccountDropdown.current?.contains(event.target)) setAccountOpen(false);
    };
    document.addEventListener('click', dismiss); return () => document.removeEventListener('click', dismiss);
  }, []);
  return <>
    <div className="top-strip">
      <div className="top-strip-inner">
        <div className="top-contacts"><a href="mailto:registrar@cvsz.org"><Mail />registrar@cvsz.org</a><a href="tel:+2638644109886"><Phone />+263 8644 109 886</a></div>
        <nav className="secondary-nav" aria-label="Secondary navigation">
          {secondaryNavigation.map(item => <Link key={item.to} to={item.to}>{item.name}</Link>)}
        </nav>
        <div className="social-links" aria-label="Council contact and social channels">
          <span aria-label="Facebook profile link unavailable" title="Official Facebook link not published"><Facebook /></span>
          <span aria-label="LinkedIn profile link unavailable" title="Official LinkedIn link not published"><Linkedin /></span>
          <a href="https://wa.me/263772347291" target="_blank" rel="noreferrer" aria-label="WhatsApp the Council" title="WhatsApp"><MessageCircle /></a>
          <a href="mailto:registrar@cvsz.org" aria-label="Email the Council" title="Email"><Mail /></a>
          <span aria-label="Twitter profile link unavailable" title="Official Twitter link not published"><Twitter /></span>
        </div>
      </div>
    </div>
    <aside className="news-ticker" aria-label="Featured articles">
      <Link to="/news" className="news-ticker-label">Featured articles</Link>
      <div className="news-ticker-viewport">
        <div className="news-ticker-track">
          <div className="news-ticker-group">
            {articles.map(article => <Link key={article.slug} to="/news/$slug" params={{ slug: article.slug }} className="news-ticker-item"><span>{article.title}</span><span className="news-ticker-category">{article.category}</span></Link>)}
          </div>
          <div className="news-ticker-group" aria-hidden="true">
            {articles.map(article => <span key={article.slug} className="news-ticker-item"><span>{article.title}</span><span className="news-ticker-category">{article.category}</span></span>)}
          </div>
        </div>
      </div>
      <Link to="/news" className="news-ticker-all">All articles<ArrowRight /></Link>
    </aside>
    <header className={`site-header ${isHome ? 'home-header' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className={`brand header-crest ${isHome && !scrolled ? '' : 'header-crest-contained'}`} aria-label="CVSZ home"><img src={crest} alt="Official CVSZ crest" width="150" height="150" /></Link>
        <div className="desktop-menu-container">
          <nav className="desktop-nav" aria-label="Main navigation">
            {mainNavigation.slice(0, 3).map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} className="nav-link">{item.name}</Link>)}
            <div className="relative" ref={dropdown} onKeyDown={event => { if (event.key === 'Escape') setPractices(false); }}>
              <Button variant="ghost" className="nav-link h-auto" aria-expanded={practices} aria-controls="practice-menu" onClick={() => setPractices(!practices)}>Veterinary Practices <ChevronDown className="size-3" /></Button>
              {practices && <div id="practice-menu" className="absolute left-0 top-full w-64 border border-border bg-background p-2 text-foreground shadow-lg">
                <Link to="/practices" className="block p-3 text-sm hover:bg-surface" onClick={() => setPractices(false)}>Practice standards</Link>
                <Link to="/practices" hash="registration" className="block p-3 text-sm hover:bg-surface" onClick={() => setPractices(false)}>Practice registration</Link>
                <Link to="/practices" hash="guidance" className="block p-3 text-sm hover:bg-surface" onClick={() => setPractices(false)}>Guidance for animal owners</Link>
              </div>}
            </div>
            <div className="relative" ref={paymentsDropdown} onKeyDown={event => {
              if (event.key === 'Escape') setPaymentsOpen(false);
            }}>
              <Button variant="ghost" className="nav-link h-auto" aria-expanded={paymentsOpen} aria-controls="payment-menu" onClick={() => setPaymentsOpen(value => !value)}>Payments<ChevronDown className="size-3" /></Button>
              {paymentsOpen && <PaymentMenu id="payment-menu" onAdd={() => { setPaymentsOpen(false); openCart(); }} />}
            </div>
            {mainNavigation.slice(3).map(item => <Link key={item.to} to={item.to} className="nav-link">{item.name}</Link>)}
          </nav>
            <div className="account-menu" ref={accountDropdown} onKeyDown={event => {
              if (event.key === 'Escape') {
                setAccountOpen(false);
                accountTrigger.current?.focus();
              }
            }}>
              <Button ref={accountTrigger} variant="gold" className="hidden shrink-0 rounded-full text-xs min-[981px]:inline-flex" aria-expanded={accountOpen} aria-controls="desktop-account-menu" onClick={() => setAccountOpen(value => !value)}>Login / Register<ChevronDown className="size-3" /></Button>
              {accountOpen && <div id="desktop-account-menu" className="account-dropdown"><AccountMenuOptions onNavigate={() => setAccountOpen(false)} /></div>}
            </div>
          <CartButton itemCount={itemCount} onClick={openCart} />
        </div>
        <Button variant="hero" size="icon" className="mobile-toggle border-0" aria-label="Open navigation" onClick={() => setMobile(true)}><Menu /></Button>
      </div>
    </header>
    <Dialog open={mobile} onOpenChange={value => { setMobile(value); if (!value) setAccountOpen(false); }}><DialogContent className="inset-y-0 left-auto right-0 h-svh max-h-svh w-[min(90vw,380px)] translate-x-0 translate-y-0 overflow-y-auto rounded-none bg-institution p-7 text-hero-foreground sm:rounded-none">
      <DialogTitle className="mt-6 flex items-center gap-3"><img src={crest} alt="CVSZ crest" width="50" height="50" />CVSZ</DialogTitle><DialogDescription className="sr-only">Council website navigation</DialogDescription>
      <nav className="flex flex-col" aria-label="Mobile navigation">{mainNavigation.slice(0, 3).map(item => <Link key={item.to} to={item.to} className="border-b border-hero-foreground/15 py-4" onClick={() => setMobile(false)}>{item.name}</Link>)}<Link to="/practices" className="border-b border-hero-foreground/15 py-4" onClick={() => setMobile(false)}>Veterinary Practices</Link>{mainNavigation.slice(3).map(item => <Link key={item.to} to={item.to} className="border-b border-hero-foreground/15 py-4" onClick={() => setMobile(false)}>{item.name}</Link>)}</nav>
      <div className="mobile-payments-menu" ref={mobilePaymentsDropdown}>
        <Button variant="ghost" className="mobile-menu-toggle" aria-expanded={paymentsOpen} aria-controls="mobile-payment-menu" onClick={() => setPaymentsOpen(value => !value)}>Payments<ChevronDown className="size-4" /></Button>
        {paymentsOpen && <PaymentMenu id="mobile-payment-menu" mobile onAdd={() => { setPaymentsOpen(false); setMobile(false); openCart(); }} />}
      </div>
      <div className="mobile-account-menu" ref={mobileAccountDropdown} onKeyDown={event => {
        if (event.key === 'Escape') setAccountOpen(false);
      }}>
        <Button variant="gold" size="lg" className="mt-8 w-full" aria-expanded={accountOpen} aria-controls="mobile-account-menu" onClick={() => setAccountOpen(value => !value)}>Login / Register<ChevronDown className="size-4" /></Button>
        {accountOpen && <div id="mobile-account-menu" className="account-dropdown mobile-account-dropdown"><AccountMenuOptions onNavigate={() => { setAccountOpen(false); setMobile(false); }} /></div>}
      </div>
      <div className="mobile-cart-action"><CartButton itemCount={itemCount} onClick={() => { setMobile(false); openCart(); }} /></div>
    </DialogContent></Dialog>
    {itemCount > 0 && <div className="mobile-cart-float"><CartButton itemCount={itemCount} onClick={openCart} /></div>}
  </>;
}

function PaymentMenu({ id, mobile = false, onAdd }: { id: string; mobile?: boolean; onAdd: () => void }) {
  const { cart, addItem } = useContext(PaymentCartContext);
  return <div id={id} className={`payment-menu${mobile ? ' payment-menu-mobile' : ''}`}>
    {paymentServices.map(service => {
      const added = cart.includes(service.id);
      return <article className="payment-service" key={service.id}>
        <h3>{service.name}</h3>
        <p className="payment-service-price">${service.amount}</p>
        <Button size="sm" variant={added ? 'outline' : 'gold'} disabled={added} onClick={() => { addItem(service.id); onAdd(); }}>{added ? 'Added' : 'Pay this'}</Button>
      </article>;
    })}
  </div>;
}

function CartButton({ itemCount, onClick }: { itemCount: number; onClick: () => void }) {
  return <Button variant="ghost" size="icon" className="cart-trigger" aria-label={`Open cart${itemCount ? `, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}` : ', empty'}`} onClick={onClick}>
    <ShoppingCart aria-hidden="true" />
    {itemCount > 0 && <span className="cart-count" aria-hidden="true">{itemCount}</span>}
  </Button>;
}

function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { cart, removeItem, subtotal } = useContext(PaymentCartContext);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paynow');
  const items = cart.map(id => paymentServices.find(service => service.id === id)!);
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="cart-drawer">
      <div className="cart-drawer-heading">
        <div><DialogTitle className="text-xl text-primary">Your cart</DialogTitle><DialogDescription className="mt-2">Review Council services selected for payment.</DialogDescription></div>
      </div>
      {items.length === 0 ? <p className="cart-empty">Your cart is empty. Choose a service from Payments to get started.</p> : <>
        <ul className="cart-items">
          {items.map(item => <li className="cart-item" key={item.id}>
            <div><h3>{item.name}</h3><p>${item.amount}</p></div>
            <Button variant="ghost" size="icon" aria-label={`Remove ${item.name} from cart`} onClick={() => removeItem(item.id)}><Trash2 /></Button>
          </li>)}
        </ul>
        <div className="cart-summary"><span>Subtotal</span><strong>${subtotal}</strong></div>
        <fieldset className="cart-payment-methods">
          <legend>Payment methods</legend>
          <div className="cart-payment-method-list">
            <label className={`cart-payment-method paynow-method${paymentMethod === 'paynow' ? ' selected' : ''}`}>
              <input type="radio" name="cart-payment-method" value="paynow" aria-label="Paynow" checked={paymentMethod === 'paynow'} onChange={() => setPaymentMethod('paynow')} />
              <span className="paynow-mark" aria-hidden="true">P</span>
              <span className="paynow-wordmark" aria-hidden="true">Paynow</span>
            </label>
            <label className={`cart-payment-method bank-account-method${paymentMethod === 'bank-account' ? ' selected' : ''}`}>
              <input type="radio" name="cart-payment-method" value="bank-account" aria-label="Bank Account" checked={paymentMethod === 'bank-account'} onChange={() => setPaymentMethod('bank-account')} />
              <Landmark aria-hidden="true" />
              <span>Bank Account</span>
            </label>
          </div>
        </fieldset>
        <Button className="w-full" disabled>Checkout</Button>
      </>}
    </DialogContent>
  </Dialog>;
}

function AccountMenuOptions({ onNavigate }: { onNavigate: () => void }) {
  return <>
    <Link to="/vet-account" className="account-option" onClick={onNavigate}><span className="account-option-title">Access Vet Account</span></Link>
    <Link to="/vet-registration" className="account-option" onClick={onNavigate}><span className="account-option-title">Register As A Legal Vet</span><span className="account-option-note">A Registration Fee Will Be Required.</span></Link>
  </>;
}

export function PageBanner({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-banner"><div className="page-banner-inner"><div className="eyebrow text-accent">{eyebrow}</div><h1>{title}</h1><p className="max-w-2xl text-sm leading-7 text-hero-foreground/80">{description}</p></div></section>;
}

function CouncilModal({ kind, onClose }: { kind: ModalKind; onClose: () => void }) {
  const [state, setState] = useState<'form' | 'loading' | 'unavailable'>('form');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { setState('form'); setName(''); setError(null); }, [kind]);
  useEffect(() => {
    if (state !== 'loading' || !kind) return;
    const timeout = window.setTimeout(() => setState('unavailable'), 2400);
    return () => window.clearTimeout(timeout);
  }, [state, kind]);
  const verify = kind === 'verify';
  const complaint = kind === 'complaint';
  const title = verify ? 'Verify a Veterinary Surgeon' : complaint ? 'Submit a Complaint' : 'Contact the Council';
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = verify ? validateSurgeon(name) : name.trim() ? null : 'Please enter your full name.';
    if (validation) { setError(validation); return; }
    setError(null); setState('loading');
  }
  return <Dialog open={kind !== null} onOpenChange={value => { if (!value) onClose(); }}><DialogContent className="max-h-[90svh] w-[calc(100%-32px)] max-w-lg overflow-y-auto p-7 sm:p-9">
    <div className="mb-2 flex size-14 items-center justify-center bg-surface">{verify ? <img src={crest} alt="CVSZ crest" width="48" height="48" className="size-12 object-contain" /> : <Mail className="text-primary" />}</div>
    <DialogTitle className="pr-4 text-2xl leading-8">{title}</DialogTitle>
    <DialogDescription>{verify ? 'Enter the details of a veterinary surgeon to initiate a verification request.' : 'Share your details and the nature of your enquiry.'}</DialogDescription>
    {state === 'form' && <form onSubmit={submit}>
      <label className="form-label" htmlFor="council-name">{verify ? "Surgeon’s Full Name" : 'Your Full Name'} <span className="text-destructive">*</span></label>
      <input id="council-name" className="form-input" value={name} onChange={e => { setName(e.target.value); setError(null); }} aria-required="true" aria-invalid={!!error} aria-describedby={error ? 'name-error' : undefined} autoComplete={verify ? 'off' : 'name'} placeholder={verify ? 'Enter surgeon’s full name' : 'Enter your full name'} />
      {error && <p id="name-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
      {verify ? <><label className="form-label" htmlFor="registration-number">Registration Number <span className="font-normal text-muted-foreground">(optional)</span></label><input id="registration-number" className="form-input" placeholder="e.g. registration reference" /></> : <><label className="form-label" htmlFor="enquiry-email">Email Address *</label><input id="enquiry-email" className="form-input" type="email" required autoComplete="email" placeholder="you@example.com" /><label className="form-label" htmlFor="enquiry-message">{complaint ? 'Details of your concern' : 'Your message'} *</label><textarea id="enquiry-message" className="form-input min-h-28" required maxLength={5000} /><p className="mt-3 text-xs leading-5 text-muted-foreground">Online submission is not yet enabled. These details are not saved or sent.</p></>}
      <Button type="submit" size="lg" className="mt-7 w-full">{verify ? 'Verify Surgeon' : 'Continue'}<ArrowRight /></Button>
    </form>}
    {state === 'loading' && <div role="status" aria-live="polite" className="py-10 text-center"><LoaderCircle className="mx-auto mb-5 size-10 animate-spin text-primary" /><p className="font-medium">{verify ? 'Verifying Vet, Please wait...' : 'Please wait...'}</p></div>}
    {state === 'unavailable' && <div className="mt-3"><p role="status" className="border-l-2 border-accent bg-surface p-5 text-sm leading-7">{verify ? verificationUnavailable : 'Online submission is not yet enabled. Your information has not been sent or saved. Please contact the Council directly.'}</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild><Link to="/contact" onClick={onClose}>Contact Us<ArrowRight /></Link></Button><Button variant="outline" onClick={onClose}>Close</Button></div></div>}
  </DialogContent></Dialog>;
}

function Footer() {
  const open = useCouncilModal();
  return <footer className="site-footer"><div className="section-wrap pb-8 pt-16"><div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
    <div><Link to="/" className="brand"><img src={crest} alt="Official CVSZ crest" width="150" height="150" /><span className="text-lg font-medium leading-7">Council of Veterinary<br />Surgeons of Zimbabwe</span></Link><p className="mt-6 max-w-sm text-sm leading-7 text-hero-foreground/65">Safeguarding One Health and One Welfare through veterinary regulatory excellence.</p></div>
    <div><h3 className="mb-5 text-sm font-semibold">The Council</h3><div className="grid gap-3">{navigation.filter(n => n.to !== '/').slice(0, 4).map(n => <Link key={n.to} to={n.to} className="footer-link">{n.name}</Link>)}<Link to="/practices" className="footer-link">Veterinary Practices</Link></div></div>
    <div><h3 className="mb-5 text-sm font-semibold">How can we help?</h3><div className="grid justify-items-start gap-3"><a href="mailto:registrar@cvsz.org" className="footer-link">registrar@cvsz.org</a><a href="tel:+2638644109886" className="footer-link">+263 8644 109 886</a><p className="footer-link leading-6">630 Churchill Avenue, Mt Pleasant<br />Harare, Zimbabwe</p><Link to="/contact" className="footer-link">Contact the Council →</Link><Button variant="link" className="footer-link h-auto p-0" onClick={() => open('verify')}>Verify a Surgeon<ArrowRight /></Button></div></div>
    </div><div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hero-foreground/15 pt-6 text-[11px] text-hero-foreground/60"><p>© 2026 Council of Veterinary Surgeons of Zimbabwe. All rights reserved.</p><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-accent" />Ethics. Trust. Excellence.</span></div></div></footer>;
}