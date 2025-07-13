import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CreatePostForm from "./Form";

export default async function CreatePostPage() {

    // @ts-ignore
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">📝 Create New Post</h1>
            <CreatePostForm userId={session.user?.id} />
        </main>
    );
}
