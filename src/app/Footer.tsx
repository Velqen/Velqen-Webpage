"use client";

import React from "react";
import { FaInstagram, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { usePathname } from "next/navigation";
// import { useScrollProgressToBottom } from "@/hooks/useScrollBottom";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL;
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const Footer = () => {
  const { isSmallDevice } = useDeviceSize();

  const pathname = usePathname();
  const shouldHide =
    pathname === "/ai-chatbot" ||
    pathname === "/login" ||
    pathname?.startsWith("/velqen");

  if (shouldHide) return null;

  return (
    <>
      {/* Spacer that pushes content up */}

      <footer className="relative bg-black text-white py-6 w-full min-h-[90vh]">
        <div
          className={`${
            isSmallDevice ? "m-10" : "m-28"
          } flex items-center justify-between space-y-4 `}
        >
          <div className="flex flex-col space-y-2">
            <p className="text-xl text-muted-foreground">
              Work with an assistant. Not an app.
            </p>
            <p className="text-4xl xl:text-6xl font-bold text-white leading-snug">
              SIMPLICITY ISN&#39;T A LUXURY. <br />
              IT&#39;S A STRATEGY FOR GROWTH.
            </p>
          </div>
        </div>

        {/* Bottom icons container */}
        <div className="absolute bottom-0 left-0 w-full h-40 p-8 flex items-end justify-end space-x-6">
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
      </footer>
    </>
  );
};

export default Footer;
