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
        { icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z', label: 'Edgar Edgar', value: '0743154530' },
        { icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z', label: 'Cuthbert Emanuel', value: '0753513146' },
        { icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z', label: 'Samuel', value: '0779251541' },
        { icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z', label: 'Location', value: 'Kilimanjaro Region, Tanzania' },
    ];

    const publicTransport = [
        { route: 'Moshi town to Kifaru', cost: '3,000/=' },
        { route: 'Kifaru to Jipe Farm (Take a toyo)', cost: '18,000/=' },
    ];

    const boltOptions = [
        { type: 'Bajaji (3-Wheeler)', cost: '86,000/=' },
        { type: 'Car', cost: '121,000/=' },
        { type: 'Motorbike', cost: '50,500/=' },
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

            <section className="bg-[#071510] border-t border-white/5 pb-20">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14">
                    <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0d1f13] min-h-[360px]">
                        <iframe
                            title="Jipe Farm Campsite location"
                            src="https://maps.google.com/maps?q=-3.598951,37.699760&z=15&output=embed"
                            className="w-full h-full min-h-[360px]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <div>
                        <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Getting Here</p>
                        <h2 className="text-2xl font-bold text-white mb-3">Jipe Farm Campsite Location</h2>
                        <p className="text-white/55 leading-relaxed mb-6">
                            If you decide to come individually, the camp is located here: <a href="https://maps.app.goo.gl/LNkSLU85HYBx9KRg9" target="_blank" rel="noreferrer" className="text-[#d4a853] hover:text-[#c49640]">open location on Google Maps</a>. Total distance is 51km.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                                <h3 className="text-white font-semibold text-sm mb-4">Public Transportation</h3>
                                <div className="space-y-3">
                                    {publicTransport.map(item => (
                                        <div key={item.route} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                            <span className="text-white/55 text-sm leading-snug">{item.route}</span>
                                            <span className="text-[#d4a853] text-sm font-bold whitespace-nowrap">{item.cost}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                                <h3 className="text-white font-semibold text-sm mb-4">Bolt Estimates</h3>
                                <div className="space-y-3">
                                    {boltOptions.map(item => (
                                        <div key={item.type} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                            <span className="text-white/55 text-sm leading-snug">{item.type}</span>
                                            <span className="text-[#d4a853] text-sm font-bold whitespace-nowrap">{item.cost}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
