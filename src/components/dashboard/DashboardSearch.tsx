"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Ticket {
  id: string;
  subject: string;
  customerName: string;
  status: string;
}

export default function DashboardSearch() {
  const [query, setQuery] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [results, setResults] = useState<Ticket[]>([]);

  useEffect(() => {
    async function loadTickets() {
      const response = await fetch("/api/tickets");

      if (!response.ok) return;

      const data = await response.json();
      setTickets(data);
    }

    loadTickets();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const value = query.toLowerCase();

    setResults(
      tickets
        .filter(
          (ticket) =>
            ticket.subject.toLowerCase().includes(value) ||
            ticket.customerName.toLowerCase().includes(value) ||
            ticket.status.toLowerCase().includes(value)
        )
        .slice(0, 5)
    );
  }, [query, tickets]);

  return (
    <div className="relative w-[380px]">

      <div className="flex items-center rounded-2xl bg-[var(--surface)] px-4">

        <Search size={18} className="opacity-50" />

        <input
          type="text"
          placeholder="Search tickets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent px-3 py-3 outline-none"
        />

      </div>

      {results.length > 0 && (

        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border bg-[var(--card)] shadow-xl">

          {results.map((ticket) => (

            <Link
              key={ticket.id}
              href={`/tickets?id=${ticket.id}`}
              className="block border-b p-4 transition hover:bg-[var(--surface)]"
            >

              <div className="font-semibold">
                {ticket.subject}
              </div>

              <div className="text-sm opacity-60">
                {ticket.customerName}
              </div>

              <span className="mt-2 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs text-pink-600">
                {ticket.status}
              </span>

            </Link>

          ))}

        </div>

      )}

    </div>
  );
}