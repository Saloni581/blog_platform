"use client";
import React from 'react';
import {AuthButtons} from "@/components/AuthButtons";
import {SessionProvider} from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <div className="flex items-center justify-evenly p-4 text-gray-700 bg-white">
                <Link href="/">Read Blogs</Link>
                <Link href="/blog/new">Post a Blog</Link>
                <li>
                    <SessionProvider>
                    <AuthButtons />
                    </SessionProvider>
                </li>
            </div>
        </nav>
    );
};

export default Navbar;