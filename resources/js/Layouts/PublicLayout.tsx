import { useState, useEffect, useRef, ReactNode, FormEvent } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import BrandLogo from '@/Components/BrandLogo';

const ChevronDown = () => (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 transition-transform duration-200">
        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd"/>
    </svg>
);

const navItems = [
    { label: 'Home', href: '/' },
    {
        label: 'Discover',
        children: [
            { label: 'About Jipe Farm', href: '/about', desc: 'Our story and the wilderness' },
            { label: 'Gallery', href: '/gallery', desc: 'Photos from the wild' },
        ],
    },
    {
        label: 'Experiences',
        children: [
            { label: 'Activities', href: '/activities', desc: 'Canoeing, hiking, birdwatching & more' },
            { label: 'Tour Packages', href: '/packages', desc: 'Curated multi-day itineraries' },
        ],
    },
    { label: 'Contact', href: '/contact' },
];

const campContacts = [
    { name: 'Edgar Edgar', phone: '0743154530' },
    { name: 'Cuthbert Emanuel', phone: '0753513146' },
    { name: 'Samuel', phone: '0779251541' },
];

function DropdownMenu({ items, visible }: { items: { label: string; href: string; desc: string }[]; visible: boolean }) {
    return (
        <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 bg-[#0d1f13] border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50 transition-all duration-200"
            style={{
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
                transform: `translateX(-50%) translateY(${visible ? '0' : '-6px'})`,
            }}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col px-5 py-4 hover:bg-[#d4a853]/10 transition-colors border-b border-white/5 last:border-0 group"
                >
                    <span className="text-white font-semibold text-sm group-hover:text-[#d4a853] transition-colors">{item.label}</span>
                    <span className="text-white/40 text-xs mt-0.5">{item.desc}</span>
                </Link>
            ))}
        </div>
    );
}

