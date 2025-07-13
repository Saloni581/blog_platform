import Link from "next/link";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

const HomePage = async ()=> {
  const posts = await getPosts();

  return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">📝 Blog Posts</h1>

        {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
        ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post._id}>
                    <hr className="my-4" />
                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-700">
                      {post.content.slice(0, 100)}...
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Posted on {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
              ))}
            </div>
        )}
      </main>
  );
}

// @ts-ignore
export default HomePage;
