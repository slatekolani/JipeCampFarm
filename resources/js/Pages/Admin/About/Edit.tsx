import { FormEventHandler, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { PageProps, AboutSection } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AboutEdit({ about }: PageProps<{ about: AboutSection | null }>) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(about?.image_url ?? '');

    const { data, setData, post, processing, errors } = useForm<{
        heading: string; subheading: string; body: string; body_secondary: string;
        image: File | null; image_url: string;
        stats: { value: string; label: string }[];
        features: string[];
        is_active: boolean;
        _method: string;
    }>({
        heading: about?.heading ?? '', subheading: about?.subheading ?? '',
        body: about?.body ?? '', body_secondary: about?.body_secondary ?? '',
        image: null, image_url: about?.image_url ?? '',
        stats: about?.stats ?? [
            { value: '', label: '' }, { value: '', label: '' },
            { value: '', label: '' }, { value: '', label: '' },
        ],
        features: about?.features ?? [''],
        is_active: about?.is_active ?? true,
        _method: 'PUT',
    });

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const updateStat = (i: number, k: 'value' | 'label', v: string) => {
        const s = [...data.stats]; s[i] = { ...s[i]!, [k]: v }; setData('stats', s);
    };
    const updateFeature = (i: number, v: string) => {
        const f = [...data.features]; f[i] = v; setData('features', f);
    };
    const addFeature = () => setData('features', [...data.features, '']);
    const removeFeature = (i: number) => setData('features', data.features.filter((_, idx) => idx !== i));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/about', { forceFormData: true });
    };

    const inputCls = "w-full bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors";

    return (
        <AdminLayout title="About Section">
            <Head title="Edit About Section" />
            <div className="max-w-2xl">
                <h1 className="text-xl font-bold text-white mb-7">Edit About Section</h1>
                <form onSubmit={submit} className="bg-[#071510] border border-white/8 rounded-2xl p-7 space-y-6">
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Heading *</label>
                        <input type="text" value={data.heading} onChange={e => setData('heading', e.target.value)} required className={inputCls} />
                        {errors.heading && <p className="text-red-400 text-xs mt-1">{errors.heading}</p>}
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Subheading</label>
                        <input type="text" value={data.subheading} onChange={e => setData('subheading', e.target.value)} className={inputCls} />
                    </div>
                    {/* About Image Upload */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">About Image</label>
                        {preview && (
                            <div className="relative mb-3 group">
                                <img src={preview} alt="Preview" className="w-full h-52 object-cover rounded-xl border border-white/10" />
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
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Main Body *</label>
                        <textarea value={data.body} onChange={e => setData('body', e.target.value)} rows={5} required className={`${inputCls} resize-none`} />
                        {errors.body && <p className="text-red-400 text-xs mt-1">{errors.body}</p>}
                    </div>
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Secondary Body</label>
                        <textarea value={data.body_secondary} onChange={e => setData('body_secondary', e.target.value)} rows={4} className={`${inputCls} resize-none`} />
                    </div>
                    {/* Stats */}
                    <div>
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-3">Key Stats</label>
                        <div className="grid grid-cols-2 gap-3">
                            {data.stats.map((s, i) => (
                                <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-3">
                                    <input type="text" placeholder="Value (e.g. 6+)" value={s?.value ?? ''} onChange={e => updateStat(i, 'value', e.target.value)} className="w-full bg-transparent text-white text-sm outline-none placeholder-white/25 mb-1" />
                                    <input type="text" placeholder="Label (e.g. Activities)" value={s?.label ?? ''} onChange={e => updateStat(i, 'label', e.target.value)} className="w-full bg-transparent text-white/60 text-sm outline-none placeholder-white/25" />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Features */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-white/50 text-xs uppercase tracking-wider">Key Features List</label>
                            <button type="button" onClick={addFeature} className="text-[#d4a853] text-xs hover:underline">+ Add</button>
                        </div>
                        {data.features.map((f, i) => (
                            <div key={i} className="flex gap-2 mb-2">
                                <input type="text" value={f} onChange={e => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="flex-1 bg-white/5 border border-white/10 focus:border-[#d4a853]/60 text-white rounded-xl px-4 py-2.5 text-sm outline-none" />
                                <button type="button" onClick={() => removeFeature(i)} className="text-red-400/60 hover:text-red-400 px-2">×</button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="accent-[#d4a853] w-4 h-4" id="active" />
                        <label htmlFor="active" className="text-white/70 text-sm">Active</label>
                    </div>
                    <button type="submit" disabled={processing} className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 text-[#071510] font-bold py-3 rounded-xl text-sm">
                        {processing ? 'Saving...' : 'Save About Section'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
