"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function useScrollProgress({ containerRef }: Options) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = containerRef.current;
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        const scrollable = height - window.innerHeight;
        if (scrollable <= 0) {
          setProgress(0);
          return;
        }
        const p = Math.min(Math.max(-top / scrollable, 0), 1);
        setProgress(p);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return progress;
}
