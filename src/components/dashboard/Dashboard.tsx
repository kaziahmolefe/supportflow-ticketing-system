"use client";

import { motion } from "framer-motion";


import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

import KPIGrid from "./KPIGrid";
import TicketOverviewChart from "./TicketOverviewChart";
import TicketCategoryChart from "./TicketCategoryChart";
import RecentTickets from "./RecentTickets";
import RecentActivity from "./RecentActivity";

import SatisfactionCard from "./SatisfactionCard";
import TicketPriorityChart from "./TicketPriorityChart";
import AgentStats from "./AgentStats";
import NotificationFeed from "./NotificationFeed";


export default function Dashboard() {

  return (
    <div
      className="
        flex
        min-h-screen
        bg-[var(--bg)]
      "
    >
      <Sidebar />

      <div className="flex-1">

        <Header />

        <motion.main
          className="p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Dashboard Header */}

          <div className="mb-8 flex items-start justify-between">

            <div>

              <h1 className="text-5xl font-black">
                Dashboard
              </h1>

              <p className="opacity-60">
                Welcome back Support Agent! Here's what's happening with your support tickets today.
              </p>

            </div>

            

          </div>

          {/* KPI Cards */}

          <KPIGrid />

          {/* Overview + Activity */}

          <div className="grid grid-cols-[2fr_1fr] gap-6 mt-8">

            <TicketOverviewChart />

            <RecentActivity />

          </div>

          {/* Tickets + Categories */}

          <div className="grid grid-cols-[2fr_1fr] gap-6 mt-8">

            <RecentTickets />

            <TicketCategoryChart />

          </div>

          {/* Priority */}

          <div className="mt-8">

            <TicketPriorityChart />

          </div>

          {/* Agent Stats + Satisfaction */}

          <div className="grid grid-cols-[2fr_1fr] gap-6 mt-8">

            <AgentStats />

            <SatisfactionCard />

          </div>

          {/* Notification Feed */}

          <div className="mt-8">

            <NotificationFeed />

          </div>

        </motion.main>

      </div>

    </div>
  );
}