// ── Subscribe Modal ────────────────────────────────────────────────────────────
function SubscribeModal({ onClose }: { onClose: () => void }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        type: '' as 'sms' | 'email' | '',
        email: '',
        phone: '',
        subscriber_type: '' as 'resident' | 'foreigner_in_tz' | 'foreigner_abroad' | '',
    });

    // Close on outside click
    const backdropRef = useRef<HTMLDivElement>(null);
    const handleBackdrop = (e: React.MouseEvent) => {
        if (e.target === backdropRef.current) onClose();
    };

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/subscribe', { onSuccess: () => { reset(); } });
    };

    const inputClass = "w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#d4a853]/60 focus:ring-1 focus:ring-[#d4a853]/30 transition";

    return (
        <div
            ref={backdropRef}
            onClick={handleBackdrop}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-md bg-[#0d1f13] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                {/* Decorative top strip */}
                <div className="h-1 w-full bg-gradient-to-r from-[#d4a853] via-[#e8c170] to-[#d4a853]" />

                <div className="px-7 py-7">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>

                    {wasSuccessful ? (
                        /* Success state */
                        <div className="text-center py-6">
                            <div className="w-14 h-14 rounded-full bg-[#d4a853]/15 flex items-center justify-center mx-auto mb-4">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth={2} className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2">You're in!</h3>
                            <p className="text-white/55 text-sm leading-relaxed">
                                Welcome to the Jipe Farm Campsite inner circle. Expect the good stuff — deals, new experiences, and a little wilderness magic in your inbox (or messages).
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-6 bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-6 py-2.5 rounded-full transition-all"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Header copy */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <BrandLogo className="w-9 h-9 shrink-0" />
                                    <span className="text-[#d4a853] text-xs font-semibold tracking-[0.2em] uppercase">Jipe Farm Updates</span>
                                </div>
                                <h2 className="text-white font-bold text-2xl leading-snug mb-2">
                                    Stay in the loop
                                </h2>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    We want to send you interesting deals when they come up — not bad to subscribe.
                                    You are the final say to buy into the idea or not.{' '}
                                    <span className="text-white/70">Subscribe for updates of best experience.</span>
                                </p>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-white/60 text-xs font-medium mb-1.5">Your name</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="e.g. Amina Hassan"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Type selection */}
                            <div>
                                <label className="block text-white/60 text-xs font-medium mb-2">How would you like to hear from us?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setData('type', 'sms')}
                                        className={`flex flex-col items-start p-4 rounded-xl border transition-all ${
                                            data.type === 'sms'
                                                ? 'border-[#d4a853] bg-[#d4a853]/10'
                                                : 'border-white/10 bg-white/3 hover:border-white/25'
                                        }`}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={`w-5 h-5 mb-2 ${data.type === 'sms' ? 'text-[#d4a853]' : 'text-white/40'}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3"/>
                                        </svg>
                                        <span className={`font-bold text-sm ${data.type === 'sms' ? 'text-[#d4a853]' : 'text-white/70'}`}>SMS</span>
                                        <span className="text-white/35 text-[11px] mt-0.5 leading-tight">Residents &amp; visitors in Tanzania</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('type', 'email')}
                                        className={`flex flex-col items-start p-4 rounded-xl border transition-all ${
                                            data.type === 'email'
                                                ? 'border-[#d4a853] bg-[#d4a853]/10'
                                                : 'border-white/10 bg-white/3 hover:border-white/25'
                                        }`}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={`w-5 h-5 mb-2 ${data.type === 'email' ? 'text-[#d4a853]' : 'text-white/40'}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                        </svg>
                                        <span className={`font-bold text-sm ${data.type === 'email' ? 'text-[#d4a853]' : 'text-white/70'}`}>Email</span>
                                        <span className="text-white/35 text-[11px] mt-0.5 leading-tight">International visitors worldwide</span>
                                    </button>
                                </div>
                                {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type}</p>}
                            </div>

                            {/* SMS: subscriber type + phone */}
                            {data.type === 'sms' && (
                                <>
                                    <div>
                                        <label className="block text-white/60 text-xs font-medium mb-1.5">Who are you?</label>
                                        <select
                                            className={inputClass + ' appearance-none'}
                                            value={data.subscriber_type}
                                            onChange={e => setData('subscriber_type', e.target.value as any)}
                                        >
                                            <option value="" disabled>Select one…</option>
                                            <option value="resident">Tanzanian resident</option>
                                            <option value="foreigner_in_tz">Foreigner currently in Tanzania</option>
                                        </select>
                                        {errors.subscriber_type && <p className="text-red-400 text-xs mt-1">{errors.subscriber_type}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-white/60 text-xs font-medium mb-1.5">Phone number</label>
                                        <input
                                            type="tel"
                                            className={inputClass}
                                            placeholder="+255 7XX XXX XXX"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                        />
                                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </>
                            )}

                            {/* Email: subscriber type + email */}
                            {data.type === 'email' && (
                                <>
                                    <div>
                                        <label className="block text-white/60 text-xs font-medium mb-1.5">Where are you from?</label>
                                        <select
                                            className={inputClass + ' appearance-none'}
                                            value={data.subscriber_type}
                                            onChange={e => setData('subscriber_type', e.target.value as any)}
                                        >
                                            <option value="" disabled>Select one…</option>
                                            <option value="foreigner_abroad">Outside Tanzania</option>
                                            <option value="foreigner_in_tz">Currently visiting Tanzania</option>
                                            <option value="resident">Tanzanian resident</option>
                                        </select>
                                        {errors.subscriber_type && <p className="text-red-400 text-xs mt-1">{errors.subscriber_type}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-white/60 text-xs font-medium mb-1.5">Email address</label>
                                        <input
                                            type="email"
                                            className={inputClass}
                                            placeholder="you@example.com"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing || !data.type || !data.name}
                                className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-40 disabled:cursor-not-allowed text-[#071510] font-bold text-sm py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#d4a853]/25"
                            >
                                {processing ? 'Subscribing…' : "Subscribe — I'm in!"}
                            </button>

                            <p className="text-white/25 text-[11px] text-center leading-relaxed">
                                No spam, ever. Unsubscribe anytime. You stay in control.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Layout ─────────────────────────────────────────────────────────────────────
export default function PublicLayout({ children, transparent = false }: { children: ReactNode; transparent?: boolean }) {
    const { auth } = usePage<PageProps>().props;
    const [scrolled, setScrolled] = useState(!transparent);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [subscribeOpen, setSubscribeOpen] = useState(false);
    const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (!transparent) return;
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [transparent]);

    // Prevent body scroll when modal open
    useEffect(() => {
        document.body.style.overflow = subscribeOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [subscribeOpen]);

    const handleMouseEnter = (label: string) => {
        clearTimeout(hoverTimeout.current);
        setHoveredDropdown(label);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => setHoveredDropdown(null), 120);
    };

    return (
        <div className="min-h-screen bg-[#071510] text-white">
            {/* Navbar */}
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-[#071510]/97 backdrop-blur-xl shadow-xl shadow-black/30'
                        : 'bg-gradient-to-b from-black/60 to-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-5 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 shrink-0 min-w-0">
                            <BrandLogo className="h-14 w-14 sm:h-16 sm:w-16 shrink-0" />
                            <div>
                                <p className="text-white font-bold text-base sm:text-lg leading-none tracking-wide">Jipe Farm</p>
                                <p className="text-[#f1ce47] text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mt-1">Farm &amp; Campsite</p>
                            </div>
                        </Link>

                        {/* Desktop nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                                    onMouseLeave={() => item.children && handleMouseLeave()}
                                >
                                    {item.children ? (
                                        <button
                                            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                                                hoveredDropdown === item.label
                                                    ? 'text-[#d4a853] bg-white/5'
                                                    : 'text-white/75 hover:text-[#d4a853] hover:bg-white/5'
                                            }`}
                                        >
                                            {item.label}
                                            <span className={`transition-transform duration-200 ${hoveredDropdown === item.label ? 'rotate-180' : ''}`}>
                                                <ChevronDown />
                                            </span>
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            className="flex items-center px-4 py-2 text-sm font-medium text-white/75 hover:text-[#d4a853] hover:bg-white/5 rounded-lg transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                    {item.children && (
                                        <DropdownMenu items={item.children} visible={hoveredDropdown === item.label} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            {/* Subscribe — visible on all screen sizes */}
                            <button
                                onClick={() => setSubscribeOpen(true)}
                                className="border border-[#d4a853]/60 text-[#d4a853] hover:bg-[#d4a853]/10 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-200 whitespace-nowrap"
                            >
                                Subscribe
                            </button>

                            {/* Only show admin link when already logged in — desktop only */}
                            {auth.user && (
                                <Link href="/admin" className="hidden lg:block text-white/50 hover:text-white text-xs font-medium px-3 py-2 transition-colors tracking-wide">
                                    Dashboard
                                </Link>
                            )}

                            <Link
                                href="/contact"
                                className="hidden sm:block bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#d4a853]/30 hover:-translate-y-px"
                            >
                                Book Now
                            </Link>

                            {/* Mobile toggle */}
                            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle menu">
                                {mobileOpen
                                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
                                }
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileOpen && (
                        <div className="lg:hidden bg-[#071510]/98 backdrop-blur-xl border-t border-white/10 pb-5">
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    {item.children ? (
                                        <>
                                            <button
                                                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                                                className="w-full flex items-center justify-between px-5 py-3.5 text-white/80 font-medium text-base"
                                            >
                                                {item.label}
                                                <span className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}><ChevronDown /></span>
                                            </button>
                                            {mobileExpanded === item.label && (
                                                <div className="bg-white/5 border-y border-white/5">
                                                    {item.children.map(child => (
                                                        <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className="block px-8 py-3 text-white/70 hover:text-[#d4a853] text-sm transition-colors">
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link href={item.href!} onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 text-white/80 font-medium text-base hover:text-[#d4a853] transition-colors">
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="border-t border-white/10 mt-3 pt-4 px-5 flex flex-col gap-3">
                                {auth.user && (
                                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="text-center text-white/50 text-sm py-2">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <Link href="/contact" onClick={() => setMobileOpen(false)} className="bg-[#d4a853] text-[#071510] font-bold py-3 rounded-full text-center">
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Subscribe modal */}
            {subscribeOpen && <SubscribeModal onClose={() => setSubscribeOpen(false)} />}

            {/* Page content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-[#040e08] border-t border-white/8 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-5 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-5">
                                <BrandLogo className="h-16 w-16 shrink-0" />
                                <div>
                                    <p className="text-white font-bold text-lg leading-none">Jipe Farm Campsite</p>
                                    <p className="text-[#f1ce47] text-[10px] tracking-[0.2em] uppercase mt-1">Lake Jipe · Tanzania</p>
                                </div>
                            </div>
                            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                                An eco-friendly farm campsite on the shores of Lake Jipe in northern Tanzania.
                                Unforgettable experiences. Untouched nature. International standard.
                            </p>
                            <p className="flex items-center gap-2 mt-5 text-white/45 text-sm">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                                Kilimanjaro Region, Tanzania
                            </p>
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm mb-5 tracking-wide">Explore</p>
                            <ul className="space-y-3">
                                {[['About', '/about'], ['Activities', '/activities'], ['Tour Packages', '/packages'], ['Gallery', '/gallery'], ['Contact', '/contact']].map(([l, h]) => (
                                    <li key={h}><Link href={h} className="text-white/45 hover:text-[#d4a853] text-sm transition-colors">{l}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm mb-5 tracking-wide">Contact Us</p>
                            <ul className="space-y-3 text-white/45 text-sm">
                                <li>info@jipefarmcampsite.com</li>
                                {campContacts.map(contact => (
                                    <li key={contact.phone}>
                                        <a href={`tel:${contact.phone}`} className="group flex flex-col gap-0.5 hover:text-[#d4a853] transition-colors">
                                            <span className="text-white/55 group-hover:text-[#d4a853]">{contact.name}</span>
                                            <span>{contact.phone}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="sm:col-span-2 lg:col-span-1">
                            <p className="text-white font-semibold text-sm mb-5 tracking-wide">Find Us</p>
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1f13] h-44">
                                <iframe
                                    title="Jipe Farm Campsite footer location"
                                    src="https://maps.google.com/maps?q=-3.598951,37.699760&z=15&output=embed"
                                    className="w-full h-full"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <a href="https://maps.app.goo.gl/LNkSLU85HYBx9KRg9" target="_blank" rel="noreferrer" className="inline-flex mt-3 text-[#d4a853] hover:text-[#c49640] text-xs font-semibold">
                                Open Google Maps
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
                        <p>© {new Date().getFullYear()} Jipe Farm Campsite, Tanzania. All rights reserved.</p>
                        <div className="flex gap-5">
                            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
