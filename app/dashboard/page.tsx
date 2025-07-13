import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default async function DashboardPage() {
    // @ts-ignore
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div className="text-center py-10 text-red-600 font-semibold">
                Please log in to view your dashboard.
            </div>
        );
    }

    await connectToDB();
    const posts = await Post.find({ authorId: session.user.id })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Posts</h1>
                <Link
                    href="/blog/new"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + New Post
                </Link>
            </div>

            {posts.length === 0 ? (
                <p className="text-gray-600">You haven't written any posts yet.</p>
            ) : (
                <ul className="space-y-4">
                    {posts.map((post: any) => (
                        <li key={post._id} className="border rounded p-4">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-sm text-gray-500 mb-2">{post.slug}</p>
                            <div className="flex gap-4">
                                <Link
                                    href={`/blog/${post.slug}/edit`}
                                    className="text-blue-600 underline"
                                >
                                    Edit
                                </Link>
                                <DeleteButton slug={post.slug} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
