"use client";
import { motion } from "framer-motion";
import type { Achievement } from "@/types";

export default function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  return (
    <section id="achievements" className="py-28 bg-neon/[0.01]">
      <div className="max-w-[1100px] mx-auto px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[10px] tracking-[4px] text-neon uppercase mb-3">
            <span className="w-10 h-px bg-neon" />04 — Recognition
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)]">
            Achievements & <span className="text-neon">Awards</span>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-neon to-transparent mt-4" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="relative bg-black/30 border border-[var(--border)] p-6
                         transition-all duration-300 hover:-translate-y-1 hover:border-neon/20
                         group overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-0 h-px bg-neon
                              group-hover:w-full transition-all duration-500" />
              <div className="text-[10px] tracking-[2px] text-neon4 mb-2">{a.year}</div>
              <div className="font-display text-base font-bold mb-2">{a.title}</div>
              <div className="text-[12px] text-[#8899aa] leading-[1.75] mb-3">{a.description}</div>
              <div className="flex flex-wrap gap-1.5">
                {a.skills.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 border border-neon4/20
                                           text-neon4 tracking-wide">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
