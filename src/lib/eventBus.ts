const clients = new Set<ReadableStreamDefaultController<Uint8Array>>();

export function addClient(
    client: ReadableStreamDefaultController<Uint8Array>
) {
    clients.add(client);
}

export function removeClient(
    client: ReadableStreamDefaultController<Uint8Array>
) {
    clients.delete(client);
}

export function emitEvent(
    event: string,
    data: unknown
) {
    const encoder = new TextEncoder();

    const message =
        `event: ${event}\n` +
        `data: ${JSON.stringify(data)}\n\n`;

    for (const client of clients) {
        try {
            client.enqueue(
                encoder.encode(message)
            );
        } catch {
            clients.delete(client);
        }
    }
}