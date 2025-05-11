import { useEffect, useState } from "react";

export const useDeviceSize = () => {
  const [isSmallDevice, setIsSmallDevice] = useState(false); // Default state

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR error

    const handleResize = () => {
      setIsSmallDevice(window.innerWidth <= 767);
    };

    handleResize(); // Set initial state on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSmallDevice };
};
