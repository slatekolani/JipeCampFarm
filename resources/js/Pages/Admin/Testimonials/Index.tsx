import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Testimonial } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
export default function TestimonialsIndex({ testimonials }: PageProps<{ testimonials: Testimonial[] }>) {
    const del = (id: number) => { if (confirm('Delete?')) router.delete(`/admin/testimonials/${id}`); };
    return (
        <AdminLayout title="Testimonials">
            <Head title="Testimonials"/>
            <div className="flex items-center justify-between mb-7">
                <div><h1 className="text-xl font-bold text-white">Testimonials</h1><p className="text-white/40 text-sm mt-0.5">{testimonials.length} reviews</p></div>
                <Link href="/admin/testimonials/create" className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-5 py-2.5 rounded-xl">+ Add Review</Link>
            </div>
            <div className="space-y-4">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-[#071510] border border-white/8 rounded-2xl p-5 flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div><p className="text-white font-semibold text-sm">{t.name}</p><p className="text-white/40 text-xs">{t.country} · {'★'.repeat(t.rating)}</p></div>
                                <span className={`ml-auto text-[9px] px-2 py-0.5 rounded-full font-bold ${t.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'}`}>{t.is_active ? 'Active' : 'Hidden'}</span>
                            </div>
                            <p className="text-white/55 text-sm italic line-clamp-2">"{t.content}"</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <Link href={`/admin/testimonials/${t.id}/edit`} className="text-white/50 hover:text-white bg-white/5 text-xs px-3 py-2 rounded-lg">Edit</Link>
                            <button onClick={() => del(t.id)} className="text-red-400/60 hover:text-red-400 bg-white/5 text-xs px-3 py-2 rounded-lg">Delete</button>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && <p className="text-center text-white/40 py-16">No testimonials yet.</p>}
            </div>
        </AdminLayout>
    );
}
