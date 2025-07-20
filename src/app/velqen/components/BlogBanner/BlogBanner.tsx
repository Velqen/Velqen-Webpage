import React from "react";

const BlogBanner = () => {
  return (
    <div
      className="relative w-full bg-cover bg-top py-32 md:py-60 text-center text-white mb-16"
      style={{
        backgroundImage: "url('/blog/banner_bg4.jpg')",
      }}
    >
      {/* Greyish overlay with subtle darkness */}
      <div className="absolute inset-0 bg-[rgba(46,46,46,0.45)] z-0" />

      {/* Text content above overlay */}
      <div className="relative z-10 p-8 inline-block">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">
          AI Excellence in Simplicity
        </h1>
        <p className="text-lg md:text-2xl text-gray-200">
          Explore AI insights & real-world applications powering our assistant.
        </p>
      </div>
    </div>
  );
};

export default BlogBanner;
