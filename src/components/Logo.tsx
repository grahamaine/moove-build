export function LogoMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`animate-logo-pulse shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mooveBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1830" />
          <stop offset="55%" stopColor="#153e78" />
          <stop offset="100%" stopColor="#1c4f8f" />
        </linearGradient>
        <linearGradient id="mooveM" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#3fb6e0" />
          <stop offset="100%" stopColor="#8fe9ff" />
        </linearGradient>
        <linearGradient id="mooveB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a2246" />
          <stop offset="100%" stopColor="#262a5e" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="96" height="96" rx="22" fill="url(#mooveBg)" />

      <circle cx="78" cy="18" r="1.6" fill="#8fe9ff" opacity="0.6" />
      <circle cx="87" cy="27" r="1.1" fill="#8fe9ff" opacity="0.4" />
      <circle cx="70" cy="11" r="1.1" fill="#8fe9ff" opacity="0.5" />
      <line x1="78" y1="18" x2="87" y2="27" stroke="#8fe9ff" strokeWidth="0.6" opacity="0.35" />
      <line x1="78" y1="18" x2="70" y2="11" stroke="#8fe9ff" strokeWidth="0.6" opacity="0.35" />

      <path
        d="M58 30 h9 a9 9 0 0 1 0 18 h-9 z M58 48 h11 a10 10 0 0 1 0 20 h-11 z"
        fill="url(#mooveB)"
        opacity="0.9"
      />

      <path
        d="M22 76 L22 40 L35 55 L48 38 L48 76"
        fill="none"
        stroke="#04101f"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
        transform="translate(0,3)"
      />
      <path
        d="M22 76 L22 40 L35 55 L48 38 L48 76"
        fill="none"
        stroke="url(#mooveM)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 40 L65 21"
        fill="none"
        stroke="url(#mooveM)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path d="M57 14 L69 16 L63 27 Z" fill="url(#mooveM)" />
    </svg>
  );
}

export function Logo({
  size = 36,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className="leading-tight">
          <span className="block text-sm font-bold tracking-wide text-[var(--foreground)]">
            MOOVE <span className="text-[var(--accent-2)]">BUILD</span>
          </span>
          <span className="block text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            Accelerating blockchain dev
          </span>
        </span>
      )}
    </div>
  );
}
