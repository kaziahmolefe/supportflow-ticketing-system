"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Ticket {
  priority: string;
}

const COLORS = [
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#A855F7",
];

export default function TicketPriorityChart() {
  const [data, setData] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  async function loadPriorities() {
    const response = await fetch("/api/tickets");

    if (!response.ok) return;

    const tickets: Ticket[] = await response.json();

    const counts: Record<string, number> = {};

    tickets.forEach((ticket) => {
      counts[ticket.priority] =
        (counts[ticket.priority] || 0) + 1;
    });

    const chartData = Object.entries(counts).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    setData(chartData);
  }

  useEffect(() => {

    loadPriorities();

    const refresh = () => {

        loadPriorities();

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
    <div
      className="
        bg-[var(--card)]
        rounded-[28px]
        shadow-sm
        p-8
        h-[360px]
      "
    >
      <h2
        className="
          text-xl
          font-bold
          mb-6
        "
      >
        Tickets by Priority
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}