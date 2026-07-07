import { NextRequest, NextResponse } from "next/server";

let settings = {
    companyName: "Global Software Services",
    supportEmail: "agent@supportflow.com",
    emailNotifications: true,
    soundNotifications: true,
    desktopAlerts: false,
};

export async function GET() {
    return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    settings = {
        ...settings,
        ...body,
    };

    return NextResponse.json({
        success: true,
        settings,
    });
}