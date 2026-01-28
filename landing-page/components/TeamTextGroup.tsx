export default function TeamTextGroup({
  title,
  description,
  isActive,
}: {
  title: string;
  description: string;
  isActive?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 group transition-colors">
      <h3
        className={`leading-6 font-semibold ${isActive ? "text-primary" : ""} transition-colors text-2xl`}
      >
        {title}
      </h3>
      <p className="text-gray-darkest transition-colors">{description}</p>
    </div>
  );
}
