import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verify Email — Jipe Farm Campsite" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
                <p className="text-white/45 text-sm">One more step before accessing the dashboard.</p>
            </div>

            {/* Icon */}
            <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#d4a853]/15 border border-[#d4a853]/30 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#d4a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
                Thanks for signing up! Before getting started, please verify your email address by clicking the
                link we just sent you. If you didn't receive the email, we'll send another one.
            </p>

            {status === 'verification-link-sent' && (
                <div className="mb-6 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl">
                    A new verification link has been sent to your email address.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-[#d4a853] hover:bg-[#c49640] disabled:opacity-60 disabled:cursor-not-allowed text-[#071510] font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#d4a853]/25 hover:-translate-y-0.5 text-sm tracking-wide"
                >
                    {processing ? 'Sending…' : 'Resend Verification Email'}
                </button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full block text-center text-white/40 hover:text-white/70 text-sm py-3 transition-colors"
                >
                    Sign out of this account
                </Link>
            </form>
        </GuestLayout>
    );
}
