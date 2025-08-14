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
    <div className="w-full flex flex-col items-center">
      <div className="relative h-[500px] w-[1300px] overflow-hidden mb-16 mt-40">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="px-4 max-w-3xl mx-auto pb-20">
        <div className="mb-2 text-sm text-gray-500">
          {post.date} · {post.category}
        </div>
        <h1 className="text-3xl font-bold mb-11">{post.title}</h1>
        {Array.isArray(post.content) &&
          post.content.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <p key={i} className="text-lg mb-8">
                  {block.text}
                </p>
              );
            }
            if (block.type === "image") {
              return (
                <div
                  key={i}
                  className="relative h-[300px] w-full overflow-hidden my-10"
                >
                  <Image
                    src={block.src}
                    alt={block.alt || ""}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            }
            if (block.type === "bullet") {
              return (
                <ul key={i} className="list-disc pl-6 text-lg mb-8">
                  {block.items.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
