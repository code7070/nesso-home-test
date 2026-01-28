"use client";

import { useSeen } from "@/utils/useSeen";
import { ReactNode, useEffect, useState } from "react";

type HeadingLevel = "h2" | "h3" | "h4";

interface Props {
  children: ReactNode;
  as?: HeadingLevel;
}

export default function HeaderStripe({ children, as: Tag = "h2" }: Props) {
  const { isSeen, ref } = useSeen<HTMLHeadingElement>({ triggerOnce: true });
  const [firstLineBottom, setFirstLineBottom] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const calculateFirstLineBottom = () => {
      const computedStyle = getComputedStyle(el);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      // Position stripe at the bottom of first line
      setFirstLineBottom(lineHeight);
    };

    calculateFirstLineBottom();

    // Recalculate on resize (font size might change)
    window.addEventListener("resize", calculateFirstLineBottom);
    return () => window.removeEventListener("resize", calculateFirstLineBottom);
  }, [ref]);

  return (
    <Tag
      className="text-2xl sm:text-[1.75rem] md:text-[2.25rem] font-bold max-w-[680px] relative leading-[1.15em]"
      ref={ref}
    >
      {children}
      <span
        aria-hidden="true"
        style={{ top: firstLineBottom ? `${firstLineBottom}px` : undefined }}
        className={`bg-primary h-1 md:h-1.5 transition-all duration-500 ${isSeen ? "w-[140px] md:w-[169px] delay-200" : "w-0"} absolute left-0 -translate-y-1 md:-translate-y-2`}
      />
    </Tag>
  );
}
