import {
    addClient,
    removeClient,
} from "@/lib/eventBus";

export async function GET() {

    const stream = new ReadableStream({

        start(controller) {

            addClient(controller);

            controller.enqueue(
                new TextEncoder().encode(
                    "event: connected\ndata: Connected\n\n"
                )
            );
        },

        cancel(controller) {

            removeClient(controller);
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