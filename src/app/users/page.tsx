import { prisma } from "@/lib/prisma";
import UserTable from "@/components/users/UserTable";


export default async function UsersPage() {

  
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black">Users</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage support agents
        </p>
      </div>

      <UserTable initialUsers={users} />
    </main>
  );
}
