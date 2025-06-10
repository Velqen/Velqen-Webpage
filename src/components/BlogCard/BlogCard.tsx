// components/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

/** Reusable blog-post card */
const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    // Card Wrapper ↓
    <Link href={`/blog/${post.slug}`} className="block">
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-xl aspect-[4/3]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="mt-4 text-black">
        <div className="mb-2 flex items-center space-x-3">
          <span className="text-sm font-medium opacity-80">
            {post.category}
          </span>
          <span className="text-sm opacity-60">{post.date}</span>
        </div>
        <h3 className="text-xl font-semibold leading-tight">{post.title}</h3>
      </div>
    </Link>
  );
};

export default BlogCard;
