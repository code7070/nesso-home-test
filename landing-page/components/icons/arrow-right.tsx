const ArrowRight = ({
  size = 30,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.15 29.25 0 26.1 21.6 4.5H2.25V0h27v27h-4.5V7.65z"
        fill="currentColor"
      />
    </svg>
  );
};

export { ArrowRight };
