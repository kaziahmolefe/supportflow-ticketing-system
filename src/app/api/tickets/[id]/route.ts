import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitEvent } from "@/lib/eventBus";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const ticket = await prisma.ticket.findUnique({
        where: { id },
    });

    if (ticket) {
        await prisma.notification.create({
            data: {
                ticketId: ticket.id,
                message: `🗑️ Ticket Deleted: ${ticket.subject}`,
            },
        });
        
    }

    await prisma.ticket.delete({
      where: {
        id,
      },
    });

    emitEvent("ticket-deleted", {
      id,
    });

    return NextResponse.json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete ticket" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updatedTicket = await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        subject: body.subject,
        description: body.description,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        assignedTo: body.assignedTo,
        priority: body.priority,
        status: body.status,
        category: body.category,
      },
    });

    emitEvent("ticket-updated", updatedTicket);

    const notification = await prisma.notification.create({
        data: {
            ticketId: updatedTicket.id,
            message: `✏️ Ticket Updated: ${updatedTicket.subject}`,
        },
    });

    emitEvent("notification-created", notification);

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}
