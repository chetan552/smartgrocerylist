'use client';

import React from 'react';
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";

const Header: React.FC = () => {
    const { data: session } = useSession()

    return (
        <>
            {session ? (
                <header className="w-full bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
                    <h1 className="text-xl font-bold"><Link href={"/"}>
                        Smart Grocery List
                    </Link></h1>
                    <div className="text-sm">
                        {session.user?.email}
                        <button
                            onClick={() => signOut()}
                            className="btn btn-sm ml-2"
                        >Sign Out
                        </button>
                    </div>
                </header>
                ) : <></>
            }
        </>
    );
};

export default Header;
