"use client";

import React from "react";
import { FaInstagram, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useScrollProgressToBottom } from "@/hooks/useScrollBottom";

const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL;
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const Footer = () => {
  const pathname = usePathname();
  const FOOTER_HEIGHT = 96 * 4; // 24rem * 16px = 384px
  const progress = useScrollProgressToBottom(FOOTER_HEIGHT);
  const shouldHide =
    pathname === "/ai-chatbot" ||
    pathname === "/login" ||
    pathname?.startsWith("/velqen");

  if (shouldHide) return null;

  return (
    <>
      {/* Spacer that pushes content up */}
      <div className="h-96" />

      <motion.footer
        style={{
          clipPath: `inset(${FOOTER_HEIGHT - progress}px 0% 0% 0%)`,
        }}
        transition={{ ease: "linear", duration: 0.1 }}
        className="bg-neutral-900 text-white py-6 fixed bottom-0 left-0 w-full z-50 h-96"
      >
        <div className="container mx-auto flex flex-col items-center space-y-4">
          <p className="text-sm text-center">
            AI-powered by <span className="font-semibold">Velqen</span>.
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
      </motion.footer>
    </>
  );
};

export default Footer;
