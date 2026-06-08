"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ContactInfo } from "@/types";

const stats = [
  { num: "6+", label: "Projects Built" },
  { num: "2",  label: "Internships" },
  { num: "1",  label: "National Rank" },
  { num: "10+", label: "AI & Backend Technologies" },
];

export default function AboutSection({ contact }: { contact: ContactInfo | null }) {
  const name = contact?.name ?? "Akshay Bangera";
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <section id="about" className="py-28">
      <div className="max-w-[1100px] mx-auto px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[10px] tracking-[4px] text-neon uppercase mb-3">
            <span className="w-10 h-px bg-neon" style={{ boxShadow: "var(--glow)" }} />
            01 — Profile
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)] leading-tight">
            About <span className="text-neon">Me</span>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-neon to-transparent mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8899aa] text-sm leading-[1.9] mb-4">
              I'm a backend and AI/ML engineer who obsesses over building systems that are not just
              functional, but elegant. With 4+ years of experience shipping production systems, I
              bridge the gap between research-grade ML and real-world infrastructure.
            </p>
            <p className="text-[#8899aa] text-sm leading-[1.9] mb-8">
              My work spans from training transformer models to designing event-driven microservices.
              I believe in clean abstractions, measurable performance, and code that reads like prose.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label}
                     className="bg-neon/3 border border-[var(--border)] p-5 transition-all
                                duration-300 hover:border-neon hover:shadow-neon hover:-translate-y-0.5">
                  <div className="font-display text-4xl font-extrabold text-neon leading-none">{s.num}</div>
                  <div className="text-[11px] text-[#8899aa] tracking-wide mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              <div className="relative w-72 h-72 overflow-hidden border border-[var(--border)]">
  <Image
    src="/akshay.png"
    alt="Akshay Bangera"
    fill
    className="object-cover"
    priority
  />
</div>
              {/* Corner frames */}
              <div className="absolute -top-1.5 -left-1.5 right-1.5 bottom-1.5
                              border border-neon/30 pointer-events-none" />
              <div className="absolute top-1.5 left-1.5 -right-1.5 -bottom-1.5
                              border border-neon2/20 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
