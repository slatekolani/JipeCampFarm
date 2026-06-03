import { useState, useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps, Activity } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

const DIFFICULTY_COLOR: Record<string, string> = {
    Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    Moderate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    Challenging: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    Expert: 'text-red-400 bg-red-400/10 border-red-400/20',
};

function BookingModal({ activity, onClose }: { activity: Activity; onClose: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        group_size: 1,
        notes: '',
        wants_deals: '',
    });

    const { flash } = usePage<PageProps>().props;
    const success = flash?.booking_success;

    useEffect(() => {
        if (success) reset();
    }, [success]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/activities/${activity.id}/book`);
    };

    const inputCls = "w-full bg-gray-50 border border-gray-200 focus:border-[#d4a853]/60 text-gray-900 rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-gray-400";

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-lg my-auto shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-7 pt-7 pb-5 border-b border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[#d4a853] text-xs font-bold uppercase tracking-widest mb-1">Activity Booking</p>
                            <h2 className="text-gray-900 font-bold text-xl">{activity.title}</h2>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                {activity.duration && (
                                    <span className="text-gray-500 text-xs flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {activity.duration}
                                    </span>
                                )}
                                {activity.difficulty && (
                                    <span className="text-gray-500 text-xs">{activity.difficulty}</span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all flex-shrink-0 mt-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Success state */}
                {success ? (
                    <div className="px-7 py-10 text-center">
                        <div className="w-14 h-14 rounded-full bg-[#d4a853]/15 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-gray-900 font-bold text-lg mb-2">Booking Received!</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Thank you! We've received your booking for <strong className="text-gray-900">{activity.title}</strong>.
                            Our team will get back to you within 24 hours.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold px-8 py-3 rounded-xl text-sm transition-all"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submit} className="px-7 py-6 space-y-4">
                        <p className="text-gray-500 text-xs leading-relaxed">
                            No payment required — we'll confirm availability and reach out with details.
                        </p>

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Full Name *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                    placeholder="Jane Doe"
                                    className={inputCls}
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Email Address *</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                    placeholder="jane@example.com"
                                    className={inputCls}
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Group size */}
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Group Size *</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setData('group_size', Math.max(1, data.group_size - 1))}
                                        className="w-10 h-[46px] flex-shrink-0 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors text-lg font-light"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max="200"
                                        value={data.group_size}
                                        onChange={e => setData('group_size', Math.max(1, parseInt(e.target.value) || 1))}
                                        required
                                        className={`${inputCls} text-center`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setData('group_size', Math.min(200, data.group_size + 1))}
                                        className="w-10 h-[46px] flex-shrink-0 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl hover:bg-gray-100 transition-colors text-lg font-light"
                                    >
                                        +
                                    </button>
                                </div>
                                {errors.group_size && <p className="text-red-400 text-xs mt-1">{errors.group_size}</p>}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Additional Notes</label>
                            <textarea
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                                rows={3}
                                placeholder="Preferred dates, fitness level, special requirements…"
                                className={`${inputCls} resize-none`}
                            />
                            {errors.notes && <p className="text-red-400 text-xs mt-1">{errors.notes}</p>}
                        </div>

                        {/* Deals consent */}
                        <div className="bg-white/3 border border-gray-200 rounded-xl p-4">
                            <p className="text-gray-600 text-sm font-medium mb-3">
                                We'd love to send you exclusive deals when they arise — are you in?
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'yes', label: 'Yes, exactly!' },
                                    { value: 'no', label: 'Absolutely not' },
                                ].map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setData('wants_deals', data.wants_deals === opt.value ? '' : opt.value)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                            data.wants_deals === opt.value
                                                ? opt.value === 'yes'
                                                    ? 'bg-[#d4a853] border-[#d4a853] text-[#071510]'
                                                    : 'bg-gray-100 border-white/30 text-white'
                                                : 'bg-transparent border-gray-300 text-gray-600 hover:border-white/30 hover:text-gray-700'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3.5 rounded-xl text-sm transition-all"
                        >
                            {processing ? 'Sending Enquiry…' : 'Send Booking Enquiry'}
                        </button>

                        <p className="text-center text-white/25 text-xs">
                            We respond within 24 hours · No credit card required
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ActivityDetail({ activity, related }: PageProps<{ activity: Activity; related: Activity[] }>) {
    const [showBooking, setShowBooking] = useState(false);
    const { flash } = usePage<PageProps>().props;
    const diffColor = DIFFICULTY_COLOR[activity.difficulty ?? ''] ?? 'text-gray-500 bg-gray-50 border-gray-200';

    useEffect(() => {
        if (flash?.booking_success) setShowBooking(true);
    }, [flash?.booking_success]);

    return (
        <PublicLayout>
            <Head title={`${activity.title} | Activity at Jipe Farm Campsite — Kilimanjaro, Tanzania`}>
                <meta name="description" content={`${activity.description ? activity.description.slice(0, 155) : `${activity.title} — an adventure activity at Jipe Farm Campsite on Lake Jipe, near Kilimanjaro and Moshi, Tanzania.`}`} />
                <meta name="keywords" content={`${activity.title}, ${activity.title} Kilimanjaro, ${activity.title} Moshi, Jipe Farm ${activity.title}, Lake Jipe activities, bush camping Tanzania, adventure Kilimanjaro, Jipe Farm Campsite`} />
                <meta property="og:title" content={`${activity.title} — Jipe Farm Campsite, Kilimanjaro Tanzania`} />
                <meta property="og:description" content={activity.description ? activity.description.slice(0, 200) : `${activity.title} at Jipe Farm Campsite on Lake Jipe near Kilimanjaro, Tanzania.`} />
                <meta property="og:url" content={`https://www.lakejipecamp.co.tz/activities/${activity.id}`} />
                {activity.image_url && <meta property="og:image" content={activity.image_url} />}
                <meta name="twitter:title" content={`${activity.title} — Jipe Farm Campsite`} />
                <meta name="twitter:description" content={activity.description ? activity.description.slice(0, 200) : `${activity.title} at Jipe Farm near Kilimanjaro, Tanzania.`} />
                {activity.image_url && <meta name="twitter:image" content={activity.image_url} />}
                <link rel="canonical" href={`https://www.lakejipecamp.co.tz/activities/${activity.id}`} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "TouristAttraction",
                    "name": `${activity.title} — Jipe Farm Campsite`,
                    "description": activity.description || `${activity.title} activity at Jipe Farm Campsite on Lake Jipe, near Kilimanjaro and Moshi, Tanzania.`,
                    "url": `https://www.lakejipecamp.co.tz/activities/${activity.id}`,
                    "image": activity.image_url || undefined,
                    "touristType": ["Adventure Tourist", "Eco-Tourist", "Nature Lover"],
                    "location": {
                        "@type": "Place",
                        "name": "Jipe Farm Campsite",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Lake Jipe",
                            "addressRegion": "Kilimanjaro",
                            "addressCountry": "TZ"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": -3.633333,
                            "longitude": 37.783333
                        }
                    },
                    ...(activity.duration ? { "timeRequired": activity.duration } : {}),
                    "offers": {
                        "@type": "Offer",
                        "availability": "https://schema.org/InStock",
                        "url": `https://www.lakejipecamp.co.tz/activities/${activity.id}`
                    }
                })}</script>
            </Head>

            {showBooking && <BookingModal activity={activity} onClose={() => setShowBooking(false)} />}

            {/* Hero */}
            <div className="relative h-[65vh] min-h-[420px] overflow-hidden">
                {activity.image_url ? (
                    <img src={activity.image_url} alt={activity.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/90" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-16 md:pb-14 max-w-5xl">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                        <Link href="/" className="hover:text-[#d4a853] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/activities" className="hover:text-[#d4a853] transition-colors">Activities</Link>
                        <span>/</span>
                        <span className="text-gray-500">{activity.title}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {activity.highlight_badge && (
                            <span className="bg-[#d4a853] text-[#071510] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {activity.highlight_badge}
                            </span>
                        )}
                        {activity.difficulty && (
                            <span className={`text-xs font-medium px-3 py-1 rounded-full border ${diffColor}`}>
                                {activity.difficulty}
                            </span>
                        )}
                        {activity.duration && (
                            <span className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {activity.duration}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">{activity.title}</h1>
                    {activity.tagline && (
                        <p className="text-[#d4a853] text-lg md:text-xl font-medium">{activity.tagline}</p>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="bg-white">
                <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-[#d4a853] rounded-full inline-block" />
                                Overview
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-[15px]">{activity.description}</p>
                        </div>

                        {activity.details && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-[#d4a853] rounded-full inline-block" />
                                    What to Expect
                                </h2>
                                <div className="text-gray-600 leading-relaxed text-[15px] space-y-4">
                                    {activity.details.split('\n').filter(Boolean).map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Quick facts */}
                        <div className="bg-white/3 border border-gray-200 rounded-2xl p-6">
                            <h3 className="text-gray-900 font-semibold mb-5 text-sm uppercase tracking-wider">Quick Facts</h3>
                            <div className="space-y-4">
                                {activity.duration && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#d4a853]/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-0.5">Duration</p>
                                            <p className="text-gray-900 text-sm">{activity.duration}</p>
                                        </div>
                                    </div>
                                )}
                                {activity.difficulty && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#d4a853]/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs mb-0.5">Difficulty</p>
                                            <p className="text-gray-900 text-sm">{activity.difficulty}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#d4a853]/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs mb-0.5">Location</p>
                                        <p className="text-gray-900 text-sm">Lake Jipe, Tanzania</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-[#d4a853]/15 to-[#d4a853]/5 border border-[#d4a853]/20 rounded-2xl p-6 text-center">
                            <p className="text-gray-900 font-semibold mb-1">Ready to Experience This?</p>
                            <p className="text-gray-600 text-xs mb-4">Book as a standalone activity or as part of a package</p>
                            <button
                                onClick={() => setShowBooking(true)}
                                className="block w-full bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold py-3 rounded-xl text-sm transition-all"
                            >
                                Book This Activity
                            </button>
                            <Link
                                href="/packages"
                                className="block w-full mt-2 border border-gray-200 hover:border-white/20 text-gray-500 hover:text-gray-900 py-3 rounded-xl text-sm transition-all"
                            >
                                View Packages
                            </Link>
                            <p className="text-white/25 text-xs mt-3">No payment required to enquire</p>
                        </div>
                    </div>
                </div>

                {/* Related activities */}
                {related.length > 0 && (
                    <div className="border-t border-gray-100 py-14">
                        <div className="max-w-6xl mx-auto px-6 md:px-10">
                            <h2 className="text-xl font-bold text-gray-900 mb-8">Other Activities</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {related.map(a => (
                                    <Link key={a.id} href={`/activities/${a.id}`} className="group block bg-white/3 border border-gray-200 hover:border-[#d4a853]/30 rounded-2xl overflow-hidden transition-all">
                                        <div className="h-44 overflow-hidden bg-[#0d2218]">
                                            {a.image_url && (
                                                <img src={a.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-gray-900 font-semibold text-sm mb-1">{a.title}</h3>
                                            {a.duration && <p className="text-gray-500 text-xs">{a.duration}</p>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="pb-14 text-center">
                    <Link href="/activities" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#d4a853] text-sm transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to All Activities
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
