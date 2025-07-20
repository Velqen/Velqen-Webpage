"use client";

import React from "react";
import Image from "next/image";

const hiringEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const JoinUs = () => {
  return (
    <div className="w-full bg-black text-white flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Image section */}
      <div className="w-full md:w-1/2 h-[600px] relative">
        <Image
          src="/about-us/join_us2.jpg" // 🔁 Replace with your image path
          alt="Join our team"
          fill
          className="object-cover"
        />
      </div>

      {/* Text section */}
      <div className="w-full md:w-1/2 px-8 py-16 md:py-0 md:px-16 text-left space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold">Join Our Team</h2>

        <p className="text-lg">
          If you&#39;re into AI, finance, or just love solving real-world
          problems, we&#39;d love to hear from you.
        </p>
        <a
          href={`mailto:${hiringEmail}`}
          className="group inline-block overflow-hidden h-[48px] w-[200px] relative rounded"
        >
          <div className="absolute inset-0 transform group-hover:-translate-y-12 transition-transform duration-300">
            <span className="h-[48px] bg-white text-black px-6 py-2 text-lg md:text-2xl flex items-center justify-center">
              Contact Us
            </span>
            <span className="h-[48px] velqen-gradient-vertical-bg text-black px-6 py-2 text-lg md:text-2xl flex items-center justify-center">
              Contact Us
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default JoinUs;
