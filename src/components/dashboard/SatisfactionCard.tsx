"use client";

import { useEffect, useState } from "react";

interface Ticket {
  status: string;
}

export default function SatisfactionCard() {
  const [satisfaction, setSatisfaction] = useState(0);

  async function loadSatisfaction() {
    const response = await fetch("/api/tickets");

    if (!response.ok) return;

    const tickets: Ticket[] = await response.json();

    const total = tickets.length;

    const resolved = tickets.filter(
      (ticket) => ticket.status === "Resolved"
    ).length;

    if (total === 0) {
      setSatisfaction(0);
      return;
    }

    const percentage = Math.round((resolved / total) * 100);

    setSatisfaction(percentage);
  }

  useEffect(() => {

    loadSatisfaction();

    const source = new EventSource("/api/events");

    source.addEventListener(
      "notification-created",
      loadSatisfaction
    );

    return () => {

      source.close();

    };

  }, []);

  function getStatus() {
    if (satisfaction >= 90) return "Excellent ⭐";
    if (satisfaction >= 75) return "Good 👍";
    if (satisfaction >= 60) return "Fair 🙂";
    return "Needs Attention ⚠️";
  }

  function getColour() {
    if (satisfaction >= 90) return "text-green-500";
    if (satisfaction >= 75) return "text-blue-500";
    if (satisfaction >= 60) return "text-yellow-500";
    return "text-red-500";
  }

  return (
    <div className="rounded-[36px] bg-[var(--card)] p-8 shadow-sm">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-black">
          Satisfaction Rate
        </h2>

        <span className="rounded-xl bg-[var(--surface)] px-4 py-2 text-sm">
          Live
        </span>

      </div>

      <div className="mt-10 flex justify-center">

        <div className="text-center">

          <div
            className={`text-7xl font-black ${getColour()}`}
          >
            {satisfaction}%
          </div>

          <div className="mt-4 text-lg font-semibold">
            {getStatus()}
          </div>

          <p className="mt-2 text-sm opacity-60">
            Based on resolved tickets
          </p>

        </div>

      </div>

    </div>
  );
}