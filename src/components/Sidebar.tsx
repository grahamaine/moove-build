import type { SVGProps } from "react";
import { Logo } from "./Logo";

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function WalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.5 14.5l5-5" />
      <path d="M10.5 7.5l1-1a3.54 3.54 0 0 1 5 5l-1 1" />
      <path d="M13.5 16.5l-1 1a3.54 3.54 0 0 1-5-5l1-1" />
    </svg>
  );
}

function ActivityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19V10" />
      <path d="M11 19V5" />
      <path d="M18 19v-7" />
    </svg>
  );
}

const items = [
  { href: "#top", label: "Home", Icon: HomeIcon },
  { href: "#wallet", label: "Wallet", Icon: WalletIcon },
  { href: "#pay", label: "Payment links", Icon: LinkIcon },
  { href: "#activity", label: "Activity", Icon: ActivityIcon },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-16 flex-col items-center gap-6 border-r border-[var(--border)] bg-[var(--surface)] py-5 md:flex">
      <a href="#top" aria-label="Moove Build home">
        <Logo size={30} showWordmark={false} />
      </a>
      <nav className="flex flex-1 flex-col items-center gap-2">
        {items.map(({ href, label, Icon }) => (
          <a
            key={href}
            href={href}
            title={label}
            aria-label={label}
            className="card-hover flex h-10 w-10 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--accent-2)]"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </nav>
    </aside>
  );
}
