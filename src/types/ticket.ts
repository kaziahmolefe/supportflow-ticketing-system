export interface Ticket {
  id: string;
  subject: string;
  description: string;
  customerName: string;
  customerEmail: string;
  assignedTo: string | null;
  priority: string;
  status: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}