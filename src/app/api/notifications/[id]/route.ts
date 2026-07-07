import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string}> }
) {
    const { id } = await params;

    const notification =
        await prisma.notification.update({
            where: { id },
            data: {
                isRead: true,
            },
        });
    
        return NextResponse.json(notification);
}