"use client";

import GraphIcon from "@/components/icons/graph";
import MessageIcon from "@/components/icons/messages";

import Image from "next/image";

export default function HomeDigitalVisual({ isSeen }: { isSeen: boolean }) {
  return (
    <div className="relative aspect-[480/216] w-full">
      <Image
        fill
        alt="Nesso Digital Team"
        className="size-full object-cover block rounded-2xl"
        src="/assets/nesso-team-masked.webp"
      />

      <div
        className={`w-[12%] rounded-xl bg-primary p-1 flex items-center justify-center transition-all duration-500 absolute left-0 bottom-0 aspect-square ${isSeen ? "scale-100 opacity-100 delay-300" : "scale-75 opacity-0"}`}
      >
        <Image
          width={37}
          height={34}
          alt="Nesso Digitale Icon"
          src="/assets/nesso-digital-icon.svg"
        />
      </div>

      <div
        className={`w-[12%] rounded-xl bg-primary p-1.5 flex items-center justify-center transition-all duration-500 absolute right-[12.5%] top-0 aspect-[1/0.9] ${isSeen ? "scale-100 opacity-100 delay-[600ms]" : "scale-75 opacity-0"}`}
      >
        <MessageIcon size={32} />
      </div>

      <div
        className={`w-[10%] rounded-xl bg-primary p-1.5 flex items-end justify-center transition-all duration-500 absolute right-0 top-0 ${isSeen ? "h-[52%] max-h-[112px] opacity-100 delay-[900ms]" : "h-0 opacity-0"}`}
      >
        <GraphIcon size={36} />
      </div>
    </div>
  );
}
