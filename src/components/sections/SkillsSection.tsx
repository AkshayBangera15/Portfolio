"use client";
import { motion } from "framer-motion";
import type { SkillCategory } from "@/types";

const ICONS: Record<string, string> = {
  Languages: "⟨/⟩",
  "Core CS": "⚙",
  Databases: "🗄",
  "Technologies & Tools": "🔧",
};
const STYLE: Record<string, { tag: string; cat: string }> = {
  Languages:             { tag: "border-neon/25 text-neon bg-neon/4", cat: "text-neon" },
  "Core CS":             { tag: "border-neon2/30 text-neon2 bg-neon2/4", cat: "text-neon2" },
  Databases:             { tag: "border-neon4/25 text-neon4 bg-neon4/4", cat: "text-neon4" },
  "Technologies & Tools":{ tag: "border-amber/25 text-amber bg-amber/4", cat: "text-amber" },
};

export default function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  return (
    <section id="skills" className="py-28 bg-neon/[0.01]">
      <div className="max-w-[1100px] mx-auto px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[10px] tracking-[4px] text-neon uppercase mb-3">
            <span className="w-10 h-px bg-neon" />02 — Arsenal
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)]">
            Technical <span className="text-neon">Skills</span>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-neon to-transparent mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const st = STYLE[cat.name] ?? STYLE.Languages;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-neon/2 border border-[var(--border)] p-7
                           transition-colors duration-300 hover:border-neon/25"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-neon/8 border border-neon/20
                                  flex items-center justify-center text-sm">
                    {ICONS[cat.name] ?? "◆"}
                  </div>
                  <span className={`font-display text-sm font-bold tracking-wide ${st.cat}`}>
                    {cat.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s}
                          className={`text-[11px] px-3 py-1.5 border tracking-wide
                                     transition-all duration-300 ${st.tag}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
