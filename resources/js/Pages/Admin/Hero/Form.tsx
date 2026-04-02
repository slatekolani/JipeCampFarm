import { FormEventHandler, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, HeroSlide } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function HeroForm({ slide }: PageProps<{ slide: HeroSlide | null }>) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(slide?.image_url ?? '');

    const { data, setData, post, processing, errors } = useForm<{
        title: string; subtitle: string; description: string;
        image: File | null; image_url: string;
        cta_text: string; cta_url: string; sort_order: number; is_active: boolean;
        _method?: string;
    }>({
        title: slide?.title ?? '', subtitle: slide?.subtitle ?? '',
        description: slide?.description ?? '',
        image: null, image_url: slide?.image_url ?? '',
        cta_text: slide?.cta_text ?? 'Explore More',
        cta_url: slide?.cta_url ?? '/',
        sort_order: slide?.sort_order ?? 0, is_active: slide?.is_active ?? true,
        _method: slide ? 'PUT' : undefined,
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const url = slide ? `/admin/hero/${slide.id}` : '/admin/hero';
        post(url, { forceFormData: true });
    };

    const inputCls = "w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors";

    return (
        <AdminLayout title={slide ? 'Edit Slide' : 'New Slide'}>
            <Head title={slide ? 'Edit Slide' : 'Add Slide'} />
            <div className="max-w-2xl">
                <h1 className="text-xl font-bold text-white mb-7">{slide ? 'Edit Hero Slide' : 'Add New Hero Slide'}</h1>
                <form onSubmit={submit} className="bg-[#071510] border border-white/8 rounded-2xl p-7 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Title *</label>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required className={inputCls} />
                        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                    </div>
                    {/* Subtitle */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Subtitle</label>
                        <input type="text" value={data.subtitle} onChange={e => setData('subtitle', e.target.value)} className={inputCls} />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Hero Image</label>
                        {preview && (
                            <div className="relative mb-3 group">
                                <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-white/10" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                    <span className="text-white/70 text-xs">Click below to change</span>
                                </div>
                            </div>
                        )}
                        <div
                            onClick={() => fileRef.current?.click()}
                            className="border-2 border-dashed border-white/10 hover:border-[#d4a853]/50 rounded-xl p-6 text-center cursor-pointer transition-colors"
                        >
                            <svg className="w-8 h-8 text-white/20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-white/40 text-sm">{data.image ? data.image.name : 'Click to upload image'}</p>
                            <p className="text-white/20 text-xs mt-1">JPG, PNG, WebP — max 8MB</p>
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                        {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
                    </div>
                    {/* CTA */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">CTA Button Text</label>
                            <input type="text" value={data.cta_text} onChange={e => setData('cta_text', e.target.value)} className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">CTA URL</label>
                            <input type="text" value={data.cta_url} onChange={e => setData('cta_url', e.target.value)} className={inputCls} />
                        </div>
                    </div>
                    {/* Sort + Active */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Sort Order</label>
                            <input type="number" min="0" value={data.sort_order} onChange={e => setData('sort_order', +e.target.value)} className={inputCls} />
                        </div>
                        <div className="flex items-center gap-3 pt-7">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 accent-[#d4a853]" />
                            <label htmlFor="is_active" className="text-white/70 text-sm">Active</label>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing} className="flex-1 bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3 rounded-xl transition-all text-sm">
                            {processing ? 'Saving...' : 'Save Slide'}
                        </button>
                        <a href="/admin/hero" className="px-5 py-3 border border-white/10 hover:border-white/20 text-white/50 hover:text-white text-sm rounded-xl transition-all text-center">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
