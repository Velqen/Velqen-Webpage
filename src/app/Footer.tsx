"use client"; // Required to use usePathname in a client component

import React from "react";
import { FaInstagram, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { usePathname } from "next/navigation"; // 👈 import hook

const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL;
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const Footer = () => {
  const pathname = usePathname(); // 👈 get current route

  if (pathname === "/ai-chatbot" || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-neutral-900 text-white py-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <p className="text-sm text-center">
          Website developed by <span className="font-semibold">Canto AGI</span>.
        </p>
        <div className="flex space-x-6">
          <a href={`mailto:${email}`} aria-label="Email">
            <FaEnvelope className="w-5 h-5 hover:text-velqen-orange transition" />
          </a>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
          >
            <FaXTwitter className="w-5 h-5 hover:text-velqen-orange transition" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5 hover:text-velqen-orange transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
