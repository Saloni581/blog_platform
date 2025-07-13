"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function AuthButtons() {
    const { data: session } = useSession();

    if (!session) {
        return <Link href="/login" className="text-blue-600">Login</Link>;
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-700">Hi, {session.user?.email}</span>
            <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-3 py-1 rounded"
            >
                Logout
            </button>
        </div>
    );
}
