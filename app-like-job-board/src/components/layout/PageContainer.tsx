import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className={`container mx-auto px-4 py-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
