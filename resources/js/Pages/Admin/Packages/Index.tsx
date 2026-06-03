import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Package } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
export default function PackagesIndex({ packages }: PageProps<{ packages: Package[] }>) {
    const del = (id: number) => { if (confirm('Delete?')) router.delete(`/admin/packages/${id}`); };
    return (
        <AdminLayout title="Tour Packages">
            <Head title="Packages"/>
            <div className="flex items-center justify-between mb-7">
                <div><h1 className="text-xl font-bold text-white">Tour Packages</h1><p className="text-gray-500 text-sm mt-0.5">{packages.length} packages</p></div>
                <Link href="/admin/packages/create" className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-5 py-2.5 rounded-xl">+ Add Package</Link>
            </div>
            <div className="space-y-4">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white border border-gray-200 rounded-2xl flex flex-col sm:flex-row overflow-hidden">
                        <img src={pkg.image_url} alt={pkg.name} className="sm:w-36 h-28 sm:h-auto object-cover"/>
                        <div className="flex-1 p-5 flex items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    {pkg.badge && <span className="bg-[#d4a853]/20 text-[#d4a853] text-[9px] font-bold px-2 py-0.5 rounded-full">{pkg.badge}</span>}
                                    {pkg.is_featured && <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
                                </div>
                                <p className="text-white font-semibold">{pkg.name}</p>
                                <p className="text-[#d4a853] text-sm">{pkg.price} · {pkg.duration}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Link href={`/admin/packages/${pkg.id}/edit`} className="text-gray-600 hover:text-white bg-white/5 hover:bg-gray-100 text-xs px-3 py-2 rounded-lg">Edit</Link>
                                <button onClick={() => del(pkg.id)} className="text-red-400/60 hover:text-red-400 bg-white/5 text-xs px-3 py-2 rounded-lg">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {packages.length === 0 && <p className="text-center text-gray-500 py-16">No packages yet.</p>}
            </div>
        </AdminLayout>
    );
}
