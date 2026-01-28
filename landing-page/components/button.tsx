import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "outline" | "shade" | "icon-round" | "circle-nav";
};

const basicClassName =
  "rounded-full border py-3 px-6 flex items-center justify-center transition-all duration-250 active:scale-90 active:duration-150 gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const variantStyles = {
  outline: `${basicClassName} text-black border-primary hover:bg-primary hover:text-white`,
  shade: `${basicClassName} border-transparent text-gray-dark bg-gray-light hover:bg-gray-dark hover:text-gray-light !py-3 !px-[13px]`,
  "icon-round": "text-black border-primary hover:bg-primary hover:text-white",
  "circle-nav":
    "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-250 active:scale-90 active:duration-150 bg-primary text-white border-primary hover:opacity-80 disabled:bg-white disabled:text-gray disabled:border-gray disabled:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
};

export default function Button({
  children,
  variant = "outline",
  className,
  ...props
}: Props) {
  const baseClassName = variantStyles[variant];
  const combinedClassName = `${baseClassName} ${className}`;

  return (
    <button
      type={props.type || "button"}
      {...props}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
