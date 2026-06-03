import { Head, Link } from '@inertiajs/react';
import { PageProps, AboutSection } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

export default function About({ about }: PageProps<{ about: AboutSection | null }>) {
    return (
        <PublicLayout>
            <Head title="About Jipe Farm Campsite | Eco Bush Camp on Lake Jipe, Kilimanjaro Tanzania">
                <meta name="description" content="Learn about Jipe Farm Campsite — an eco-friendly farm campsite on the shores of Lake Jipe in Kilimanjaro Region, Tanzania. International-standard bush camping near Moshi with untouched nature and unforgettable experiences." />
                <meta name="keywords" content="about Jipe Farm, Jipe Farm Campsite story, Lake Jipe Tanzania, eco camp Kilimanjaro, bush camp Moshi, Tanzania wilderness camp, Kilimanjaro region campsite, Lake Jipe shore camp, Tanzania eco tourism, farm campsite Tanzania" />
                <meta property="og:title" content="About Jipe Farm Campsite — Lake Jipe, Kilimanjaro Tanzania" />
                <meta property="og:description" content="Eco-friendly farm campsite on Lake Jipe, Kilimanjaro Region. International-standard bush camping, canoeing, hiking and wildlife adventures near Moshi, Tanzania." />
                <meta property="og:url" content="https://www.lakejipecamp.co.tz/about" />
                <meta name="twitter:title" content="About Jipe Farm Campsite — Lake Jipe, Kilimanjaro" />
                <meta name="twitter:description" content="Eco-friendly bush campsite on Lake Jipe. Untouched nature and international-standard adventures near Moshi, Tanzania." />
                <link rel="canonical" href="https://www.lakejipecamp.co.tz/about" />
                <script type="application/ld+json">{`{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "About Jipe Farm Campsite",
                    "url": "https://www.lakejipecamp.co.tz/about",
                    "description": "Eco-friendly farm campsite on the shores of Lake Jipe, Kilimanjaro Region, Tanzania. International-standard bush camping, canoeing, hiking and wildlife near Moshi.",
                    "mainEntity": {
                        "@type": ["LodgingBusiness", "TouristAttraction"],
                        "name": "Jipe Farm Campsite",
                        "description": "An eco-friendly farm campsite on the shores of Lake Jipe in northern Tanzania, Kilimanjaro Region, near Moshi. Offering canoeing, hiking, milking, bonfire nights, camel riding and wildlife adventures.",
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
                    }
                }`}</script>
            </Head>
            <div className="relative h-72 lg:h-screen flex items-end overflow-hidden">
                <img src="/Images/Camp site food.jpg" alt="About" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90"/>
                <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pb-14 w-full">
                    <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Our Story</p>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white">About Jipe Farm Campsite</h1>
                </div>
            </div>

            {about ? (
                <>
                    <section className="bg-white py-24">
                        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                            <div className="sticky top-24">
                                <div className="overflow-hidden rounded-2xl">
                                    <img src={about.image_url ?? ''} alt="Jipe Farm" className="w-full object-cover hover:scale-105 transition-transform duration-700"/>
                                </div>
                                {about.stats && (
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        {about.stats.map((s) => (
                                            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                                                <p className="text-[#d4a853] font-bold text-3xl">{s.value}</p>
                                                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-4">{about.subheading}</p>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">{about.heading}</h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed">
                                    <p>{about.body}</p>
                                    {about.body_secondary && <p>{about.body_secondary}</p>}
                                </div>
                                {about.features && (
                                    <div className="mt-10">
                                        <h3 className="text-gray-900 font-semibold text-lg mb-5">What Makes Us Special</h3>
                                        <ul className="space-y-3">
                                            {about.features.map((f) => (
                                                <li key={f} className="flex items-start gap-3 text-gray-600 text-sm">
                                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5 text-[#d4a853] shrink-0"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/></svg>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="mt-10">
                                    <Link href="/contact" className="inline-block bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5">
                                        Plan Your Visit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <div className="bg-white py-32 text-center text-gray-500">Content coming soon.</div>
            )}
        </PublicLayout>
    );
}
