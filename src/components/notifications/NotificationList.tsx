"use client";

import { useState } from "react";
import type { Notification } from "@prisma/client";

interface NotificationListProps {
    initialNotifications: Notification[];
}

export default function NotificationList({
    initialNotifications,
}: NotificationListProps) {
    const [notifications, setNotifications] =
        useState(initialNotifications);

    async function markAsRead(id: string) {
        const response = await fetch(`/api/notifications/${id}`, {
            method: "PATCH",
        });

        if (!response.ok) return;

        setNotifications((current) =>
            current.map((notification) =>
                notification.id === id
                    ? {
                        ...notification,
                        isRead: true,
                }
            : notification
        )
    );

    await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
    });

    setNotifications(current =>
        current.map(notification =>
            notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
    );

}

if (notifications.length === 0) {
    return (
        <div className="rounded-3xl border bg-white dark:bg-slate-900 p-10 text-center text-gray-700 dark:text-gray-300">
            You are all done Agent! No notifications yet. Check back later!
        </div>
    );
}

return (
    <div className="space-y-4">

        {notifications.map((notification) => (
            <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className="w-full rounded-3xl border bg-white dark:bg-slate-900 p-6 text-left shadow-sm transition hover:shadow-md"
            >

                <div className="flex items-start justify-between">

                    <div>

                        <h3 className="font-semibold text-pink-600">
                            {notification.message}
                        </h3>

                        <p className="mt-l text-sm text-gray-500 dark:text-gray-300">
                            {new Date(notification.createdAt).toLocaleString()}
                        </p>
                    </div>

                    {!notification.isRead && (
                        <span className="h-3 w-3 rounded-full bg-pink-500 animate-pulse" />
                    )}
                </div>

                <button
        
                    onClick={async (e) => {
                        e.stopPropagation(); 
                        await markAsRead(notification.id);
                        window.location.href=`/tickets?id=${notification.ticketId}`;
                        
                    }}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    View Ticket 
                </button>

            </div>
        ))}
    </div>
);
}
