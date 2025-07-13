import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();
        const posts = await Post.find().sort({ createdAt: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { title, slug, content, authorId } = await req.json();

        if (!title || !slug || !content) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const existing = await Post.findOne({ slug });
        if (existing) {
            return NextResponse.json({message: "This URL name is already taken. Please choose a different one for your post."}, {status: 409});
        }

        const newPost = new Post({
            title,
            slug,
            content,
            authorId,
        });

        await newPost.save();

        return NextResponse.json({ message: "Post created" });
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
