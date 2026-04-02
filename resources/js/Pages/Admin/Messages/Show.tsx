import { Head, Link } from '@inertiajs/react';
import { PageProps, ContactMessage } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
export default function MessageShow({ message }: PageProps<{ message: ContactMessage }>) {
    return (
        <AdminLayout title="Message">
            <Head title="View Message"/>
            <div className="max-w-xl">
                <Link href="/admin/messages" className="text-white/40 hover:text-white text-sm mb-6 inline-flex items-center gap-1.5">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd"/></svg>
                    Back to Messages
                </Link>
                <div className="bg-[#071510] border border-white/8 rounded-2xl p-7">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h1 className="text-white font-bold text-xl">{message.name}</h1>
                            <p className="text-white/40 text-sm">{message.email}{message.phone ? ` · ${message.phone}` : ''}</p>
                        </div>
                        <p className="text-white/30 text-xs">{new Date(message.created_at).toLocaleString()}</p>
                    </div>
                    {message.subject && <div className="mb-4 pb-4 border-b border-white/8"><p className="text-white/40 text-xs uppercase tracking-wider mb-1">Subject</p><p className="text-[#d4a853] font-semibold">{message.subject}</p></div>}
                    <div><p className="text-white/40 text-xs uppercase tracking-wider mb-3">Message</p><p className="text-white/80 leading-relaxed whitespace-pre-wrap">{message.message}</p></div>
                </div>
            </div>
        </AdminLayout>
    );
}
