"use client"

import {signIn, useSession} from "next-auth/react";
import {findUser} from "@/app/api/list";
import {useEffect} from "react";

export default function Home() {
    const {data: session} = useSession()

    useEffect(() => {
        const fetchUser = async () => {
            if (session) {
                await findUser(session.user?.name, session.user?.email);
            }
        }
        fetchUser()
    }, [session]);

    return (
        <>
            {session ? (
                <main className='max-w-4xl mx-auto mt-4'>
                    <div className='text-center my-5 flex flex-col gap-4'>
                        <h1 className="text-3xl text-white-500 font-bold">
                            Welcome back, {session.user?.name}
                        </h1>
                    </div>
                </main>
            ) : (
                <main className='max-w-4xl mx-auto mt-4'>
                    <div className="flex justify-center">
                        <div className="card w-96 bg-base-100 shadow-xl mt-20 mb-20">
                            <div className="card-body">
                                <h2 className="card-title">Welcome to Smart Grocery List App.</h2>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => signIn("github")}
                                        className="btn btn-primary w-full">Sign in with GitHub
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )
            }
        </>
    );
}
