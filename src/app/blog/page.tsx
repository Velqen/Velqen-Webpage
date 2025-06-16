"use client";

import React from "react";
import blogPosts from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard/BlogCard";
import { BlogPost } from "@/types/blog"; // ← make sure you're using this
import { useDeviceSize } from "@/hooks/useDeviceSize";

const Blog = () => {
  const { isSmallDevice } = useDeviceSize();
  const sortedPosts = [...blogPosts].sort((a: BlogPost, b: BlogPost) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen pt-40 pb-20">
      <div className="mx-auto w-[90%] md:w-[80%]">
        <div
          className={` ${
            isSmallDevice ? "grid-cols-1 gap-20" : "grid-cols-2"
          } grid gap-6 lg:grid-cols-3`}
        >
          {sortedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
