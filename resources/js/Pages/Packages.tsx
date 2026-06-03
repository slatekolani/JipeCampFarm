import { Head, Link } from '@inertiajs/react';
import { PageProps, Package } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Packages({ packages }: PageProps<{ packages: Package[] }>) {
    return (
        <PublicLayout>
            <Head title="Tour Packages | Bush Camping &amp; Adventure Packages — Jipe Farm Campsite, Kilimanjaro">
                <meta name="description" content="Choose from curated camping packages at Jipe Farm Campsite near Kilimanjaro, Tanzania. Weekend escapes to week-long immersions — canoeing, hiking, milking, bonfires and bush camping near Moshi." />
                <meta name="keywords" content="Jipe Farm tour packages, camping packages Kilimanjaro, bush camping package Tanzania, canoeing package Moshi, hiking package Kilimanjaro, Tanzania adventure package, Lake Jipe tour, Kilimanjaro camping package, Moshi camping weekend, Tanzania eco tourism package" />
                <meta property="og:title" content="Tour Packages — Jipe Farm Campsite, Kilimanjaro Tanzania" />
                <meta property="og:description" content="Curated camping and adventure packages at Jipe Farm Campsite near Kilimanjaro. From weekend escapes to week-long wilderness immersions near Moshi, Tanzania." />
                <meta property="og:url" content="https://www.lakejipecamp.co.tz/packages" />
                <meta name="twitter:title" content="Tour Packages — Jipe Farm Campsite, Kilimanjaro" />
                <meta name="twitter:description" content="Curated camping &amp; adventure packages near Kilimanjaro and Moshi. Book your Tanzania wilderness experience at Jipe Farm." />
                <link rel="canonical" href="https://www.lakejipecamp.co.tz/packages" />
                <script type="application/ld+json">{`{
                    "@context": "https://schema.org",
                    "@type": "TouristTrip",
                    "name": "Jipe Farm Campsite Tour Packages",
                    "description": "Curated camping and adventure packages at Jipe Farm Campsite on Lake Jipe, near Kilimanjaro and Moshi, Tanzania",
                    "itinerary": {
                        "@type": "ItemList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Bush Camping Weekend Package — Kilimanjaro, Tanzania" },
                            { "@type": "ListItem", "position": 2, "name": "Canoeing & Hiking Package — Lake Jipe, Moshi" },
                            { "@type": "ListItem", "position": 3, "name": "Full Immersion Farm & Wildlife Package — Kilimanjaro" }
                        ]
                    },
                    "touristType": ["Camper", "Hiker", "Adventure Tourist", "Eco-Tourist"],
                    "offers": {
                        "@type": "AggregateOffer",
                        "priceCurrency": "TZS",
                        "availability": "https://schema.org/InStock"
                    }
                }`}</script>
            </Head>
            <div className="relative h-72 lg:h-screen flex items-end overflow-hidden">
                <img src="/Images/Tent.jpg" alt="About" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
                <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pb-14 w-full">
                    <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Curated Experiences</p>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white">Tour Packages</h1>
                </div>
            </div>

            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-10">
                    {packages.map((pkg, i) => (
                        <div
                            key={pkg.id}
                            className={`flex flex-col lg:flex-row rounded-2xl overflow-hidden border ${pkg.is_featured ? 'border-[#d4a853]/50 shadow-2xl shadow-[#d4a853]/5' : 'border-gray-200'} ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image */}
                            <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                                {pkg.image_url && (
                                    <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover" />
                                )}
                                <div className={`absolute inset-0 ${i % 2 === 1 ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent to-black/60 hidden lg:block`} />
                                {pkg.badge && (
                                    <span className={`absolute top-5 left-5 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ${pkg.is_featured ? 'bg-[#d4a853] text-[#071510]' : 'bg-gray-100 text-gray-900'}`}>
                                        {pkg.badge}
                                    </span>
                                )}
                            </div>
                            {/* Content */}
                            <div className="bg-white lg:w-3/5 p-8 flex flex-col">
                                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                                    <div>
                                        {pkg.tagline && <p className="text-[#d4a853] text-xs font-semibold tracking-widest uppercase mb-1">{pkg.tagline}</p>}
                                        <h2 className="text-gray-900 font-bold text-2xl">{pkg.name}</h2>
                                        <p className="text-gray-500 text-sm mt-1">{pkg.duration}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#d4a853] font-bold text-3xl">{pkg.price}</p>
                                        <p className="text-gray-500 text-xs">{pkg.price_note ?? 'per person'}</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 leading-relaxed mb-5 text-sm line-clamp-3">{pkg.description}</p>
                                {/* Top features preview */}
                                <div className="grid sm:grid-cols-2 gap-2 mb-7 flex-1">
                                    {pkg.features.slice(0, 6).map((f) => (
                                        <div key={f} className="flex items-start gap-2.5 text-gray-600 text-sm">
                                            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5 text-[#d4a853] shrink-0">
                                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                            </svg>
                                            {f}
                                        </div>
                                    ))}
                                    {pkg.features.length > 6 && (
                                        <p className="text-gray-400 text-xs col-span-2">+{pkg.features.length - 6} more inclusions</p>
                                    )}
                                </div>
                                {/* Actions */}
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={`/packages/${pkg.id}`}
                                        className={`font-bold text-sm px-8 py-3 rounded-full transition-all ${pkg.is_featured ? 'bg-[#d4a853] hover:bg-[#c49640] text-[#071510]' : 'border border-white/20 hover:border-[#d4a853] text-gray-900 hover:text-[#d4a853]'}`}
                                    >
                                        View Full Details
                                    </Link>
                                    <Link href="/contact" className="font-medium text-sm px-6 py-3 rounded-full text-gray-600 hover:text-gray-900 transition-colors">
                                        Enquire →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
