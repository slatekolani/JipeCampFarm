import { Head, Link, router } from '@inertiajs/react';
import { PageProps, ContactMessage } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function BookingsIndex({ bookings }: PageProps<{ bookings: ContactMessage[] }>) {
    const del = (id: number) => { if (confirm('Delete this booking enquiry?')) router.delete(`/admin/bookings/${id}`); };

    const unread = bookings.filter(b => !b.is_read).length;

    const typeLabel = (subject: string | null) => {
        if (!subject) return null;
        if (subject.startsWith('Booking Enquiry')) return { label: 'Package', color: 'bg-blue-500/15 text-blue-400' };
        if (subject.startsWith('Activity Booking')) return { label: 'Activity', color: 'bg-emerald-500/15 text-emerald-400' };
        return null;
    };

    return (
        <AdminLayout title="Bookings">
            <Head title="Bookings — Admin"/>
            <div className="mb-7">
                <h1 className="text-xl font-bold text-white">Booking Enquiries</h1>
                <p className="text-white/40 text-sm mt-0.5">
                    {bookings.length} total · {unread} unread
                </p>
            </div>

            <div className="space-y-3">
                {bookings.map((b) => {
                    const tag = typeLabel(b.subject);
                    return (
                        <div
                            key={b.id}
                            className={`bg-[#071510] border rounded-2xl p-5 flex items-start justify-between gap-4 ${
                                b.is_read ? 'border-white/8' : 'border-[#d4a853]/30'
                            }`}
                        >
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${b.is_read ? 'bg-white/15' : 'bg-[#d4a853]'}`}/>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <p className={`font-semibold text-sm ${b.is_read ? 'text-white/70' : 'text-white'}`}>{b.name}</p>
                                        <p className="text-white/40 text-xs">{b.email}</p>
                                        {b.phone && <p className="text-white/30 text-xs">{b.phone}</p>}
                                        {tag && (
                                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tag.color}`}>{tag.label}</span>
                                        )}
                                        <p className="text-white/30 text-xs ml-auto">{new Date(b.created_at).toLocaleString()}</p>
                                    </div>
                                    {b.subject && <p className="text-[#d4a853] text-xs mb-1">{b.subject}</p>}
                                    <p className="text-white/50 text-sm line-clamp-2 whitespace-pre-line">{b.message}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Link
                                    href={`/admin/bookings/${b.id}`}
                                    className="text-white/50 hover:text-white bg-white/5 text-xs px-3 py-2 rounded-lg transition-colors"
                                >
                                    View
                                </Link>
                                <button
                                    onClick={() => del(b.id)}
                                    className="text-red-400/60 hover:text-red-400 bg-white/5 text-xs px-3 py-2 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
                {bookings.length === 0 && (
                    <div className="text-center py-20">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-12 h-12 text-white/15 mx-auto mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/>
                        </svg>
                        <p className="text-white/40 text-sm">No booking enquiries yet.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
