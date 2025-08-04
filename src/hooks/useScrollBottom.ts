import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useScrollProgressToBottom = (triggerDistance = 400) => {
  const [progress, setProgress] = useState(0); 
const pathname = usePathname(); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = docHeight - (scrollTop + windowHeight);
      const revealedPx = Math.min(Math.max(triggerDistance - distanceFromBottom, 0), triggerDistance); // ✅ pixel value
    setProgress(revealedPx);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, triggerDistance]);

  return progress;
};
