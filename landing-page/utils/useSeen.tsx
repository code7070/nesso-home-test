'use client';

import { useEffect, useRef, useState } from 'react';

interface UseSeenOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useSeen<T extends HTMLElement = HTMLDivElement>(
  options: UseSeenOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;
  const [isSeen, setIsSeen] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsSeen(true);
          if (triggerOnce && element) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsSeen(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isSeen };
}
