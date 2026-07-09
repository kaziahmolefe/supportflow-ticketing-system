"use client";

import { useEffect, useMemo, useState } from "react";
import type { Ticket } from "@/types/ticket";
import EditTicketModal from "./EditTicketModal";
import CreateTicketModal from "./CreateTicketModal";
import { useSearchParams } from "next/navigation";

interface Props {
    initialTickets: Ticket[];
}

export default function TicketTable({
  initialTickets,
}: Props) {
  
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const searchParams = useSearchParams();

  const ticketId =
  searchParams.get("id");

  useEffect(() => {
    if (!ticketId) return;

    const ticket =
        tickets.find(
            t => t.id === ticketId
        );

    if(ticket){
        setSelectedTicket(ticket);
    }
  },[
    ticketId,
    tickets
  ]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
        const term = search.toLowerCase();

        return (
            ticket.subject.toLowerCase().includes(term) ||
            ticket.customerName.toLowerCase().includes(term) ||
            ticket.status.toLowerCase().includes(term) ||
            ticket.priority.toLowerCase().includes(term)
        );
    });
  }, [tickets, search]);

  async function deleteTicket(id: string) {

    const confirmed = window.confirm(
        "Are you sure you want to delete this ticket?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {

        alert("Failed to delete ticket.");

        return;

    }

    setTickets((current) =>
        current.filter((ticket) => ticket.id !== id)
    );

  }
  function priorityBadge(priority: string) {
    switch (priority) {
        case "High":
            return "bg-red-100 text-red-700";
        case "Medium":
            return "bg-yellow-100 text-yellow-700";
        case "Low":
            return "bg-green-100 text-green-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
  }

  function statusBadge(status: string) {
    switch (status) {
        case "Open":
            return "bg-pink-100 text-pink-700";
        case "In Progress":
            return "bg-blue-100 text-blue-700";
        case "Resolved":
            return "bg-purple-100 text-purple-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <main className="p-8">
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold">Tickets</h1>
                <p className="text-gray-500">Manage all your support tickets</p>
            </div>

            <button 
            onClick={() => setShowCreateModal(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
                + New Ticket
            </button>
        </div>

        <div className="mb-6">
            <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border p-3"
            />
        </div>

        <div className="overflow-hidden rounded-xl border bg-white dark:bg-black shadow-sm">
            <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-600">
                    <tr>
                        <th className="p-4 text-left">Subject</th>
                        <th className="p-4 text-left">Customer</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Priority</th>
                        <th className="p-4 text-left">Assigned To</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className="border-t hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                            <td className="p-4">{ticket.subject}</td>
                            <td className="p-4">
                                <div>{ticket.customerName}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">{ticket.customerEmail}</div>
                            </td>
                            <td className="p-4">
                                <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${statusBadge(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                            </td>
                            <td className="p-4">
                                <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${priorityBadge(ticket.priority)}`}>
                                    {ticket.priority}
                                </span>
                            </td>
                            <td className="p-4">
                                <div>{ticket.assignedTo ?? "-"}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-300"></div>
                            </td>
                            <td className="p-4">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => setSelectedTicket(ticket)}
                                        className="rounded-xl bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTicket(ticket.id)}
                                        className="rounded-xl bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                                
                            </td>
                        </tr>
                    ))}

                    {filteredTickets.length === 0 && (
                        <tr>
                            <td
                            colSpan={6}
                            className="p-4 text-center text-gray-500"
                            >
                            No tickets found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>

            <EditTicketModal
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
                onSave={(updated) => {
                    setTickets((current) =>
                        current.map((ticket) => 
                            ticket.id === updated.id ? updated : ticket
                        )
                );

                setSelectedTicket(null);
                }}
            />

            {showCreateModal && (
                <CreateTicketModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={(ticket) => {
                        setTickets((current) => [ticket, ...current]);
                    }}
                />
            )}
    </main>
  );
}  