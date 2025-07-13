import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
    // @ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
            <p className="text-gray-600">🚧 Form coming soon...</p>
        </main>
    );
}
