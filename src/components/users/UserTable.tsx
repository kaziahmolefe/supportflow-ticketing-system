"use client";

import { UseRenderState } from "framer-motion";
import { useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date | string;
}

interface Props {
    initialUsers: User[];
}

export default function UserTable({ initialUsers }: Props) {
    const [users, setUsers] = useState<User[]>(initialUsers);

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "Agent",
    });

    async function createUser() {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            alert("Failed to create user.");
            return;
        }

        const user: User = await response.json();

        setUsers((current) => [user, ...current]);

        setForm({
            name: "",
            email: "",
            role: "Agent",
        });
    }

    async function deleteUser(id: string) {
        if (!confirm("Delete this user?")) return;

        const response = await fetch(`/api/users/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            alert("Failed to delete user.");
            return;
        }

        setUsers((current) => current.filter((user) => user.id !== id));
    }

    return (
        <div className="space-y-8">

            <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

                <h2 className="mb-6 text-2xl font-bold">
                    Add User 
                </h2>

                <div className="grid gap-4 md:grid-cols-4">

                    <input
                        className="rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                    />

                    <input
                        className="rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                    />

                    <select
                        className="rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                        value={form.role}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                role: e.target.value,
                            })
                        }
                    >
                        <option>Agent</option>
                        <option>Admin</option>
                    </select>

                    <button
                        onClick={createUser}
                        className="rounded-xl bg-blue-600 px-3 font-semibold text-white hover:bg-blue-700"
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">

                <table className="w-full">

                    <thead className="bg-slate-100 dark:bg-slate-800">

                        <tr>

                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Created</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-t dark:border-slate-700"
                            >

                                <td className="p-4">
                                    {user.name}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                            user.role === "Admin"
                                            ? "bg-purpler-100 text-purpler-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>

                                <td className="p-4 text-center">

                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}