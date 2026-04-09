import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

const WaveIcon = () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="20" fill="#d4a853"/>
        <path d="M20 9 L6 29 L34 29 Z" fill="#071510"/>
        <path d="M15 29 L15 23 Q20 17 25 23 L25 29 Z" fill="#d4a853"/>
        <line x1="5" y1="31" x2="35" y2="31" stroke="#071510" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <circle cx="30" cy="13" r="1.3" fill="#071510" opacity="0.65"/>
    </svg>
);

// Rotating activity images shown on the left panel
const activityImages = [
    { src: '/Images/hiking 3.jpg',     label: 'Guided Hiking' },
    { src: '/Images/Milking.jpg',      label: 'Farm Milking' },
    { src: '/Images/Bush Fire.jpg',    label: 'Bonfire Nights' },
    { src: '/Images/Camel Riding.jpg', label: 'Camel Riding' },
];

// Pick a stable image based on the current minute so it doesn't flash on load
const panelImage = activityImages[Math.floor(Date.now() / 60000) % activityImages.length];

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex bg-[#040e08]">
            <style>{`::-webkit-scrollbar{display:none}`}</style>

            {/* ── Left: activity image panel ─────────────────────────── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src={panelImage.src}
                    alt={panelImage.label}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#040e08]/70 via-[#071510]/40 to-[#040e08]/20" />

                <div className="relative z-10 flex flex-col justify-between p-10 w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10"><WaveIcon /></div>
                        <div>
                            <p className="text-white font-bold text-lg leading-none">Jipe Farm Campsite</p>
                            <p className="text-[#d4a853] text-[10px] tracking-[0.25em] uppercase mt-0.5">Campsite · Tanzania</p>
                        </div>
                    </Link>

                    {/* Activity label + quote */}
                    <div className="max-w-sm">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-8 h-px bg-[#d4a853]" />
                            <span className="text-[#d4a853] text-xs font-semibold tracking-[0.2em] uppercase">
                                {panelImage.label}
                            </span>
                        </div>
                        <blockquote className="text-white/90 text-2xl font-light leading-relaxed italic mb-6">
                            "The wilderness is not a luxury but a necessity of the human spirit."
                        </blockquote>
                        <p className="text-[#d4a853] text-sm font-semibold">— Edward Abbey</p>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-8 h-px bg-white/20" />
                            <p className="text-white/40 text-xs tracking-widest uppercase">Lake Jipe · Tanzania · 3°S, 37°E</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right: form panel ───────────────────────────────────── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">

                    {/* Mobile logo */}
                    <Link href="/" className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="w-10 h-10"><WaveIcon /></div>
                        <div>
                            <p className="text-white font-bold text-lg leading-none">Jipe Farm Campsite</p>
                            <p className="text-[#d4a853] text-[10px] tracking-[0.25em] uppercase mt-0.5">Tanzania</p>
                        </div>
                    </Link>

                    {children}

                    <div className="mt-8 pt-6 border-t border-white/8 text-center">
                        <Link href="/" className="text-white/35 hover:text-white/60 text-xs transition-colors">
                            ← Return to public website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
