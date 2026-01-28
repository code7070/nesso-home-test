import { ReactNode } from "react";
import HeaderStripe from "./HeaderStripe";

type HeadingLevel = "h2" | "h3" | "h4";

interface Props {
  title: string;
  description?: ReactNode;
  headingLevel?: HeadingLevel;
}

export default function HeaderSection({ title, description, headingLevel = "h2" }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:justify-between md:items-start">
      <HeaderStripe as={headingLevel}>{title}</HeaderStripe>
      <div className="md:max-w-[340px] leading-[1.5rem]">{description}</div>
    </div>
  );
}
