import { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps, HeroSlide, AboutSection, Activity, Package, GalleryImage, Testimonial } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

type Props = PageProps<{
    heroSlides: HeroSlide[];
    about: AboutSection | null;
    activities: Activity[];
    packages: Package[];
    gallery: GalleryImage[];
    testimonials: Testimonial[];
}>;

function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [transitioning, setTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval>>();
    const progressRef = useRef<ReturnType<typeof setInterval>>();
    const DURATION = 10000;

    const startProgress = () => {
        setProgress(0);
        clearInterval(progressRef.current);
        const step = 100 / (DURATION / 50);
        progressRef.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(progressRef.current); return 100; }
                return p + step;
            });
        }, 50);
    };

    const goTo = (idx: number) => {
        if (transitioning || idx === current || slides.length <= 1) return;
        setTransitioning(true);
        setPrev(current);
        startProgress();
        setTimeout(() => {
            setCurrent(idx);
            setTransitioning(false);
            setPrev(null);
        }, 1000);
    };

    useEffect(() => {
        if (slides.length <= 1) return;
        startProgress();
        timerRef.current = setInterval(() => {
            setCurrent(c => {
                const next = (c + 1) % slides.length;
                setPrev(c);
                setTransitioning(true);
                setTimeout(() => { setTransitioning(false); setPrev(null); }, 1000);
                return next;
            });
            startProgress();
        }, DURATION);
        return () => { clearInterval(timerRef.current); clearInterval(progressRef.current); };
    }, [slides.length]);

    const slide = slides[current] ?? null;
    if (!slide) return null;

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background images */}
            {slides.map((s, i) => (
                <div
                    key={s.id}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
                >
                    {s.image_url && (
                        <img src={s.image_url} alt={s.title} className="w-full h-full object-cover object-center" />
                    )}
                </div>
            ))}

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#071510]/90 via-[#071510]/40 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#071510] via-transparent to-black/30" />

            {/* Content panel — left aligned */}
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-32">
                    <div className="max-w-xl">
                        {/* Location tag */}
                        <div
                            className="flex items-center gap-2.5 mb-6 transition-all duration-500"
                            style={{
                                opacity: transitioning ? 0 : 1,
                                transform: transitioning ? 'translateY(12px)' : 'translateY(0)',
                                transitionDelay: transitioning ? '0ms' : '100ms',
                            }}
                        >
                            <div className="w-6 h-px bg-[#d4a853]" />
                            <span className="text-[#d4a853] text-xs font-bold tracking-[0.25em] uppercase">
                                {slide.subtitle ?? 'Lake Jipe, Tanzania'}
                            </span>
                        </div>

                        {/* Title */}
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.05] mb-5 tracking-tight"
                            style={{
                                opacity: transitioning ? 0 : 1,
                                transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
                                transition: 'opacity 0.55s ease, transform 0.55s ease',
                                transitionDelay: transitioning ? '0ms' : '180ms',
                            }}
                        >
                            {slide.title.split(' ').map((word, i, arr) =>
                                i >= arr.length - 2
                                    ? <span key={i} className="text-[#d4a853]">{word}{i < arr.length - 1 ? ' ' : ''}</span>
                                    : <span key={i}>{word} </span>
                            )}
                        </h1>

                        {/* Description */}
                        {slide.description && (
                            <div
                                style={{
                                    opacity: transitioning ? 0 : 1,
                                    transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
                                    transition: 'opacity 0.55s ease, transform 0.55s ease',
                                    transitionDelay: transitioning ? '0ms' : '260ms',
                                }}
                            >
                                <div className="w-12 h-0.5 bg-[#d4a853]/50 mb-4" />
                                <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light mb-8">
                                    {slide.description}
                                </p>
                            </div>
                        )}

                        {/* CTAs */}
                        <div
                            className="flex flex-wrap gap-3"
                            style={{
                                opacity: transitioning ? 0 : 1,
                                transform: transitioning ? 'translateY(20px)' : 'translateY(0)',
                                transition: 'opacity 0.55s ease, transform 0.55s ease',
                                transitionDelay: transitioning ? '0ms' : '340ms',
                            }}
                        >
                            <Link
                                href={slide.cta_url || '/'}
                                className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-xl hover:shadow-[#d4a853]/30 hover:-translate-y-0.5 text-sm"
                            >
                                {slide.cta_text || 'Explore More'}
                            </Link>
                            <Link
                                href="/packages"
                                className="border border-white/30 hover:border-[#d4a853] text-white hover:text-[#d4a853] font-semibold px-7 py-3.5 rounded-full backdrop-blur-sm transition-all text-sm"
                            >
                                View Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-16 pb-8">
                <div className="max-w-7xl mx-auto flex items-end justify-between">
                    {/* Slide counter + dots */}
                    <div className="flex items-center gap-4">
                        <span className="text-white/30 text-xs tabular-nums font-mono">
                            {String(current + 1).padStart(2, '0')}
                            <span className="text-white/15 mx-1">/</span>
                            {String(slides.length).padStart(2, '0')}
                        </span>
                        {slides.length > 1 && (
                            <div className="flex gap-1.5">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i)}
                                        className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-[#d4a853]' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'}`}
                                        aria-label={`Slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Prev / Next */}
                    {slides.length > 1 && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => goTo((current - 1 + slides.length) % slides.length)}
                                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#d4a853]/60 flex items-center justify-center text-white/50 hover:text-[#d4a853] transition-all"
                                aria-label="Previous slide"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => goTo((current + 1) % slides.length)}
                                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#d4a853]/60 flex items-center justify-center text-white/50 hover:text-[#d4a853] transition-all"
                                aria-label="Next slide"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                {slides.length > 1 && (
                    <div className="max-w-7xl mx-auto mt-4">
                        <div className="h-px bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#d4a853] rounded-full transition-none"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Scroll hint */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-white/20" />
                <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase rotate-90 whitespace-nowrap">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
        </section>
    );
}

// Parses a value string like "500+", "4.8★", "100%" → { num: 500, suffix: "+" }
function parseStatValue(raw: string): { num: number; suffix: string; prefix: string } {
    const prefix = raw.match(/^[^\d]*/)?.[0] ?? '';
    const num = parseFloat(raw.replace(/[^\d.]/g, '')) || 0;
    const suffix = raw.replace(/^[^\d]*[\d.]+/, '');
    return { num, suffix, prefix };
}

function CountUpStat({ value, label }: { value: string; label: string }) {
    const [displayed, setDisplayed] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { num, suffix, prefix } = parseStatValue(value);

    const animate = useCallback(() => {
        if (started) return;
        setStarted(true);
        const duration = 1600;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const isFloat = num % 1 !== 0;
        const interval = setInterval(() => {
            current += increment;
            if (current >= num) {
                setDisplayed(num);
                clearInterval(interval);
            } else {
                setDisplayed(isFloat ? Math.round(current * 10) / 10 : Math.floor(current));
            }
        }, duration / steps);
    }, [num, started]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) animate(); },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [animate]);

    const isFloat = num % 1 !== 0;
    const displayStr = isFloat ? displayed.toFixed(1) : String(Math.floor(displayed));

    return (
        <div ref={ref} className="text-center px-4">
            <p className="text-3xl sm:text-4xl font-bold text-[#d4a853] mb-1 tabular-nums">
                {prefix}{displayStr}{suffix}
            </p>
            <p className="text-white/50 text-sm">{label}</p>
        </div>
    );
}

export default function Welcome({ heroSlides, about, activities, packages, gallery, testimonials }: Props) {
    const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

    return (
        <PublicLayout transparent>
            <Head title="Jipe Farm Campsite | Bush Camping, Canoeing &amp; Adventures near Kilimanjaro, Tanzania">
                <meta name="description" content="Jipe Farm Campsite on Lake Jipe, Tanzania — the ultimate bush camping experience near Kilimanjaro and Moshi. Canoeing, hiking, milking, bonfire nights, camel riding and wildlife adventures. Book your escape today." />
                <meta name="keywords" content="Jipe Farm, Jipe Farm Campsite, camping Kilimanjaro, Lake Jipe camping, bush camping Kilimanjaro, canoeing Kilimanjaro, canoeing Moshi, hiking Kilimanjaro, hiking Moshi, milking Kilimanjaro, bonfire Kilimanjaro, born fire Moshi, Tanzania camping, eco camp Tanzania, Kilimanjaro adventure, camel riding Tanzania, canoe safari Tanzania, birdwatching Kilimanjaro" />
                <meta property="og:title" content="Jipe Farm Campsite | Bush Camping &amp; Adventures near Kilimanjaro" />
                <meta property="og:description" content="Experience bush camping on the shores of Lake Jipe, Tanzania. Canoeing, hiking, milking, bonfire nights and wildlife adventures near Moshi and Kilimanjaro." />
                <meta property="og:url" content="https://www.lakejipecamp.co.tz/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Jipe Farm Campsite | Bush Camping near Kilimanjaro, Tanzania" />
                <meta name="twitter:description" content="Bush camping on Lake Jipe — canoeing, hiking, milking, bonfire nights &amp; wildlife adventures near Moshi, Tanzania." />
                <link rel="canonical" href="https://www.lakejipecamp.co.tz/" />
                <script type="application/ld+json">{`{
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "Activities at Jipe Farm Campsite",
                    "description": "Adventure activities available at Jipe Farm Campsite near Kilimanjaro, Tanzania",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Canoeing on Lake Jipe", "description": "Canoe safari on Lake Jipe near Kilimanjaro, Tanzania" },
                        { "@type": "ListItem", "position": 2, "name": "Hiking in Kilimanjaro Region", "description": "Guided hiking trails in Kilimanjaro and Moshi area" },
                        { "@type": "ListItem", "position": 3, "name": "Bush Camping", "description": "Authentic bush camping under the stars at Lake Jipe" },
                        { "@type": "ListItem", "position": 4, "name": "Farm Milking Experience", "description": "Traditional farm milking experience in Kilimanjaro" },
                        { "@type": "ListItem", "position": 5, "name": "Bonfire Nights", "description": "Traditional bonfire nights at Jipe Farm Campsite, Moshi" },
                        { "@type": "ListItem", "position": 6, "name": "Camel Riding", "description": "Camel riding experience near Lake Jipe, Tanzania" }
                    ]
                }`}</script>
            </Head>
            <style>{`html{scroll-behavior:smooth}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#040e08}::-webkit-scrollbar-thumb{background:#2d6a4f;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#d4a853}`}</style>

            <HeroCarousel slides={heroSlides}/>

            {/* Stats */}
            <div className="bg-[#0d1f13] border-y border-[#d4a853]/20">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-white/10">
                    {(about?.stats ?? []).map((s) => (
                        <CountUpStat key={s.label} value={s.value} label={s.label} />
                    ))}
                </div>
            </div>

            {/* About preview */}
            {about && (
                <section className="bg-[#071510] py-24 lg:py-32">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative">
                            <div className="overflow-hidden rounded-2xl aspect-[4/5]">
                                <img src={about.image_url ?? ''} alt="Jipe Farm" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/50 to-transparent"/>
                            </div>
                            <div className="absolute bottom-6 left-6 bg-[#0d1f13]/90 backdrop-blur-sm border border-[#d4a853]/30 rounded-xl p-4">
                                <p className="text-[#d4a853] font-bold text-xl">3°S, 37°E</p>
                                <p className="text-white/60 text-xs mt-0.5">Northern Tanzania</p>
                            </div>
                            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#d4a853]/40 rounded-tr-2xl"/>
                        </div>
                        <div>
                            <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-4">{about.subheading}</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">{about.heading}</h2>
                            <p className="text-white/60 leading-relaxed mb-5">{about.body}</p>
                            {about.body_secondary && <p className="text-white/60 leading-relaxed mb-8">{about.body_secondary}</p>}
                            {about.features && (
                                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                                    {about.features.slice(0, 6).map((f) => (
                                        <li key={f} className="flex items-start gap-3 text-white/75 text-sm">
                                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5 text-[#d4a853] shrink-0"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/></svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Link href="/about" className="inline-flex items-center gap-2 text-[#d4a853] font-semibold text-sm hover:gap-4 transition-all">
                                Read Our Full Story
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"/></svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Activities preview */}
            {activities.length > 0 && (
                <section className="bg-[#040e08] py-24 lg:py-32">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-4">What Awaits You</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Adventures at Jipe Farm</h2>
                            <p className="text-white/55">From silent canoe safaris to star-lit campfires — every day at Jipe Farm Campsite is unlike any other.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {activities.map((act) => (
                                <Link key={act.id} href={`/activities/${act.id}`} className="group relative overflow-hidden rounded-2xl cursor-pointer block" style={{minHeight:'420px'}}>
                                    {act.image_url && <img src={act.image_url} alt={act.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 group-hover:via-black/50 transition-all duration-500"/>
                                    {act.highlight_badge && (
                                        <span className="absolute top-4 right-4 bg-[#d4a853]/90 text-[#071510] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">{act.highlight_badge}</span>
                                    )}
                                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                        {act.tagline && <p className="text-[#d4a853] text-xs font-semibold tracking-widest uppercase mb-1 opacity-75 group-hover:opacity-100">{act.tagline}</p>}
                                        <h3 className="text-white font-bold text-lg mb-2">{act.title}</h3>
                                        <p className="text-white/70 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500">{act.description}</p>
                                        <div className="mt-3 flex items-center gap-1.5 text-[#d4a853] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                            {act.duration && <span className="bg-white/10 px-2 py-1 rounded-full">{act.duration}</span>}
                                            {act.difficulty && <span className="bg-white/10 px-2 py-1 rounded-full">{act.difficulty}</span>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/activities" className="inline-block border border-[#d4a853]/50 hover:border-[#d4a853] hover:text-[#d4a853] text-white/70 font-semibold px-8 py-3 rounded-full transition-all duration-200 text-sm">
                                See All Activities
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Packages preview */}
            {packages.length > 0 && (
                <section className="bg-[#071510] py-24 lg:py-32">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <div className="text-center max-w-xl mx-auto mb-14">
                            <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-4">Tour Packages</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Curated Experiences</h2>
                            <p className="text-white/55">From weekend escapes to week-long immersions — choose your adventure.</p>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-7">
                            {packages.map((pkg) => (
                                <div key={pkg.id} className={`flex flex-col rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 ${pkg.is_featured ? 'ring-2 ring-[#d4a853] shadow-2xl shadow-[#d4a853]/10' : 'ring-1 ring-white/10'}`}>
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f13]"/>
                                        {pkg.badge && (
                                            <span className={`absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ${pkg.is_featured ? 'bg-[#d4a853] text-[#071510]' : 'bg-white/15 backdrop-blur-sm text-white'}`}>{pkg.badge}</span>
                                        )}
                                    </div>
                                    <div className="bg-[#0d1f13] flex flex-col flex-1 p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-white font-bold text-xl">{pkg.name}</h3>
                                            <div className="text-right shrink-0 ml-3">
                                                <span className="text-[#d4a853] font-bold text-2xl">{pkg.price}</span>
                                                <span className="text-white/40 text-xs block">{pkg.price_note ?? 'per person'}</span>
                                            </div>
                                        </div>
                                        <p className="text-[#d4a853]/70 text-xs font-semibold tracking-wide uppercase mb-3">{pkg.duration}</p>
                                        <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1">{pkg.description}</p>
                                        <div className="flex gap-2">
                                            <Link href={`/packages/${pkg.id}`} className={`flex-1 block text-center font-semibold text-sm py-3 rounded-xl transition-all ${pkg.is_featured ? 'bg-[#d4a853] hover:bg-[#c49640] text-[#071510]' : 'border border-white/20 hover:border-[#d4a853] text-white hover:text-[#d4a853]'}`}>
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/packages" className="inline-block border border-[#d4a853]/50 hover:border-[#d4a853] hover:text-[#d4a853] text-white/70 font-semibold px-8 py-3 rounded-full transition-all text-sm">
                                View All Packages
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Gallery preview */}
            {gallery.length > 0 && (
                <section className="bg-[#040e08] py-24 lg:py-32">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <div className="text-center max-w-xl mx-auto mb-12">
                            <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-4">Gallery</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Through Our Lens</h2>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {gallery.slice(0, 8).map((img, i) => (
                                <div key={img.id} className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 || i === 5 ? 'row-span-2' : ''}`} style={{minHeight: i === 0 || i === 5 ? '350px' : '165px'}} onClick={() => setLightbox(img)}>
                                    <img src={img.image_url} alt={img.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white text-xs font-semibold">{img.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/gallery" className="inline-block border border-[#d4a853]/50 hover:border-[#d4a853] hover:text-[#d4a853] text-white/70 font-semibold px-8 py-3 rounded-full transition-all text-sm">
                                View Full Gallery
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="bg-[#071510] py-24 lg:py-32">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <div className="text-center max-w-xl mx-auto mb-12">
                            <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-4">Guest Reviews</p>
                            <h2 className="text-4xl sm:text-5xl font-bold text-white">Words from the Wild</h2>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-6">
                            {testimonials.slice(0, 3).map((t) => (
                                <div key={t.id} className="bg-[#0d1f13] border border-white/8 rounded-2xl p-6 flex flex-col hover:border-[#d4a853]/30 transition-colors">
                                    <div className="flex gap-1 text-[#d4a853] mb-4">
                                        {Array.from({length: t.rating}).map((_, i) => (
                                            <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        ))}
                                    </div>
                                    <p className="text-white/70 text-sm leading-relaxed flex-1 italic mb-5">"{t.content}"</p>
                                    <div className="border-t border-white/8 pt-4">
                                        <p className="text-white font-semibold text-sm">{t.name}</p>
                                        <p className="text-white/40 text-xs mt-0.5">{t.country}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/Images/Bush Fire.jpg" alt="Stars over Jipe Farm" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-[#040e08]/80"/>
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
                    <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-5">Ready to Explore?</p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">Your Tanzania Adventure Begins Here</h2>
                    <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">Spaces are intentionally limited for an intimate experience. Contact us to check availability.</p>
                    <Link href="/contact" className="inline-block bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold px-10 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:shadow-[#d4a853]/30 hover:-translate-y-0.5">
                        Send a Booking Enquiry
                    </Link>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-xl"/>
                        <div className="mt-4 text-center">
                            <p className="text-white font-semibold">{lightbox.title}</p>
                            {lightbox.description && <p className="text-white/60 text-sm mt-1">{lightbox.description}</p>}
                            <p className="text-[#d4a853] text-xs mt-2 uppercase tracking-widest">{lightbox.category}</p>
                        </div>
                        <button onClick={() => setLightbox(null)} className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
