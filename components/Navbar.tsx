"use client";
import React from 'react';
import {AuthButtons} from "@/components/AuthButtons";
import {SessionProvider} from "next-auth/react";

const Navbar = () => {
    return (
        <nav>
            <ul className="flex items-center justify-evenly p-4 text-gray-700 bg-white">
                <li>Home</li>
                <li>About</li>
                <li>
                    <SessionProvider>
                    <AuthButtons />
                    </SessionProvider>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;