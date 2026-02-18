type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return <article className={`section-card ${className}`}>{children}</article>;
}
