
interface HeadingProps {
  title: string;
  className?: string;
}
export default function Heading({title,className}: HeadingProps) {
  return (
    <h1 className={`${className}`}>{title}</h1>
  );
}