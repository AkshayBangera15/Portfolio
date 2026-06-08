"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28">
      <div className="max-w-[1100px] mx-auto px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[10px] tracking-[4px] text-neon uppercase mb-3">
            <span className="w-10 h-px bg-neon" />03 — Work
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)]">
            Featured <span className="text-neon">Projects</span>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-neon to-transparent mt-4" />
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-bg1/80 border border-[var(--border)] p-8
                         grid md:grid-cols-[1fr_auto] gap-6 transition-all duration-400
                         hover:border-neon/25 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                         before:absolute before:top-0 before:left-0 before:w-0.5 before:h-full
                         before:bg-gradient-to-b before:from-neon before:to-neon2
                         before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            >
              <div>
                <div className="text-[10px] text-[#8899aa] tracking-[2px] mb-2">{p.year}</div>
                <h3 className="font-display text-xl font-bold mb-2 transition-colors
                               hover:text-neon">{p.title}</h3>
                <p className="text-[#8899aa] text-[13px] leading-[1.8] mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.skills.map((s) => (
                    <span key={s} className="text-[10px] px-2.5 py-1 border border-neon/15
                                             text-neon bg-neon/4 tracking-wide">{s}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noreferrer"
                       className="text-[11px] text-[#8899aa] uppercase tracking-wide
                                  transition-colors hover:text-neon">
                      ⟨⟩ GitHub
                    </a>
                  )}
                  {p.demo_url && (
                    <a href={p.demo_url} target="_blank" rel="noreferrer"
                       className="text-[11px] text-[#8899aa] uppercase tracking-wide
                                  transition-colors hover:text-neon">
                      ↗ Live Demo
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => setActive(p)}
                  className="border border-neon2/30 text-neon2 px-3 py-1.5 font-mono
                             text-[10px] tracking-wide uppercase transition-all duration-300
                             hover:bg-neon2/10"
                  style={{ boxShadow: "none" }}
                >
                  Build Roadmap →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Roadmap Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-[2000] flex items-center justify-center
                       backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg1 border border-[var(--border)] max-w-xl w-[90%]
                         max-h-[80vh] overflow-y-auto p-9 relative"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 border border-[var(--border)] text-[#8899aa]
                           px-3 py-1 font-mono text-[11px] hover:border-neon3 hover:text-neon3
                           transition-colors"
              >
                ✕ Close
              </button>
              <div className="font-display text-xl font-bold mb-1">{active.title}</div>
              <div className="text-neon text-[11px] tracking-[2px] uppercase mb-6">Build Roadmap</div>
              {active.roadmap.map((step, i) => (
                <div key={i} className="flex gap-4 mb-5 pb-5 border-b border-[var(--border)]
                                        last:border-none last:mb-0 last:pb-0">
                  <div className="w-7 h-7 bg-neon/8 border border-neon/20 flex items-center
                                  justify-center text-[11px] text-neon flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-[13px] text-[#8899aa] leading-[1.75]">{step}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
