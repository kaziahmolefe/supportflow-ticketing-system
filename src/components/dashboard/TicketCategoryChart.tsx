"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Ticket {
  category: string;
}

const COLORS = [
  "#2F5EFF",
  "#10B981",
  "#FB923C",
  "#EC4899",
  "#A855F7",
  "#EF4444",
];

export default function TicketCategoryChart() {
  const [data, setData] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  async function loadCategories() {
    const response = await fetch("/api/tickets");

    if (!response.ok) return;

    const tickets: Ticket[] = await response.json();

    const counts: Record<string, number> = {};

    tickets.forEach((ticket) => {
      counts[ticket.category] =
        (counts[ticket.category] || 0) + 1;
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

    loadCategories();

    const refresh = () => {

        loadCategories();

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

      <h2 className="mb-8 text-2xl font-black">
        Tickets by Category
      </h2>

      <div className="h-[300px]">

        <ResponsiveContainer width="100%" height={350}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
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

    </div>
  );
}