import { Head, Link } from '@inertiajs/react';
import { PageProps, Activity } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Activities({ activities }: PageProps<{ activities: Activity[] }>) {
    return (
        <PublicLayout>
            <Head title="Activities | Canoeing, Hiking, Bush Camping &amp; More — Jipe Farm Campsite, Kilimanjaro">
                <meta name="description" content="Explore activities at Jipe Farm Campsite near Kilimanjaro, Tanzania: canoeing on Lake Jipe, guided hiking in Moshi, bush camping, farm milking, camel riding, bonfire nights and birdwatching." />
                <meta name="keywords" content="canoeing Kilimanjaro, canoeing Moshi, hiking Kilimanjaro, hiking Moshi, bush camping Kilimanjaro, milking Kilimanjaro, milking Moshi, bonfire Kilimanjaro, born fire Moshi, camel riding Tanzania, birdwatching Kilimanjaro, Lake Jipe activities, Tanzania adventure activities, Jipe Farm activities" />
                <meta property="og:title" content="Activities at Jipe Farm Campsite — Kilimanjaro, Tanzania" />
                <meta property="og:description" content="Canoeing on Lake Jipe, guided hiking near Kilimanjaro, farm milking, bush camping, camel riding and bonfire nights. Book your adventure near Moshi, Tanzania." />
                <meta property="og:url" content="https://www.lakejipecamp.co.tz/activities" />
                <meta name="twitter:title" content="Activities at Jipe Farm Campsite — Kilimanjaro, Tanzania" />
                <meta name="twitter:description" content="Canoeing, hiking, bush camping, milking, bonfire nights &amp; more at Jipe Farm Campsite near Moshi, Tanzania." />
                <link rel="canonical" href="https://www.lakejipecamp.co.tz/activities" />
                <script type="application/ld+json">{`{
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "Adventure Activities at Jipe Farm Campsite, Kilimanjaro",
                    "url": "https://www.lakejipecamp.co.tz/activities",
                    "description": "Full list of outdoor adventure activities available at Jipe Farm Campsite near Kilimanjaro and Moshi, Tanzania",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Canoeing on Lake Jipe, Kilimanjaro" },
                        { "@type": "ListItem", "position": 2, "name": "Guided Hiking near Moshi, Kilimanjaro" },
                        { "@type": "ListItem", "position": 3, "name": "Bush Camping, Kilimanjaro Region" },
                        { "@type": "ListItem", "position": 4, "name": "Farm Milking Experience, Kilimanjaro" },
                        { "@type": "ListItem", "position": 5, "name": "Bonfire Night, Moshi Tanzania" },
                        { "@type": "ListItem", "position": 6, "name": "Camel Riding, Lake Jipe Tanzania" },
                        { "@type": "ListItem", "position": 7, "name": "Birdwatching, Kilimanjaro Region" }
                    ]
                }`}</script>
            </Head>
            {/* Hero banner */}
            <div className="relative h-96 lg:h-screen flex items-end overflow-hidden">
                <img src="/Images/hiking 3.jpg" alt="About" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
                <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pb-14 w-full">
                    <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Experiences</p>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white">Activities at Jipe Farm Campsite</h1>
                </div>
            </div>

            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-5 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {activities.map((act) => (
                            <Link
                                key={act.id}
                                href={`/activities/${act.id}`}
                                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#d4a853]/30 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    {act.image_url && (
                                        <img src={act.image_url} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    {act.highlight_badge && (
                                        <span className="absolute top-4 right-4 bg-[#d4a853] text-[#071510] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                                            {act.highlight_badge}
                                        </span>
                                    )}
                                </div>
                                <div className="p-6">
                                    {act.tagline && <p className="text-[#d4a853] text-xs font-semibold tracking-widest uppercase mb-2">{act.tagline}</p>}
                                    <h3 className="text-gray-900 font-bold text-xl mb-2">{act.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{act.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2">
                                            {act.duration && <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{act.duration}</span>}
                                            {act.difficulty && <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{act.difficulty}</span>}
                                        </div>
                                        <span className="text-[#d4a853] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Details
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
