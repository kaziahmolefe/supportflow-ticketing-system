"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Notification {
    id: string;
    message: string;
    ticketId: string;
    isRead: boolean;
    createdAt: string;
}

export default function RecentActivity() {
    const [activity, setActivity] = useState<Notification[]>([]);

    async function loadActivity() {
        const response = await fetch("/api/notifications");

        if (!response.ok) return;

        const data = await response.json();

        setActivity(data.slice(0, 5));
    }

    useEffect(() => {
        loadActivity();

        const refresh = () => {
            loadActivity();
        };

        const source = new EventSource("/api/events");

    source.addEventListener(
        "ticket-created",
        refresh
    );

    source.addEventListener(
        "ticket-updated",
        refresh
    );

    source.addEventListener(
        "ticket-deleted",
        refresh
    );

        return () => {

            source.close();
        };
    }, []);

    async function markAsRead(id: string) {
        await fetch(`/api/notifications/${id}`, {
            method: "PATCH",
        });

        setActivity((current) =>
        current.map((notification) =>
        notification.id === id
            ? {
                ...notification,
                isRead: true,
            }
            : notification
        )
    );

    }

    return (
        <div className="rounded-[36px] g-[var(--card)] p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">

                <h2 className="text-2xl font-black">
                    Recent Activity
                </h2>

                <Link
                    href="/notifications"
                    className="text-pink-500 hover:underline"
                >
                    View All
                </Link>
            </div>

            <div className="space-y-5">

                {activity.length === 0 && (
                    <div className="rounded-2xl bg-[var(--surface)] p-5 text-center opacity-60">
                        No recent activity.
                    </div>
                )}

                {activity.map((notification) => (

                    <div
                        key={notification.id}
                        className="flex items-center justify-between rounded-2xl bg-[var(--surface)] p-5"
                    >

                        <div>

                            <div className="font-semibold">
                                {notification.message}
                            </div>

                            <div className="text-sm opacity-50">
                                {new Date(
                                    notification.createdAt
                                ).toLocaleString()}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">

                            <Link
                                href={`/tickets?id=${notification.ticketId}`}
                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                View
                            </Link>

                            {!notification.isRead && (
                                <button
                                    onClick={() =>
                                    markAsRead(notification.id)
                                }
                                    className="h-3 w-3 rounded-full bg-pink-500 transition hover:scale-125"
                                    title="Mark as read"
                                />

                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}