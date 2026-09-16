"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration]);

  return value;
}
