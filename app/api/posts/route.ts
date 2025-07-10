import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();

        const posts = await Post.find().sort({ createdAt: -1 });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
    }
}
