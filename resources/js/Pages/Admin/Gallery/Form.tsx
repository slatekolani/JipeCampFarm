import { FormEventHandler, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, GalleryImage } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

const CATEGORIES = ['Landscape', 'Wildlife', 'Activities', 'Camp Life', 'General'];

export default function GalleryForm({ image }: PageProps<{ image: GalleryImage | null }>) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(image?.image_url ?? '');

    const { data, setData, post, processing } = useForm<{
        title: string; description: string;
        image: File | null; image_url: string;
        category: string; sort_order: number; is_active: boolean;
        _method?: string;
    }>({
        title: image?.title ?? '', description: image?.description ?? '',
        image: null, image_url: image?.image_url ?? '',
        category: image?.category ?? 'General',
        sort_order: image?.sort_order ?? 0, is_active: image?.is_active ?? true,
        _method: image ? 'PUT' : undefined,
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const url = image ? `/admin/gallery/${image.id}` : '/admin/gallery';
        post(url, { forceFormData: true });
    };

    const inputCls = "w-full bg-white/5 border border-gray-200 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors";

    return (
        <AdminLayout title={image ? 'Edit Image' : 'Add Image'}>
            <Head title={image ? 'Edit Image' : 'Add Image'} />
            <div className="max-w-xl">
                <h1 className="text-xl font-bold text-white mb-7">{image ? 'Edit Gallery Image' : 'Add Image to Gallery'}</h1>
                <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-7 space-y-5">
                    <div>
                        <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Title *</label>
                        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required className={inputCls} />
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Image *</label>
                        {preview && (
                            <div className="relative mb-3 group">
                                <img src={preview} alt="Preview" className="w-full h-52 object-cover rounded-xl border border-gray-200" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                    <span className="text-gray-600 text-xs">Click below to change</span>
                                </div>
                            </div>
                        )}
                        <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 hover:border-[#d4a853]/50 rounded-xl p-6 text-center cursor-pointer transition-colors">
                            <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-500 text-sm">{data.image ? data.image.name : 'Click to upload photo'}</p>
                            <p className="text-gray-300 text-xs mt-1">JPG, PNG, WebP — max 8MB</p>
                        </div>
                        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="What's in this photo? Where was it taken?" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Category</label>
                            <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full bg-white border border-gray-200 text-white rounded-xl px-4 py-3 text-sm outline-none">
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-600 text-xs uppercase tracking-wider mb-1.5">Sort Order</label>
                            <input type="number" min="0" value={data.sort_order} onChange={e => setData('sort_order', +e.target.value)} className={inputCls} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="accent-[#d4a853] w-4 h-4" id="active" />
                        <label htmlFor="active" className="text-gray-600 text-sm">Active (visible on site)</label>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing} className="flex-1 bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3 rounded-xl text-sm">
                            {processing ? 'Saving...' : 'Save Image'}
                        </button>
                        <a href="/admin/gallery" className="px-5 py-3 border border-gray-200 text-gray-600 text-sm rounded-xl text-center">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
