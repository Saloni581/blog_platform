import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import EditForm from "./Form";
import { notFound, redirect } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // @ts-ignore
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    await connectToDB();
    const post = await Post.findOne({ slug }).lean();

    if (!post) return notFound();

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
            <EditForm post={JSON.parse(JSON.stringify(post))} />
        </main>
    );
}

