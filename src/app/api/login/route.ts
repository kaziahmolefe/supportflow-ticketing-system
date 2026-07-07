import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user || !user.password) {
            return NextResponse.json(
                {
                    error: "Invalid email or password.",
                },
                {
                    status: 401,
                }
            );
        }

        const validPassword = await bcrypt.compare(
            body.password,
            user.password
        );

        if (!validPassword) {
            return NextResponse.json(
                {
                    error: "Invalid email or password.",
                },
                {
                    status: 401,
                }
            );
        }

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        response.cookies.set("supportflow-session", user.id, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error: "Login failed.",
            },
            {
                status: 500,
            }
        );

    }
}