import { useState, useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PageProps, Package } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

function BookingModal({ pkg, onClose }: { pkg: Package; onClose: () => void }) {
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
        if (success) { reset(); }
    }, [success]);

    // Close on Escape
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
        post(`/packages/${pkg.id}/book`);
    };

    const inputCls = "w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors placeholder-white/25";

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="relative bg-[#0d1f13] border border-white/10 rounded-2xl w-full max-w-lg my-auto shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-7 pt-7 pb-5 border-b border-white/8">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[#d4a853] text-xs font-bold uppercase tracking-widest mb-1">Booking Enquiry</p>
                            <h2 className="text-white font-bold text-xl">{pkg.name}</h2>
                            <p className="text-white/40 text-sm mt-0.5">{pkg.duration} · {pkg.price} {pkg.price_note ?? 'per person'}</p>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all flex-shrink-0 mt-0.5">
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
                        <h3 className="text-white font-bold text-lg mb-2">Enquiry Received!</h3>
                        <p className="text-white/55 text-sm leading-relaxed mb-6">
                            Thank you! We've received your booking enquiry for <strong className="text-white">{pkg.name}</strong>.
                            Our team will get back to you within 24 hours.
                        </p>
                        <button onClick={onClose} className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold px-8 py-3 rounded-xl text-sm transition-all">
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={submit} className="px-7 py-6 space-y-4">
                        <p className="text-white/40 text-xs leading-relaxed">
                            No payment required — we'll confirm availability and reach out with details.
                        </p>

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Full Name *</label>
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
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Email Address *</label>
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

                        {/* Phone + Group size */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Phone Number</label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    placeholder="+1 555 000 0000"
                                    className={inputCls}
                                />
                                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Group Size *</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setData('group_size', Math.max(1, data.group_size - 1))}
                                        className="w-10 h-[46px] flex-shrink-0 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors text-lg font-light"
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
                                        className="w-10 h-[46px] flex-shrink-0 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors text-lg font-light"
                                    >
                                        +
                                    </button>
                                </div>
                                {errors.group_size && <p className="text-red-400 text-xs mt-1">{errors.group_size}</p>}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Additional Notes</label>
                            <textarea
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                                rows={3}
                                placeholder="Preferred dates, dietary requirements, special requests, questions…"
                                className={`${inputCls} resize-none`}
                            />
                            {errors.notes && <p className="text-red-400 text-xs mt-1">{errors.notes}</p>}
                        </div>

                        {/* Deals consent */}
                        <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                            <p className="text-white/70 text-sm font-medium mb-3">
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
                                                    : 'bg-white/10 border-white/30 text-white'
                                                : 'bg-transparent border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
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

export default function PackageDetail({ package: pkg, others }: PageProps<{ package: Package; others: Package[] }>) {
    const [showBooking, setShowBooking] = useState(false);
    const { flash } = usePage<PageProps>().props;

    // Auto-open modal after successful submission to show success state
    useEffect(() => {
        if (flash?.booking_success) setShowBooking(true);
    }, [flash?.booking_success]);

    return (
        <PublicLayout>
            <Head title={`${pkg.name} — Jipe Farm Campsite`} />

            {/* Booking modal */}
            {showBooking && <BookingModal pkg={pkg} onClose={() => setShowBooking(false)} />}

            {/* Hero */}
            <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
                {pkg.image_url ? (
                    <img src={pkg.image_url} alt={pkg.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#071510] to-[#0d2218]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071510] via-[#071510]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071510]/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 px-6 pb-10 md:px-16 md:pb-14 max-w-3xl">
                    <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
                        <Link href="/" className="hover:text-[#d4a853] transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/packages" className="hover:text-[#d4a853] transition-colors">Packages</Link>
                        <span>/</span>
                        <span className="text-white/60">{pkg.name}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        {pkg.badge && (
                            <span className="bg-[#d4a853] text-[#071510] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {pkg.badge}
                            </span>
                        )}
                        <span className="text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {pkg.duration}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">{pkg.name}</h1>
                    {pkg.tagline && (
                        <p className="text-[#d4a853] text-lg md:text-xl font-medium">{pkg.tagline}</p>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="bg-[#071510]">
                <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-[#d4a853] rounded-full inline-block" />
                                Package Overview
                            </h2>
                            <p className="text-white/70 leading-relaxed text-[15px]">{pkg.description}</p>
                        </div>

                        {pkg.features.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-[#d4a853] rounded-full inline-block" />
                                    What's Included
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {pkg.features.map((f, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white/3 border border-white/8 rounded-xl p-4">
                                            <div className="w-5 h-5 rounded-full bg-[#d4a853]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-white/80 text-sm leading-snug">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#d4a853]/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm mb-1">Custom Itinerary Available</p>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        We tailor every stay to your group's interests. Mention your preferred dates, dietary needs, and special requests when you book — we'll craft the perfect experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <div className={`rounded-2xl p-6 border ${pkg.is_featured ? 'bg-gradient-to-br from-[#d4a853]/15 to-[#d4a853]/5 border-[#d4a853]/30' : 'bg-white/3 border-white/8'}`}>
                            {pkg.is_featured && (
                                <p className="text-[#d4a853] text-xs font-bold uppercase tracking-widest mb-3">Most Popular</p>
                            )}
                            <div className="mb-1">
                                <span className="text-4xl font-bold text-white">{pkg.price}</span>
                            </div>
                            {pkg.price_note && (
                                <p className="text-white/40 text-sm mb-1">{pkg.price_note}</p>
                            )}
                            <p className="text-white/50 text-xs flex items-center gap-1.5 mb-5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {pkg.duration}
                            </p>
                            <button
                                onClick={() => setShowBooking(true)}
                                className="block w-full bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold py-3 rounded-xl text-sm text-center transition-all"
                            >
                                Book This Package
                            </button>
                            <p className="text-center text-white/30 text-xs mt-3">No payment required to enquire</p>
                        </div>

                        <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                            <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">Location</h3>
                            <p className="text-white text-sm font-medium">Jipe Farm Campsite</p>
                            <p className="text-white/50 text-xs mt-1">Mkomazi Ecosystem, Tanzania</p>
                            <p className="text-white/30 text-xs mt-0.5">3°36′S 37°45′E</p>
                        </div>
                    </div>
                </div>

                {/* Other packages */}
                {others.length > 0 && (
                    <div className="border-t border-white/5 py-14">
                        <div className="max-w-6xl mx-auto px-6 md:px-10">
                            <h2 className="text-xl font-bold text-white mb-8">Other Packages</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {others.map(p => (
                                    <Link key={p.id} href={`/packages/${p.id}`} className="group block bg-white/3 border border-white/8 hover:border-[#d4a853]/30 rounded-2xl overflow-hidden transition-all">
                                        <div className="h-44 overflow-hidden bg-[#0d2218] relative">
                                            {p.image_url && (
                                                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            )}
                                            {p.badge && (
                                                <span className="absolute top-3 left-3 bg-[#d4a853] text-[#071510] text-xs font-bold px-2.5 py-1 rounded-full">
                                                    {p.badge}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-semibold text-sm mb-1">{p.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white/40 text-xs">{p.duration}</span>
                                                <span className="text-[#d4a853] font-bold text-sm">{p.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="pb-14 text-center">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-white/40 hover:text-[#d4a853] text-sm transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to All Packages
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
