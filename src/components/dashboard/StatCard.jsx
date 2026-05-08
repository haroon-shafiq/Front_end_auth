import Link from "next/link";

export const StatCard = ({ title, value, href }) => {
  const content = (
    <div className="border p-4 rounded-2xl w-full">
      <div className="flex flex-col gap-2">
        <h1>{title}</h1>
        <p>{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return <Link href={href}>{content}</Link>;
};