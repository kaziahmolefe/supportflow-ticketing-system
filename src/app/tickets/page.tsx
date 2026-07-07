import { Suspense } from "react";
import TicketTable from "@/components/tickets/TicketTable";
import { prisma } from "@/lib/prisma";


export default async function TicketsPage() {
  
  const tickets = await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedTickets = tickets.map(ticket => ({
    ...ticket,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  }));

  return (

    <Suspense fallback={<div>...Loading Tickets...</div>}>

      <TicketTable

      initialTickets={serializedTickets}
      />
    </Suspense>
  );}