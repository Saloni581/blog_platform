"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditForm({ post }: { post: any }) {
    const router = useRouter();
    const [form, setForm] = useState({
        title: post.title,
        content: post.content,
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`/api/posts/${post.slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message || "Update failed");
        } else {
            router.push(`/blog/${post.slug}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
            <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={6}
                className="w-full border p-2 rounded"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Update Post
            </button>
            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
}
