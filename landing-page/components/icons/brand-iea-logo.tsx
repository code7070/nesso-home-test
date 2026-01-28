const BrandIeaLogo = ({ size = 58 }: { size?: number }) => {
  return (
    <svg
      width={size}
      // height={19}
      viewBox="0 0 58 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="aspect-[3/1]"
    >
      <path
        d="M19 7.592h-7.592l4.81-4.81-1.35-1.349L9.5 6.803V0H7.592v7.592l-4.81-4.81-1.349 1.35L6.803 9.5H0v1.908h7.592l-4.81 4.81 1.35 1.349L9.5 12.198V19h1.908v-7.592l4.81 4.81 1.349-1.35L12.198 9.5H19zm8 6.517V4.891h1.742v9.217zm3.923 0V4.891h9.074V6.23h-7.332v2.64h7.072v1.248h-7.072v2.639h7.332v1.351zm10.674 0 5.109-9.217h2.21l5.083 9.217h-1.86l-1.13-2.107h-6.41l-1.13 2.106zm3.705-3.406h5.005L47.81 6.036zm10.375 3.406v-1.6h2.041v1.6z"
        fill="currentColor"
      />
    </svg>
  );
};

export { BrandIeaLogo };
