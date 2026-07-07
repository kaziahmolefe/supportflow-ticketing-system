import { prisma } from "@/lib/prisma";
import NotificationList from "@/components/notifications/NotificationList";

export default async function NotificationsPage() {
    const notifications = await prisma.notification.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

return (
    <main className="p-8">
        <div className="mb-8">
            <h1 className="text-4xl font-black dark:text-4xl font-white">
                Notifications
            </h1>

            <p className="text-gray-700 dark:text-gray-300">
                Real time activity across the support system. You will be notified when a ticket is created, updated, or deleted.
            </p>

        </div>

        <NotificationList initialNotifications={notifications} />

    </main>
);
}
