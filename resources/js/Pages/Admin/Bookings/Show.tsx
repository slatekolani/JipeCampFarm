import { Head, Link, router } from '@inertiajs/react';
import { PageProps, ContactMessage } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';

export default function BookingShow({ booking }: PageProps<{ booking: ContactMessage }>) {
    const del = () => {
        if (confirm('Delete this booking enquiry?')) router.delete(`/admin/bookings/${booking.id}`);
    };

    return (
        <AdminLayout title="Booking Detail">
            <Head title="Booking — Admin"/>
            <div className="mb-6 flex items-center gap-3">
                <Link href="/admin/bookings" className="text-gray-500 hover:text-white text-sm transition-colors">
                    ← Bookings
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-7 max-w-2xl">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-white font-bold text-xl">{booking.name}</h1>
                        <p className="text-gray-500 text-sm mt-1">{booking.email}{booking.phone ? ` · ${booking.phone}` : ''}</p>
                    </div>
                    <p className="text-gray-400 text-xs shrink-0">{new Date(booking.created_at).toLocaleString()}</p>
                </div>

                {booking.subject && (
                    <p className="text-[#d4a853] font-semibold text-sm mb-4">{booking.subject}</p>
                )}

                <div className="bg-white/3 border border-gray-200 rounded-xl p-5">
                    <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">{booking.message}</p>
                </div>

                <div className="flex gap-3 mt-6">
                    <a
                        href={`mailto:${booking.email}`}
                        className="bg-[#d4a853] hover:bg-[#c49640] text-[#071510] font-bold text-sm px-5 py-2.5 rounded-full transition-all"
                    >
                        Reply by Email
                    </a>
                    {booking.phone && (
                        <a
                            href={`tel:${booking.phone}`}
                            className="border border-gray-300 text-gray-600 hover:text-white hover:border-white/30 font-medium text-sm px-5 py-2.5 rounded-full transition-all"
                        >
                            Call
                        </a>
                    )}
                    <button
                        onClick={del}
                        className="ml-auto text-red-400/60 hover:text-red-400 text-sm px-4 py-2.5 rounded-full border border-red-400/15 hover:border-red-400/30 transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
