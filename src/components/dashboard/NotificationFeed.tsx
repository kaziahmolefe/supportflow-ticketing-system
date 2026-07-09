"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
  ticketId: string;
  isRead: boolean;
}

export default function NotificationFeed() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const previousCount = useRef(0);

  const audio = useRef<HTMLAudioElement | null>(null);

  async function loadNotifications() {
    
    try {
      const response = await fetch("/api/notifications");

      if (!response.ok) {
        console.error(
          "Notifications:",
          response.status
        ); return;
      }

      const data: Notification[] = await response.json();

      if (
        previousCount.current > 0 &&
        data.length > previousCount.current
      ) {
        audio.current?.play().catch(() => {});
      }

      previousCount.current = data.length;

      setNotifications(data.slice(0, 5));
    } catch (error) {
      console.error(
        "loadNotifications failed",
        error
      );
    }
  }

  async function markAsRead(id: string) {
    const response = await fetch(
      `/api/notifications/${id}`,
      {
        method: "PATCH",
      }
    );

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

    
  }

  useEffect(() => {
    audio.current = new Audio("/notification.wav");

    loadNotifications();

    //const interval = setInterval(
      //loadNotifications,
      //3000
    //);

    //return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="rounded-[36px] bg-[var(--card)] p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Notifications
          </h2>

          <p className="opacity-50">
            Live updates
          </p>

        </div>

        <Link
          href="/notifications"
          className="text-pink-500 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="space-y-4">

        {notifications.length === 0 && (
          <div className="rounded-3xl bg-[var(--surface)] p-6 text-center opacity-60">
            No notifications yet.
          </div>
        )}

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className="flex items-center justify-between rounded-3xl bg-[var(--surface)] p-6 transition hover:shadow-md"
          >

            <div>

              <div className="font-semibold">
                {notification.message}
              </div>

              <div className="mt-1 text-sm opacity-50">
                {new Date(
                  notification.createdAt
                ).toLocaleString()}
              </div>

            </div>

            <div className="flex items-center gap-3">

              <Link
                href={`/tickets?id=${notification.ticketId}`}
                onClick={() =>
                  markAsRead(notification.id)
                }
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                View
              </Link>

              {!notification.isRead && (

                <button
                  onClick={() =>
                    markAsRead(notification.id)
                  }
                  className="h-3 w-3 rounded-full bg-pink-500 animate-pulse"
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