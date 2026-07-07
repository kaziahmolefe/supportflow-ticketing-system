"use client"

import { useState } from "react";
import type { Ticket } from "@/types/ticket";

interface Props {
    onClose: () => void;
    onCreate: (ticket: Ticket) => void;

}

export default function CreateTicketModal({
    onClose,
    onCreate,
}: Props) {
    const [form, setForm] = useState({
        subject: "",
        description: "",
        customerName: "",
        customerEmail: "",
        assignedTo: "",
        priority: "Medium",
        status: "Open",
        category: "",
    });

    async function handleSubmit() {
        if (!form.subject.trim()) {
            alert("Subject is required.");
            return;
        }

        if (!form.customerName.trim()) {
            alert("Customer name is required.");
            return;
        }

        const response = await fetch("/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),

        });

        if (!response.ok) {
            alert("Failed to create ticket.");
            return;
        }

        const newTicket = await response.json();

        
        onCreate(newTicket);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/40 dark:bg-white/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-black rounded-2xl w-[650px] p-8">
                <h2 className="text-2xl font-bold mb-6">
                    Create New Ticket
                </h2>

                <div className="space-y-4">
                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                subject: e.target.value
                            })
                        }
                    />

                    <textarea
                        className="w-full border rounded-lg p-3"
                        rows={4}
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                    />

                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Customer Name"
                        value={form.customerName}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                customerName: e.target.value
                            })
                        }
                    />

                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Customer Email"
                        value={form.customerEmail}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                customerEmail: e.target.value
                            })
                        }
                    />

                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Assigned To"
                        value={form.assignedTo}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                assignedTo: e.target.value
                            })
                        }
                    />

                    <input 
                        className="w-full border rounded-lg p-3"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                category: e.target.value
                            })
                        }
                    />

                    <select
                        className="w-full border rounded-lg p-3"
                        value={form.priority}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                priority: e.target.value
                            })
                        }
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        className="bg-red-300 hover:bg-red-400 text-black font-bold py-2 px-4 rounded-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handleSubmit}
                    >
                        Create Ticket
                    </button>
                </div>
            </div>
        </div>
    );
}