import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteButton from "@/components/DeleteButton";

export default async function BlogPostPage({ params }: { params: { slug: string }; }) {
    await connectToDB();

    // @ts-ignore
    const session = await getServerSession(authOptions);
    const post = await Post.findOne({ slug: params.slug }).lean<PostType>();

    if (!post) {
        return notFound();
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="prose prose-lg max-w-none">{post.content}</div>
            {session?.user && (
                <div className="mt-6 flex gap-4">
                    <Link
                        href={`/blog/${post.slug}/edit`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                        Edit
                    </Link>
                    <DeleteButton slug={post.slug} />
                </div>
            )}
        </main>
    );
}
