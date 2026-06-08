"use client";
import { motion } from "framer-motion";
import type { Experience } from "@/types";

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="py-28">
      <div className="max-w-[1100px] mx-auto px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[10px] tracking-[4px] text-neon uppercase mb-3">
            <span className="w-10 h-px bg-neon" />05 — Journey
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)]">
            Work <span className="text-neon">Experience</span>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-neon to-transparent mt-4" />
        </div>

        <div className="relative pl-8 timeline-line">
          {experience.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative mb-10 pb-10 border-b border-[var(--border)]
                         last:border-none last:mb-0 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[42px] top-1.5 w-3 h-3 border border-neon bg-bg0"
                   style={{ boxShadow: "0 0 8px rgba(0,245,255,0.4)" }} />
              <div className="text-[10px] tracking-[2px] text-neon mb-1.5">
                {e.start_date} → {e.end_date}
              </div>
              <div className="font-display text-lg font-bold mb-0.5">{e.title}</div>
              <div className="text-[12px] text-neon2 mb-3 tracking-wide">@ {e.company}</div>
              <div className="text-[13px] text-[#8899aa] leading-[1.85]">{e.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
