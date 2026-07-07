"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error ?? "Login failed.");
                setLoading(false);
                return;
            }

            router.push("/");

            router.refresh();

        } catch (error) {
            
            console.error(error);

            setError("Something went wrong.");
        } finally {

            setLoading(false);
        }
    };

    return (

        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#071D5A] via-[#2F5EFF] to-[#EC4899]">

            <form

                onSubmit={handleSubmit}

                className="w-[430px] rounded-[36px] bg-white dark:bg-slate-900 p-10 shadow-2xl"

            >

                <div className="text-center mb-10">

                    <h1 className="text-5xl font-black text-slate-900 dark:text-white">

                        SupportFlow

                    </h1>

                    <p className="mt-3 text-slate-600 dark:text-slate-300">

                        Global Software Services

                    </p>

                </div>

                <div className="space-y-5">

                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e)=>setEmail(e.target.value)}

                        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 p-4 bg-transparent"

                        required

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                        className="w-full rounded-xl border border-gray-300 dark:border-slate-700 p-4 bg-transparent"

                        required

                    />

                </div>

                {

                    error && (

                        <div className="mt-5 rounded-xl bg-red-100 text-red-600 p-3">

                            {error}

                        </div>

                    )

                }

                <button

                    type="submit"

                    disabled={loading}

                    className="mt-8 w-full rounded-xl bg-[#2F5EFF] py-4 font-bold text-white hover:opacity-90 transition"

                >

                    {

                        loading

                        ?

                        "Signing In..."

                        :

                        "Sign In"

                    }

                </button>

            </form>

        </main>

    );

}