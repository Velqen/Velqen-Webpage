import { notFound } from "next/navigation";
import blogPosts from "@/data/blogPosts";
import Image from "next/image";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Changed to Promise
}) {
  const { slug } = await params; // Await the params
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen pt-40 px-4 max-w-3xl mx-auto">
      <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mb-2 text-sm text-gray-500">
        {post.date} · {post.category}
      </div>
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      {Array.isArray(post.content) ? (
        post.content.map((paragraph, i) => (
          <p key={i} className="text-lg mb-4">
            {paragraph}
          </p>
        ))
      ) : (
        <p className="text-lg">{post.content}</p>
      )}
    </div>
  );
}
