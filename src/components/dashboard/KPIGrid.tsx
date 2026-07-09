"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Ticket {
  id: string;
  status: string;
}

export default function KPIGrid() {
  const [cards, setCards] = useState([
    {
      value: "0",
      label: "Total Tickets",
      icon: "📊",
      change: "Loading...",
    },
    {
      value: "0",
      label: "Open",
      icon: "📂",
      change: "Loading...",
    },
    {
      value: "0",
      label: "Active",
      icon: "⚡",
      change: "Loading...",
    },
    {
      value: "0",
      label: "Resolved",
      icon: "✓",
      change: "Loading...",
    },
  ]);

  async function loadKPIs() {
    const response = await fetch("/api/tickets");

    if (!response.ok) return;

    const tickets: Ticket[] = await response.json();

    const total = tickets.length;

    const open = tickets.filter(
      (ticket) => ticket.status === "Open"
    ).length;

    const active = tickets.filter(
      (ticket) => ticket.status === "In Progress"
    ).length;

    const resolved = tickets.filter(
      (ticket) => ticket.status === "Resolved"
    ).length;

    setCards([
      {
        value: total.toString(),
        label: "Total Tickets",
        icon: "📊",
        change: "Live",
      },
      {
        value: open.toString(),
        label: "Open",
        icon: "📂",
        change: "Live",
      },
      {
        value: active.toString(),
        label: "Active",
        icon: "⚡",
        change: "Live",
      },
      {
        value: resolved.toString(),
        label: "Resolved",
        icon: "✓",
        change: "Live",
      },
    ]);
  }

  useEffect(() => {

    loadKPIs();

    const refresh = () => {

        loadKPIs();

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
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card) => (

        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="rounded-[32px] border border-white/40 bg-gradient-to-br from-white to-blue-50 p-8 shadow-sm dark:from-[#5f78cc] dark:to-[#9c1b6b]"
        >
          <div className="flex justify-between">

            <div>

              <div className="text-5xl font-black text-[var(--primary)]">
                {card.value}
              </div>

              <div className="mt-2 opacity-70">
                {card.label}
              </div>

            </div>

            <div className="text-4xl">
              {card.icon}
            </div>

          </div>

          <div className="mt-8">

            <span className="rounded-full bg-pink-100 px-4 py-2 text-sm text-pink-500">
              {card.change}
            </span>

          </div>

        </motion.div>

      ))}

    </div>
  );
}