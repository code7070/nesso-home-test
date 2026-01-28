import { ArrowRight } from "./icons/arrow-right";

interface Props {
  title: string;
  description: string;
}

export default function ServiceCard({ title, description }: Props) {
  return (
    <div className="bg-gray-lighter rounded-3xl p-3 pt-6 flex flex-col gap-5 group relative border-2 border-transparent hover:border-primary transition-all duration-500">
      <h3 className="text-[1.6rem] leading-9 mx-6">{title}</h3>
      <div className="bg-white rounded-3xl p-6">
        <p>{description}</p>
      </div>
      <div className="p-3 absolute top-6 right-6 opacity-0 group-hover:top-4 group-hover:right-4 group-hover:opacity-100 text-primary transition-all duration-300">
        <ArrowRight />
      </div>
    </div>
  );
}
