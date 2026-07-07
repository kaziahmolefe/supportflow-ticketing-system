"use client";

import DashboardSearch from "../dashboard/DashboardSearch";
import NotificationBell from "@/components/dashboard/NotificationBell";
import ThemeToggle from "@/components/ui/ThemeToggle";


export default function Header() {

    const session = {
        user: {
            name: "Palesa Molefe",
            role: "Support Agent"
        },
    };

    return (

        <header className="bg-[var(--card)] h-20 px-10 flex items-center justify-between shadow-sm">

            <DashboardSearch />

            <div className="flex items-center gap-6">

                <NotificationBell />

                <ThemeToggle />

                <div className="flex items-center gap-4">

                    <div className="text-right">

                        <div className="font-bold">

                            {session.user.name}

                        </div>

                        <div className="text-xs opacity-60">

                            {session.user.role}

                        </div>

                    </div>

                    <button

                        onClick={async () => {
                            
                            await fetch("/api/logout", {
                                method: "POST",
                            });
                            
                            window.location.href = "/login";
                        }}
                        

                        className="
                        w-11
                        h-11
                        rounded-full
                        bg-[var(--primary)]
                        text-white
                        font-bold
                        hover:scale-105
                        transition
                        "

                    >

                        {session.user.name.charAt(0).toUpperCase()}

                    </button>

                </div>

            </div>

        </header>

    );

}