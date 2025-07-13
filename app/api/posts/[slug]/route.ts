import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

// PUT: Update a post
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await connectToDB();
        const { title, content } = await req.json();

        const updatedPost = await Post.findOneAndUpdate(
            { slug: params.slug },
            { title, content },
            { new: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated", post: updatedPost });
    } catch (error) {
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
}

// DELETE: Delete a post
export async function DELETE(_: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await connectToDB();
        const deleted = await Post.findOneAndDelete({ slug: params.slug });

        if (!deleted) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }
}
