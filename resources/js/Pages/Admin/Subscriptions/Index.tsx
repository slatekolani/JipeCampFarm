import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

interface Subscription {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    type: 'sms' | 'email';
    subscriber_type: 'resident' | 'foreigner_in_tz' | 'foreigner_abroad' | null;
    created_at: string;
}

const subscriberTypeLabel: Record<string, string> = {
    resident: 'Resident',
    foreigner_in_tz: 'Foreigner in TZ',
    foreigner_abroad: 'Foreigner abroad',
};

export default function SubscriptionsIndex({ subscriptions }: PageProps<{ subscriptions: Subscription[] }>) {
    const [filter, setFilter] = useState<'all' | 'sms' | 'email'>('all');

    const del = (id: number) => { if (confirm('Remove this subscriber?')) router.delete(`/admin/subscriptions/${id}`); };

    const visible = filter === 'all' ? subscriptions : subscriptions.filter(s => s.type === filter);
    const smsCount = subscriptions.filter(s => s.type === 'sms').length;
    const emailCount = subscriptions.filter(s => s.type === 'email').length;

    return (
        <AdminLayout title="Subscriptions">
            <Head title="Subscriptions — Admin"/>
            <div className="mb-7">
                <h1 className="text-xl font-bold text-white">Subscribers</h1>
                <p className="text-gray-500 text-sm mt-0.5">
                    {subscriptions.length} total · {smsCount} SMS · {emailCount} Email
                </p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
                {(['all', 'sms', 'email'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                            filter === f
                                ? 'bg-[#d4a853]/15 text-[#d4a853] border border-[#d4a853]/30'
                                : 'text-gray-600 border border-gray-200 hover:text-white hover:border-white/25'
                        }`}
                    >
                        {f === 'all' ? `All (${subscriptions.length})` : f === 'sms' ? `SMS (${smsCount})` : `Email (${emailCount})`}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                {visible.length === 0 ? (
                    <div className="text-center py-20">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-12 h-12 text-gray-300 mx-auto mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                        </svg>
                        <p className="text-gray-500 text-sm">No subscribers yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left text-gray-500 text-xs font-medium px-5 py-3.5">Name</th>
                                    <th className="text-left text-gray-500 text-xs font-medium px-5 py-3.5">Contact</th>
                                    <th className="text-left text-gray-500 text-xs font-medium px-5 py-3.5">Type</th>
                                    <th className="text-left text-gray-500 text-xs font-medium px-5 py-3.5">Who</th>
                                    <th className="text-left text-gray-500 text-xs font-medium px-5 py-3.5">Date</th>
                                    <th className="px-5 py-3.5"/>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visible.map(s => (
                                    <tr key={s.id} className="hover:bg-white/2 transition-colors">
                                        <td className="px-5 py-3.5 text-white text-sm font-medium">{s.name}</td>
                                        <td className="px-5 py-3.5 text-gray-500 text-sm">
                                            {s.type === 'sms' ? s.phone : s.email}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                                s.type === 'sms'
                                                    ? 'bg-emerald-500/15 text-emerald-400'
                                                    : 'bg-blue-500/15 text-blue-400'
                                            }`}>
                                                {s.type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-500 text-xs">
                                            {s.subscriber_type ? subscriberTypeLabel[s.subscriber_type] : '—'}
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                                            {new Date(s.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <button
                                                onClick={() => del(s.id)}
                                                className="text-red-400/50 hover:text-red-400 text-xs px-3 py-1.5 rounded-lg bg-white/3 hover:bg-red-400/10 transition-all"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
