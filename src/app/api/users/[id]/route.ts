import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function PATCH(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const body = await request.json();

        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name: body.name,
                email: body.email,
                role: body.role,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to update user."},
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        await prisma.user.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to delete user."},
            { status: 500 }
        );
    }
}