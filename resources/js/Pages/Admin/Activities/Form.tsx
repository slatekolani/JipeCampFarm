import { FormEventHandler, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, Activity } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ActivityForm({ activity }: PageProps<{ activity: Activity | null }>) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(activity?.image_url ?? '');

    const { data, setData, post, processing, errors } = useForm<{
        title: string; tagline: string; description: string; details: string;
        image: File | null; image_url: string;
        duration: string; difficulty: string; highlight_badge: string;
        is_featured: boolean; sort_order: number; is_active: boolean;
        _method?: string;
    }>({
        title: activity?.title ?? '', tagline: activity?.tagline ?? '',
        description: activity?.description ?? '', details: activity?.details ?? '',
        image: null, image_url: activity?.image_url ?? '',
        duration: activity?.duration ?? '', difficulty: activity?.difficulty ?? '',
        highlight_badge: activity?.highlight_badge ?? '',
        is_featured: activity?.is_featured ?? false,
        sort_order: activity?.sort_order ?? 0, is_active: activity?.is_active ?? true,
        _method: activity ? 'PUT' : undefined,
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const url = activity ? `/admin/activities/${activity.id}` : '/admin/activities';
        post(url, { forceFormData: true });
    };

    const inputCls = "w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors";

    return (
        <AdminLayout title={activity ? 'Edit Activity' : 'New Activity'}>
            <Head title={activity ? 'Edit Activity' : 'Add Activity'} />
            <div className="max-w-2xl">
                <h1 className="text-xl font-bold text-white mb-7">{activity ? 'Edit Activity' : 'Add New Activity'}</h1>
                <form onSubmit={submit} className="bg-[#071510] border border-white/8 rounded-2xl p-7 space-y-5">
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Title *</label>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required className={inputCls} />
                        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Tagline</label>
                        <input type="text" value={data.tagline} onChange={e => setData('tagline', e.target.value)} className={inputCls} placeholder="Short catchy line" />
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Activity Image</label>
                        {preview && (
                            <div className="relative mb-3 group">
                                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-white/10" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                    <span className="text-white/70 text-xs">Click below to change</span>
                                </div>
                            </div>
                        )}
                        <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-white/10 hover:border-[#d4a853]/50 rounded-xl p-6 text-center cursor-pointer transition-colors">
                            <svg className="w-8 h-8 text-white/20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-white/40 text-sm">{data.image ? data.image.name : 'Click to upload image'}</p>
                            <p className="text-white/20 text-xs mt-1">JPG, PNG, WebP — max 8MB</p>
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                        {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Description *</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} required className={`${inputCls} resize-none`} placeholder="Overview shown on the activities listing page" />
                        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Full Details</label>
                        <textarea value={data.details} onChange={e => setData('details', e.target.value)} rows={6} className={`${inputCls} resize-none`} placeholder="Full rich description shown on the activity detail page — include what to expect, what to bring, tips, etc." />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Duration</label>
                            <input type="text" value={data.duration} onChange={e => setData('duration', e.target.value)} className={inputCls} placeholder="e.g. 2–3 hours" />
                        </div>
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Difficulty</label>
                            <input type="text" value={data.difficulty} onChange={e => setData('difficulty', e.target.value)} className={inputCls} placeholder="Easy / Moderate" />
                        </div>
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Badge</label>
                            <input type="text" value={data.highlight_badge} onChange={e => setData('highlight_badge', e.target.value)} className={inputCls} placeholder="e.g. Most Popular" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Sort Order</label>
                            <input type="number" min="0" value={data.sort_order} onChange={e => setData('sort_order', +e.target.value)} className={inputCls} />
                        </div>
                        <div className="flex items-center gap-2 pt-7">
                            <input type="checkbox" id="featured" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} className="accent-[#d4a853] w-4 h-4" />
                            <label htmlFor="featured" className="text-white/70 text-sm">Featured</label>
                        </div>
                        <div className="flex items-center gap-2 pt-7">
                            <input type="checkbox" id="active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="accent-[#d4a853] w-4 h-4" />
                            <label htmlFor="active" className="text-white/70 text-sm">Active</label>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing} className="flex-1 bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3 rounded-xl text-sm">
                            {processing ? 'Saving...' : 'Save Activity'}
                        </button>
                        <a href="/admin/activities" className="px-5 py-3 border border-white/10 text-white/50 hover:text-white text-sm rounded-xl text-center">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
