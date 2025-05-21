interface HandDrawnUnderlineProps {
  text: string;
  className?: string;
}

export default function HandDrawnUnderline({
  text,
  className = "",
}: HandDrawnUnderlineProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {text}
      <svg
        className="absolute -bottom-1 left-0 w-full"
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        height="8"
      >
        <path
          d="M0,5 C40,2 60,8 80,5 C100,2 120,8 140,5 C160,2 180,8 200,5"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
