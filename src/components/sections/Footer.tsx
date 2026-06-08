import type { ContactInfo } from "@/types";

export default function Footer({ contact }: { contact: ContactInfo | null }) {
  const name = contact?.name ?? "Akshay Bangera";
  return (
    <footer className="px-10 py-8 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-4">
      <span className="text-[11px] text-[#8899aa] tracking-wide">
        © {new Date().getFullYear()} {name} — All systems operational
      </span>
      <div className="flex items-center gap-2 text-[11px] text-neon4">
        <span className="w-1.5 h-1.5 rounded-full bg-neon4 pulse-dot" />
        ONLINE
      </div>
    </footer>
  );
}
