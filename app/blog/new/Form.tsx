"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostForm({ userId }: { userId: string }) {
    const router = useRouter();
    const [form, setForm] = useState({ title: "", slug: "", content: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, authorId: userId }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || "Failed to create post");
            setLoading(false);
            return;
        }

        router.push("/");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="text"
                name="slug"
                placeholder="Slug (e.g. my-first-post)"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                name="content"
                placeholder="Write your blog content here..."
                rows={6}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Post"}
            </button>

            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
}
