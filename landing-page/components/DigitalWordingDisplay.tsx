import { ReactNode } from "react";

export default function DigitalWordingDisplay({
  title,
  description,
  className = "",
}: {
  title: string;
  description: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 transition-all duration-300 ${className}`}
    >
      <div className="text-xl font-bold leading-6">{title}</div>
      <div className="text-gray-neutral">{description}</div>
    </div>
  );
}
