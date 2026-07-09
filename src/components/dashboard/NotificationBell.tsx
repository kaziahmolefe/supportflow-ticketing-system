"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Notification {
    id: string;
    message: string;
    isRead: boolean;
    ticketId: string;
    createdAt: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const previousCount = useRef(0);

    async function loadNotifications() {
        const response = await fetch("/api/notifications");

        if (!response.ok) return;

        const data: Notification[] = await response.json();

        if (data.length > previousCount.current) {
            const audio = new Audio("?notification.wav");
            audio.volume = 0.4;
            audio.play().catch(() => {});
        }

        previousCount.current = data.length;
        setNotifications(data);
    }

    useEffect(() => {

        loadNotifications();

        const refresh = () => {

            loadNotifications();

        };

        window.addEventListener(
            "dashboard-refresh",
            refresh
        );

        return () => {

            window.removeEventListener(
                "dashboard-refresh",
                refresh
            );

        };

        }, []);

    const unread = notifications.filter((n) => !n.isRead).length;

    return (
        <Link
            href="/notifications"
            className="relative flex items-center justify-center"
        >
            <Bell
                size={24}
                className="transition hover:scale-110"
            />

            {unread > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {unread}
                </span>
            )}
        </Link>
    );
}
