"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-10 py-4 flex items-center justify-between
        transition-all duration-300 border-b border-[var(--border)]
        ${scrolled ? "bg-bg0/90 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="font-code text-lg font-bold text-neon tracking-widest"
           style={{ textShadow: "var(--glow)" }}>
        &lt;DEV/&gt;
      </div>

      <ul className="hidden md:flex gap-7 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[#8899aa] text-[11px] tracking-[2px] uppercase
                         hover:text-neon transition-colors duration-300
                         relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon
                               group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>

      <Link
        href="/admin"
        className="border border-neon2 text-neon2 px-4 py-1.5 font-mono text-[11px]
                   tracking-widest uppercase transition-all duration-300
                   hover:bg-neon2 hover:text-white"
        style={{ boxShadow: "none" }}
      >
        ⚡ Admin
      </Link>
    </nav>
  );
}
