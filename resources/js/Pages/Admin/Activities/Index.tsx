import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Activity } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ActivitiesIndex({ activities }: PageProps<{ activities: Activity[] }>) {
    const del = (id: number) => { if (confirm('Delete this activity?')) router.delete(`/admin/activities/${id}`); };
    return (
        <AdminLayout title="Activities">
            <Head title="Activities"/>
            <div className="flex items-center justify-between mb-7">
                <div><h1 className="text-xl font-bold text-white">Activities</h1><p className="text-gray-500 text-sm mt-0.5">{activities.length} activities</p></div>
                <Link href="/admin/activities/create" className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-5 py-2.5 rounded-xl">+ Add Activity</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {activities.map((act) => (
                    <div key={act.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                        <div className="relative h-36">
                            <img src={act.image_url} alt={act.title} className="w-full h-full object-cover"/>
                            <div className="absolute top-3 right-3 flex gap-1.5">
                                {act.is_featured && <span className="bg-[#d4a853] text-[#071510] text-[9px] font-bold px-2 py-0.5 rounded-full">Featured</span>}
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${act.is_active ? 'bg-emerald-500/80 text-white' : 'bg-white/20 text-gray-500'}`}>{act.is_active ? 'Active' : 'Hidden'}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-white font-semibold text-sm mb-1">{act.title}</p>
                            <p className="text-gray-500 text-xs line-clamp-2 mb-3">{act.description}</p>
                            <div className="flex gap-2">
                                {act.duration && <span className="bg-white/8 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">{act.duration}</span>}
                            </div>
                            <div className="flex gap-2 mt-3">
                                <Link href={`/admin/activities/${act.id}/edit`} className="flex-1 text-center text-gray-600 hover:text-white bg-white/5 hover:bg-gray-100 text-xs py-2 rounded-lg transition-all">Edit</Link>
                                <button onClick={() => del(act.id)} className="flex-1 text-center text-red-400/60 hover:text-red-400 bg-white/5 hover:bg-red-400/10 text-xs py-2 rounded-lg transition-all">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                {activities.length === 0 && <p className="col-span-3 text-center text-gray-500 py-16">No activities yet.</p>}
            </div>
        </AdminLayout>
    );
}
