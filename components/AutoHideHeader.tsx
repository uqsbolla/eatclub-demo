"use client";

import { useState, useEffect, ReactNode } from "react";

interface AutoHideHeaderProps {
  children: ReactNode;
}

export function AutoHideHeader({ children }: AutoHideHeaderProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted to avoid hydration mismatch
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show header when near the top
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsHeaderVisible(false);
      } else {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 ${
        mounted ? "transition-transform duration-300" : ""
      } ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
      suppressHydrationWarning
    >
      {children}
    </header>
  );
}

