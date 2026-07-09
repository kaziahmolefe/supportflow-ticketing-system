"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
}

export default function RecentTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  async function loadTickets() {
    const response = await fetch("/api/tickets");

    if (!response.ok) return;

    const data = await response.json();

    setTickets(data.slice(0, 5));
  }

  useEffect(() => {

    loadTickets();

    const refresh = () => {

        loadTickets();

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

  function statusClass(status: string) {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-700";

      case "In Progress":
        return "bg-yellow-100 text-yellow-700";

      case "Resolved":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function priorityClass(priority: string) {
    switch (priority) {
      case "High":
        return "text-red-500";

      case "Medium":
        return "text-yellow-500";

      default:
        return "text-green-500";
    }
  }

  return (
    <div className="rounded-[36px] bg-[var(--card)] p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Recent Tickets
          </h2>

          <p className="opacity-50">
            Latest support requests
          </p>

        </div>

        <Link
          href="/tickets"
          className="text-pink-500 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="mb-4 grid grid-cols-5 font-semibold opacity-60">

        <div>ID</div>

        <div>Subject</div>

        <div>Status</div>

        <div>Priority</div>

        <div>Action</div>

      </div>

      <div className="space-y-4">

        {tickets.length === 0 && (
          <div className="rounded-3xl bg-[var(--surface)] p-6 text-center opacity-60">
            No tickets found.
          </div>
        )}

        {tickets.map((ticket) => (

          <div
            key={ticket.id}
            className="grid grid-cols-5 items-center rounded-3xl bg-[var(--surface)] p-6 transition hover:scale-[1.01] hover:shadow-lg"
          >

            <div className="font-bold">
              #{ticket.id.slice(-6).toUpperCase()}
            </div>

            <div>
              {ticket.subject}
            </div>

            <div>

              <span
                className={`rounded-full px-3 py-2 text-sm ${statusClass(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>

            </div>

            <div
              className={`font-bold ${priorityClass(
                ticket.priority
              )}`}
            >
              {ticket.priority}
            </div>

            <div>

              <Link
                href={`/tickets?id=$#{ticket.id.slice(-6).toUpperCase()}`}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
              >
                View
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}