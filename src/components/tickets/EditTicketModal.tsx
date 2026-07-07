"use client";

import { useEffect, useState} from "react";
import type { Ticket} from "@/types/ticket";


interface Props {
    ticket: Ticket | null;
    onClose: () => void;
    onSave: (ticket: Ticket) => void;
}

export default function EditTicketModal({
    ticket,
    onClose,
    onSave,
}: Props) {
    const [form, setForm] = useState<Ticket | null>(ticket);

    useEffect(() => {
        setForm(ticket);
    }, [ticket]);

    if (!form) return null;

    const handleSubmit = async () => {
        if (!form.subject.trim()) {
            alert("Subject is required.");
            return;
        }

        if (!form.customerName.trim()) {
            alert("Customer name is required.");
            return;
        }


        const response = await fetch(`/api/tickets/${form.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            alert("Failed to update ticket.");
            return;
        }

        const updated = await response.json();
        
        onSave(updated);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 dark:bg-white/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-black rounded-2xl w-[600px] p-8">
                <h2 className="text-2xl font-bold mb-6">
                    Edit Ticket
                </h2>

                <div className="space-y-4">

                <input
                    className="w-full border rounded-lg p-3"
                    value={form.subject}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            subject: e.target.value,
                        })
                    }
                />

                <textarea
                    className="w-full border rounded-lg p-3"
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
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
                            customerName: e.target.value,
                        })
                    }
                />

                <input
                    className="w-full border rounded-1g p-3"
                    placeholder="Assigned Agent"
                    value={form.assignedTo ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            assignedTo: e.target.value,
                        })
                    }
                />

                <input 
                    className="w-full border rounded-1g p-3"
                    placeholder="Category"
                    value={form.category ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            category: e.target.value,
                        })
                    }
                />

                <select
                    className="w-full border rounded-lg p-3"
                    value={form.priority}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            priority: e.target.value,
                        })
                    }
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <select
                    className="w-full border rounded-lg p-3"
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value,
                        })
                    }

                >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                <button
                    onClick={onClose}
                    className="px-5 py-2 border rounded-lg"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Save Changes
                </button>
                </div>
            </div>
        </div>
    );
}