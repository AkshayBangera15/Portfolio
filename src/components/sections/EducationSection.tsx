"use client";
import { motion } from "framer-motion";
import type { Education } from "@/types";

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="py-28 bg-neon/[0.01]">
      <div className="max-w-[1100px] mx-auto px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[10px] tracking-[4px] text-neon uppercase mb-3">
            <span className="w-10 h-px bg-neon" />06 — Foundation
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)]">
            Education & <span className="text-neon">Training</span>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-neon to-transparent mt-4" />
        </div>

        <div className="flex flex-col gap-5">
          {education.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/30 border border-[var(--border)] p-7
                         grid md:grid-cols-[1fr_auto] gap-6 transition-colors
                         hover:border-neon2/30"
            >
              <div>
                <div className="font-display text-lg font-bold mb-1">
                  {e.degree} — {e.branch}
                </div>
                <div className="text-[12px] text-neon2 tracking-wide mb-4">{e.institution}</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-[10px] px-2.5 py-1 border border-neon2/25
                                   text-neon2 bg-neon2/5 tracking-wide">
                    {e.start_date} – {e.end_date}
                  </span>
                </div>
                {e.coursework && (
                  <div className="text-[11px] text-[#8899aa]">
                    <span className="text-neon mr-1">Coursework:</span>
                    {e.coursework}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="font-display text-4xl font-extrabold text-neon leading-none">
                  {e.score}
                </div>
                <div className="text-[10px] text-[#8899aa] tracking-wide mt-1">{e.score_type}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
