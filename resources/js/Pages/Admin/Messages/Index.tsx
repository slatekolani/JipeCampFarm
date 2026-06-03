import { Head, Link, router } from '@inertiajs/react';
import { PageProps, ContactMessage } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
export default function MessagesIndex({ messages }: PageProps<{ messages: ContactMessage[] }>) {
    const del = (id: number) => { if (confirm('Delete?')) router.delete(`/admin/messages/${id}`); };
    return (
        <AdminLayout title="Messages">
            <Head title="Messages"/>
            <div className="mb-7"><h1 className="text-xl font-bold text-white">Contact Messages</h1><p className="text-gray-500 text-sm mt-0.5">{messages.filter(m => !m.is_read).length} unread</p></div>
            <div className="space-y-3">
                {messages.map((msg) => (
                    <div key={msg.id} className={`bg-white border rounded-2xl p-5 flex items-start justify-between gap-4 ${msg.is_read ? 'border-gray-200' : 'border-[#d4a853]/30'}`}>
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${msg.is_read ? 'bg-white/15' : 'bg-[#d4a853]'}`}/>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <p className={`font-semibold text-sm ${msg.is_read ? 'text-gray-600' : 'text-white'}`}>{msg.name}</p>
                                    <p className="text-gray-500 text-xs">{msg.email}</p>
                                    {msg.phone && <p className="text-gray-400 text-xs">{msg.phone}</p>}
                                    <p className="text-gray-400 text-xs ml-auto">{new Date(msg.created_at).toLocaleString()}</p>
                                </div>
                                {msg.subject && <p className="text-[#d4a853] text-xs mb-1">{msg.subject}</p>}
                                <p className="text-gray-600 text-sm line-clamp-2">{msg.message}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <Link href={`/admin/messages/${msg.id}`} className="text-gray-600 hover:text-white bg-white/5 text-xs px-3 py-2 rounded-lg">Read</Link>
                            <button onClick={() => del(msg.id)} className="text-red-400/60 hover:text-red-400 bg-white/5 text-xs px-3 py-2 rounded-lg">Delete</button>
                        </div>
                    </div>
                ))}
                {messages.length === 0 && <p className="text-center text-gray-500 py-16">No messages yet.</p>}
            </div>
        </AdminLayout>
    );
}
