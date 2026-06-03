import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, Testimonial } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
export default function TestimonialForm({ testimonial }: PageProps<{ testimonial: Testimonial | null }>) {
    const { data, setData, post, put, processing } = useForm({
        name: testimonial?.name ?? '', country: testimonial?.country ?? '',
        rating: testimonial?.rating ?? 5, content: testimonial?.content ?? '', is_active: testimonial?.is_active ?? true,
    });
    const submit: FormEventHandler = (e) => { e.preventDefault(); testimonial ? put(`/admin/testimonials/${testimonial.id}`) : post('/admin/testimonials'); };
    return (
        <AdminLayout title={testimonial ? 'Edit Review' : 'Add Review'}>
            <Head title={testimonial ? 'Edit Review' : 'Add Review'}/>
            <div className="max-w-xl">
                <h1 className="text-xl font-bold text-white mb-7">{testimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h1>
                <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-7 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Name *</label><input type="text" value={data.name} onChange={e => setData('name', e.target.value)} required className="w-full bg-white/5 border border-gray-200 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none"/></div>
                        <div><label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Country *</label><input type="text" value={data.country} onChange={e => setData('country', e.target.value)} required className="w-full bg-white/5 border border-gray-200 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none"/></div>
                    </div>
                    <div><label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Rating (1-5)</label><input type="number" min="1" max="5" value={data.rating} onChange={e => setData('rating', +e.target.value)} className="w-full bg-white/5 border border-gray-200 text-white rounded-xl px-4 py-3 text-sm outline-none"/></div>
                    <div><label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Review *</label><textarea value={data.content} onChange={e => setData('content', e.target.value)} rows={5} required className="w-full bg-white/5 border border-gray-200 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none resize-none"/></div>
                    <div className="flex items-center gap-2"><input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="accent-[#d4a853] w-4 h-4" id="active"/><label htmlFor="active" className="text-gray-600 text-sm">Active (visible on site)</label></div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing} className="flex-1 bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3 rounded-xl text-sm">{processing ? 'Saving...' : 'Save Review'}</button>
                        <a href="/admin/testimonials" className="px-5 py-3 border border-gray-200 text-gray-600 text-sm rounded-xl text-center">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
