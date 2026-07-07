import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        start(controller) {
            const sendHeartbeat = setInterval(() => {
                controller.enqueue(
                    encoder.encode(`event: heartbeat\ndata: {}\n\n`)
                );
            }, 30000);

        request.signal.addEventListener("abort", () => {
            clearInterval(sendHeartbeat);
            controller.close();
        });
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive", 
        },
    });
}