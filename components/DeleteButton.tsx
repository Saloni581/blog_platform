"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ slug }: { slug: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;

        const res = await fetch(`/api/posts/${slug}`, {
            method: "DELETE",
        });

        if (res.ok) {
            router.push("/");
        } else {
            alert("Delete failed");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
        >
            Delete
        </button>
    );
}
