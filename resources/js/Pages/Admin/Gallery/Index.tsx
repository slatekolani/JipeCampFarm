import { Head, Link, router } from '@inertiajs/react';
import { PageProps, GalleryImage } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
export default function GalleryIndex({ images }: PageProps<{ images: GalleryImage[] }>) {
    const del = (id: number) => { if (confirm('Delete?')) router.delete(`/admin/gallery/${id}`); };
    return (
        <AdminLayout title="Gallery">
            <Head title="Gallery"/>
            <div className="flex items-center justify-between mb-7">
                <div><h1 className="text-xl font-bold text-white">Gallery</h1><p className="text-gray-500 text-sm mt-0.5">{images.length} images</p></div>
                <Link href="/admin/gallery/create" className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-5 py-2.5 rounded-xl">+ Add Image</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((img) => (
                    <div key={img.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden group">
                        <div className="relative h-36">
                            <img src={img.image_url} alt={img.title} className="w-full h-full object-cover"/>
                            <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${img.is_active ? 'bg-emerald-500/80 text-white' : 'bg-white/20 text-gray-500'}`}>{img.is_active ? '●' : '○'}</span>
                        </div>
                        <div className="p-4">
                            <p className="text-white text-sm font-medium truncate">{img.title}</p>
                            <p className="text-[#d4a853] text-xs mt-0.5">{img.category}</p>
                            {img.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{img.description}</p>}
                            <div className="flex gap-2 mt-3">
                                <Link href={`/admin/gallery/${img.id}/edit`} className="flex-1 text-center text-gray-600 hover:text-white bg-white/5 text-xs py-1.5 rounded-lg">Edit</Link>
                                <button onClick={() => del(img.id)} className="flex-1 text-center text-red-400/60 hover:text-red-400 bg-white/5 text-xs py-1.5 rounded-lg">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {images.length === 0 && <p className="col-span-4 text-center text-gray-500 py-16">No images yet.</p>}
            </div>
        </AdminLayout>
    );
}
