import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps, GalleryImage } from '@/types';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Gallery({ images, categories }: PageProps<{ images: GalleryImage[]; categories: string[] }>) {
    const [filter, setFilter] = useState('All');
    const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

    const filtered = filter === 'All' ? images : images.filter(img => img.category === filter);

    return (
        <PublicLayout>
            <Head title="Gallery — Jipe Farm Campsite"/>

            <div className="relative h-72 lg:h-screen flex items-end overflow-hidden">
                <img src="/Images/Jipe Lake.jpg" alt="About" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-b from-[#071510]/20 via-[#071510]/40 to-[#071510]"/>
                <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pb-14 w-full">
                    <p className="text-[#d4a853] text-xs font-semibold tracking-[0.25em] uppercase mb-3">Visual Stories</p>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white">Through Our Lens</h1>
                </div>
            </div>

            <section className="bg-[#071510] py-16">
                <div className="max-w-7xl mx-auto px-5 lg:px-8">
                    {/* Category filter */}
                    <div className="flex flex-wrap gap-2 mb-10">
                        {['All', ...categories].map((cat) => (
                            <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${filter === cat ? 'bg-[#d4a853] text-[#071510]' : 'border border-white/15 text-white/60 hover:border-[#d4a853]/50 hover:text-white'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Masonry grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {filtered.map((img) => (
                            <div key={img.id} className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => setLightbox(img)}>
                                <img src={img.image_url} alt={img.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-4">
                                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <span className="inline-block bg-[#d4a853] text-[#071510] text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-full mb-2">{img.category}</span>
                                        <p className="text-white font-semibold text-sm">{img.title}</p>
                                        {img.description && <p className="text-white/70 text-xs mt-1 line-clamp-2">{img.description}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filtered.length === 0 && <p className="text-center text-white/40 py-20">No images in this category yet.</p>}
                </div>
            </section>

            {lightbox && (
                <div className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <img src={lightbox.image_url} alt={lightbox.title} className="w-full max-h-[75vh] object-contain rounded-xl"/>
                        <div className="mt-5 text-center">
                            <span className="inline-block bg-[#d4a853] text-[#071510] text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-2">{lightbox.category}</span>
                            <p className="text-white font-semibold text-lg">{lightbox.title}</p>
                            {lightbox.description && <p className="text-white/60 mt-2 max-w-xl mx-auto text-sm leading-relaxed">{lightbox.description}</p>}
                        </div>
                        <button onClick={() => setLightbox(null)} className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
