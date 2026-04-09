import { FormEventHandler } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Contact() {
    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', phone: '', subject: '', message: '', wants_deals: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), { onSuccess: () => reset() });
    };

    const contacts = [
        { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'info@jipefarmcampsite.com' },
        { icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z', label: 'Location', value: 'Kilimanjaro Region, Tanzania' },
    ];

    return (
        <PublicLayout>
            <Head title="Contact &amp; Book | Jipe Farm Campsite — Lake Jipe, Kilimanjaro Tanzania">
                <meta name="description" content="Contact Jipe Farm Campsite to book your bush camping, canoeing, hiking or adventure package near Kilimanjaro and Moshi, Tanzania. We respond within 24 hours." />
                <meta name="keywords" content="contact Jipe Farm, book camping Kilimanjaro, book canoeing Moshi, book hiking Kilimanjaro, Tanzania camping booking, Jipe Farm booking, Lake Jipe contact, bush camping reservation Tanzania, Kilimanjaro camp booking" />
                <meta property="og:title" content="Contact &amp; Book — Jipe Farm Campsite, Kilimanjaro Tanzania" />
                <meta property="og:description" content="Book your camping adventure at Jipe Farm Campsite near Kilimanjaro. Canoeing, hiking, milking, bonfire nights near Moshi, Tanzania. We respond within 24 hours." />
                <meta property="og:url" content="https://www.lakejipecamp.co.tz/contact" />
                <meta name="twitter:title" content="Contact Jipe Farm Campsite — Book Camping near Kilimanjaro" />
                <meta name="twitter:description" content="Book your adventure at Jipe Farm Campsite. Canoeing, hiking, bush camping &amp; more near Moshi and Kilimanjaro, Tanzania." />
                <link rel="canonical" href="https://www.lakejipecamp.co.tz/contact" />
                <script type="application/ld+json">{`{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contact Jipe Farm Campsite",
                    "url": "https://www.lakejipecamp.co.tz/contact",
                    "description": "Book or enquire about bush camping, canoeing, hiking and adventure packages at Jipe Farm Campsite near Kilimanjaro and Moshi, Tanzania",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Jipe Farm Campsite",
                        "email": "info@jipefarmcampsite.com",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": "Lake Jipe",
                            "addressRegion": "Kilimanjaro",
                            "addressCountry": "TZ"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "email": "info@jipefarmcampsite.com",
                            "contactType": "reservations",
                            "availableLanguage": ["English", "Swahili"],
                            "hoursAvailable": "Mo-Su 00:00-23:59"
                        }
                    }
                }`}</script>
            </Head>
           <div className="relative h-96 lg:h-screen flex items-end overflow-hidden">
                <img src="/Images/Camel Riding.jpg" alt="About" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-b from-[#071510]/30 via-[#071510]/50 to-[#071510]"/>
                <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pb-14 w-full">
                    <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Get in Touch</p>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white">Contact Us</h1>
                </div>
            </div>

            <section className="bg-[#071510] py-20">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact info */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-3">Plan Your Jipe Farm Adventure</h2>
                        <p className="text-white/55 leading-relaxed mb-10">Whether you want to enquire about availability, customise a package, or simply ask a question — we'd love to hear from you. We respond to all messages within 24 hours.</p>
                        <div className="space-y-6">
                            {contacts.map((c) => (
                                <div key={c.label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#d4a853]/15 border border-[#d4a853]/30 rounded-xl flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d={c.icon}/></svg>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{c.label}</p>
                                        <p className="text-white font-medium">{c.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-[#0d1f13] border border-white/8 rounded-2xl p-7">
                        {flash?.success && (
                            <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl mb-6">
                                {flash.success}
                            </div>
                        )}
                        <h3 className="text-white font-bold text-xl mb-6">Send a Message</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Your Name *</label>
                                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="John Doe" required/>
                                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Email *</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors" placeholder="john@example.com" required/>
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Subject</label>
                                    <select value={data.subject} onChange={e => setData('subject', e.target.value)} className="w-full bg-[#0d1f13] border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors">
                                        <option value="">Select a topic</option>
                                        <option>Booking Enquiry</option>
                                        <option>Package Information</option>
                                        <option>Custom Itinerary</option>
                                        <option>General Question</option>
                                    </select>
                            </div>
                            <div>
                                <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Message *</label>
                                <textarea value={data.message} onChange={e => setData('message', e.target.value)} rows={5} className="w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none" placeholder="Tell us about your travel plans, preferred dates, group size..." required/>
                                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
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
                            <button type="submit" disabled={processing} className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d4a853]/20">
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
