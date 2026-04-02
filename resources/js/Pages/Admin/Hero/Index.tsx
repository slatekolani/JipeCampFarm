import { Head, Link, router } from '@inertiajs/react';
import { PageProps, HeroSlide } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function HeroIndex({ slides }: PageProps<{ slides: HeroSlide[] }>) {
    const del = (id: number) => { if (confirm('Delete this slide?')) router.delete(`/admin/hero/${id}`); };
    return (
        <AdminLayout title="Hero Carousel">
            <Head title="Hero Slides"/>
            <div className="flex items-center justify-between mb-7">
                <div><h1 className="text-xl font-bold text-white">Hero Carousel</h1><p className="text-white/40 text-sm mt-0.5">Manage the homepage hero slides</p></div>
                <Link href="/admin/hero/create" className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-5 py-2.5 rounded-xl transition-all">+ Add Slide</Link>
            </div>
            <div className="space-y-4">
                {slides.map((slide) => (
                    <div key={slide.id} className="bg-[#071510] border border-white/8 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                        <img src={slide.image_url} alt={slide.title} className="sm:w-40 h-28 sm:h-auto object-cover"/>
                        <div className="flex-1 p-5 flex items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-2 h-2 rounded-full ${slide.is_active ? 'bg-emerald-400' : 'bg-white/20'}`}/>
                                    <p className="text-white font-semibold">{slide.title}</p>
                                </div>
                                {slide.subtitle && <p className="text-[#d4a853] text-xs mb-1">{slide.subtitle}</p>}
                                <p className="text-white/40 text-xs">Order: {slide.sort_order} · CTA: {slide.cta_text}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Link href={`/admin/hero/${slide.id}/edit`} className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 text-xs px-3 py-2 rounded-lg transition-all">Edit</Link>
                                <button onClick={() => del(slide.id)} className="text-red-400/70 hover:text-red-400 bg-white/5 hover:bg-red-400/10 text-xs px-3 py-2 rounded-lg transition-all">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {slides.length === 0 && <p className="text-center text-white/40 py-16">No slides yet. Add your first hero slide.</p>}
            </div>
        </AdminLayout>
    );
}
