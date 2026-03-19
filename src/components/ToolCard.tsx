import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: string;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md hover:border-primary/30"
    >
      <div className="mb-2 text-2xl">{icon}</div>
      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
    </Link>
  );
}
