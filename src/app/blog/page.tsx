"use client";

import React from "react";
import blogPosts from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard/BlogCard";
import { BlogPostItem } from "@/types/blog"; // ← make sure you're using this
import { useDeviceSize } from "@/hooks/useDeviceSize";
import BlogBanner from "../velqen/components/BlogBanner/BlogBanner";

const Blog = () => {
  const { isSmallDevice } = useDeviceSize();
  const sortedPosts = [...blogPosts].sort(
    (a: BlogPostItem, b: BlogPostItem) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <BlogBanner />
      <div className="mx-auto w-[90%] md:w-[80%] pt-40">
        <h2 className="text-6xl md:text-9xl font-bold">Blog</h2>
        <div
          className={` ${
            isSmallDevice ? "grid-cols-1 gap-20" : "grid-cols-2"
          } grid gap-6 lg:grid-cols-3 mt-16`}
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
