import React from "react";
import blogPosts from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard/BlogCard";

const Blog = () => {
  return (
    <div className="min-h-screen pt-40">
      <div className="mx-auto w-[90%] md:w-[80%]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
