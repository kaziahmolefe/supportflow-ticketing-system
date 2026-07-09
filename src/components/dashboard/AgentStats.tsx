"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  CheckCircle2,
  Ticket,
  Star,
} from "lucide-react";

interface TicketType {
  status: string;
}

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

export default function AgentStats() {
  const [cards, setCards] = useState<StatCard[]>([]);

  async function loadStats() {
    const response = await fetch("/api/tickets");

    if (!response.ok) return;

    const tickets: TicketType[] = await response.json();

    const total = tickets.length;

    const resolved = tickets.filter(
      (ticket) => ticket.status === "Resolved"
    ).length;

    const open = tickets.filter(
      (ticket) => ticket.status === "Open"
    ).length;

    const resolutionRate =
      total === 0
        ? 0
        : Math.round((resolved / total) * 100);

    setCards([
      {
        title: "Open Tickets",
        value: open.toString(),
        description: "Currently awaiting action",
        icon: Ticket,
      },
      {
        title: "Resolved",
        value: resolved.toString(),
        description: "Successfully completed",
        icon: CheckCircle2,
      },
      {
        title: "Resolution Rate",
        value: `${resolutionRate}%`,
        description: "Overall performance",
        icon: Star,
      },
      {
        title: "Avg Response",
        value: "< 2 hrs",
        description: "Target SLA",
        icon: Clock3,
      },
    ]);
  }

  useEffect(() => {

    loadStats();

    const refresh = () => {

        loadStats();

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
    <div className="rounded-[36px] bg-gradient-to-r from-[#071D5A] to-[#2F5EFF] p-8 text-white">

      <div>

        <h2 className="text-3xl font-black">
          Support Agent Stats
        </h2>

        <p className="opacity-70">
          Live performance overview
        </p>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white p-6 text-slate-900 shadow-lg"
            >

              <div className="mb-5 flex items-center justify-between">

                <Icon
                  size={34}
                  className="text-blue-600"
                />

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Live
                </span>

              </div>

              <h3 className="text-sm font-semibold text-slate-500">
                {card.title}
              </h3>

              <div className="mt-2 text-4xl font-black">
                {card.value}
              </div>

              <p className="mt-3 text-sm text-slate-500">
                {card.description}
              </p>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
}