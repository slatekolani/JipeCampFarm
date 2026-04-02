import { FormEventHandler, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, Package } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function PackageForm({ package: pkg }: PageProps<{ package: Package | null }>) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(pkg?.image_url ?? '');

    const { data, setData, post, processing, errors } = useForm<{
        name: string; tagline: string; description: string;
        price: string; price_note: string; duration: string;
        image: File | null; image_url: string; badge: string;
        features: string[]; is_featured: boolean; sort_order: number; is_active: boolean;
        _method?: string;
    }>({
        name: pkg?.name ?? '', tagline: pkg?.tagline ?? '',
        description: pkg?.description ?? '',
        price: pkg?.price ?? '', price_note: pkg?.price_note ?? 'per person',
        duration: pkg?.duration ?? '',
        image: null, image_url: pkg?.image_url ?? '', badge: pkg?.badge ?? '',
        features: pkg?.features ?? [''],
        is_featured: pkg?.is_featured ?? false,
        sort_order: pkg?.sort_order ?? 0, is_active: pkg?.is_active ?? true,
        _method: pkg ? 'PUT' : undefined,
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const addFeature = () => setData('features', [...data.features, '']);
    const updateFeature = (i: number, v: string) => { const f = [...data.features]; f[i] = v; setData('features', f); };
    const removeFeature = (i: number) => setData('features', data.features.filter((_, idx) => idx !== i));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const url = pkg ? `/admin/packages/${pkg.id}` : '/admin/packages';
        post(url, { forceFormData: true });
    };

    const inputCls = "w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors";

    return (
        <AdminLayout title={pkg ? 'Edit Package' : 'New Package'}>
            <Head title={pkg ? 'Edit Package' : 'Add Package'} />
            <div className="max-w-2xl">
                <h1 className="text-xl font-bold text-white mb-7">{pkg ? 'Edit Package' : 'Add New Package'}</h1>
                <form onSubmit={submit} className="bg-[#071510] border border-white/8 rounded-2xl p-7 space-y-5">
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Package Name *</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} required className={inputCls} />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Tagline</label>
                        <input type="text" value={data.tagline} onChange={e => setData('tagline', e.target.value)} className={inputCls} placeholder="Short memorable line" />
                    </div>
                    {/* Image Upload */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Package Image</label>
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
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} required className={`${inputCls} resize-none`} placeholder="Overview of what this package offers" />
                        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Price *</label>
                            <input type="text" value={data.price} onChange={e => setData('price', e.target.value)} required className={inputCls} placeholder="$299" />
                        </div>
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Price Note</label>
                            <input type="text" value={data.price_note} onChange={e => setData('price_note', e.target.value)} className={inputCls} placeholder="per person" />
                        </div>
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Duration *</label>
                            <input type="text" value={data.duration} onChange={e => setData('duration', e.target.value)} required className={inputCls} placeholder="2 nights / 3 days" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Badge</label>
                        <input type="text" value={data.badge} onChange={e => setData('badge', e.target.value)} className={inputCls} placeholder="Most Popular / Best Value" />
                    </div>
                    {/* Features */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-white/50 text-xs uppercase tracking-wider">What's Included *</label>
                            <button type="button" onClick={addFeature} className="text-[#d4a853] text-xs hover:underline">+ Add item</button>
                        </div>
                        {data.features.map((f, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input type="text" value={f} onChange={e => updateFeature(i, e.target.value)} required placeholder={`Item ${i + 1}`} className="flex-1 bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-2.5 text-sm outline-none" />
                                {data.features.length > 1 && (
                                    <button type="button" onClick={() => removeFeature(i)} className="text-red-400/60 hover:text-red-400 px-2">×</button>
                                )}
                            </div>
                        ))}
                        {errors.features && <p className="text-red-400 text-xs mt-1">{errors.features}</p>}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Sort Order</label>
                            <input type="number" min="0" value={data.sort_order} onChange={e => setData('sort_order', +e.target.value)} className={inputCls} />
                        </div>
                        <div className="flex items-center gap-2 pt-7">
                            <input type="checkbox" id="feat" checked={data.is_featured} onChange={e => setData('is_featured', e.target.checked)} className="accent-[#d4a853] w-4 h-4" />
                            <label htmlFor="feat" className="text-white/70 text-sm">Featured</label>
                        </div>
                        <div className="flex items-center gap-2 pt-7">
                            <input type="checkbox" id="act" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="accent-[#d4a853] w-4 h-4" />
                            <label htmlFor="act" className="text-white/70 text-sm">Active</label>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing} className="flex-1 bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3 rounded-xl text-sm">
                            {processing ? 'Saving...' : 'Save Package'}
                        </button>
                        <a href="/admin/packages" className="px-5 py-3 border border-white/10 text-white/50 hover:text-white text-sm rounded-xl text-center">Cancel</a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
