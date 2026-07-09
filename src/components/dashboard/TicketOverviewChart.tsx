"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Ticket {
  createdAt: string;
  status: string;
}

interface ChartData {
  day: string;
  created: number;
  resolved: number;
}

export default function TicketOverviewChart() {
  const [data, setData] = useState<ChartData[]>([]);

  async function loadChart() {
    const response = await fetch("/api/tickets");

    if (!response.ok) return;

    const tickets: Ticket[] = await response.json();

    const grouped: Record<
      string,
      { created: number; resolved: number }
    > = {};

    tickets.forEach((ticket) => {
      const day = new Date(ticket.createdAt).toLocaleDateString(
        "en-ZA",
        {
          month: "short",
          day: "numeric",
        }
      );

      if (!grouped[day]) {
        grouped[day] = {
          created: 0,
          resolved: 0,
        };
      }

      grouped[day].created++;

      if (ticket.status === "Resolved") {
        grouped[day].resolved++;
      }
    });

    const chartData = Object.entries(grouped).map(
      ([day, values]) => ({
        day,
        created: values.created,
        resolved: values.resolved,
      })
    );

    setData(chartData);
  }

  useEffect(() => {

    loadChart();

    const refresh = () => {

        loadChart();

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

          <h2 className="text-2xl font-black">
            Ticket Overview
          </h2>

          <p className="opacity-50">
            Created vs Resolved
          </p>

        </div>

        <span className="rounded-xl bg-[var(--surface)] px-4 py-2 text-sm">
          Live Data
        </span>

      </div>

      <div className="h-[300px]">

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="created"
              stroke="#2563EB"
              strokeWidth={3}
              name="Created"
            />

            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#10B981"
              strokeWidth={3}
              name="Resolved"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}