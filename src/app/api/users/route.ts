import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch users."},
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                role: body.role,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to create user."},
            { status: 500 }
        );
    }
}