import React from "react";
import blogPosts from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard/BlogCard";
import { BlogPost } from "@/types/blog"; // ← make sure you're using this

const Blog = () => {
  // 🟡 Fix: assert types so TS knows date is a string
  const sortedPosts = [...blogPosts].sort((a: BlogPost, b: BlogPost) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen pt-40 pb-20">
      <div className="mx-auto w-[90%] md:w-[80%]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
