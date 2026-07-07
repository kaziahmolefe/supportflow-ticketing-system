"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Ticket,
  Bell,
  Users,
  Settings
} from "lucide-react"

const nav = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    href: "/tickets",
    label: "Tickets",
    icon: Ticket
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell
  },
  {
    href: "/users",
    label: "Users",
    icon: Users
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings
  }
]

export default function Sidebar() {

  return (

    <aside className="w-[260px] min-h-screen bg-[var(--sidebar)] text-white p-8">

      <div className="mb-14">

        <h1 className="text-3xl font-black">
          GSS Support
        </h1>

        <p className="text-blue-300 mt-2">
          Ticketing Platform
        </p>

      </div>

      <nav className="space-y-3">

        {nav.map((item) => {

          const Icon = item.icon

          return (

            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-white/10 transition-all duration-300"
            >

              <Icon size={18} />

              <span>
                {item.label}
              </span>

            </Link>

          )

        })}

      </nav>

    </aside>

  )

}