import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitEvent } from "@/lib/eventBus";

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);

    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const ticket = await prisma.ticket.create({
      data: {
        subject: body.subject,
        description: body.description,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        assignedTo: body.assignedTo,
        priority: body.priority,
        status: "Open",
        category: body.category,
      },
    });

    emitEvent("ticket-created", ticket)

    return NextResponse.json(ticket);

    const notification = await prisma.notification.create({
        data: {
            ticketId: ticket.id,
            message: `🆕 New Ticket: ${ticket.subject}`,
        },
    });

    emitEvent("notification-created", notification);

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);

    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}