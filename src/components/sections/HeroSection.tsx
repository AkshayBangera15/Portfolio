"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import type { ContactInfo } from "@/types";

const TITLES = [
  "AI/ML Engineer", 2000,
  "Backend Developer", 2000,
  "Generative AI Enthusiast", 2000,
  "Cloud & Infrastructure Learner", 2000,
  "Computer Networks & DBMS Explorer", 2000,
];

const TERM_LINES = [
  { type: "cmd", text: "whoami" },
  { type: "out", cls: "text-neon4", text: "Akshay Bangera" },

  { type: "cmd", text: "cat profile.json" },
  {
    type: "out",
    cls: "text-neon",
    text: '{ role: "AI/ML + Backend Developer", focus: "GenAI, Backend, Systems" }'
  },

  { type: "cmd", text: "python train_model.py" },
  {
    type: "out",
    cls: "text-amber",
    text: "Training ML model... Accuracy improving ✓"
  },

  { type: "cmd", text: "git log --projects" },
  {
    type: "out",
    cls: "text-neon4",
    text: "Built AI, Backend & Full Stack Projects ✓"
  },

  { type: "cmd", text: "skills --show" },
  {
    type: "out",
    cls: "text-neon",
    text: "Python | SQL | Machine Learning | Firebase | Supabase"
  },

  { type: "cmd", text: "focus --current" },
  {
    type: "out",
    cls: "text-neon4",
    text: "Building scalable systems + intelligent AI solutions ✓"
  },
];

interface Props { contact: ContactInfo | null; }

export default function HeroSection({ contact }: Props) {
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    function addLine() {
      const body = termRef.current;
      if (!body) return;
      if (i >= TERM_LINES.length) {
        setTimeout(() => { if (body) body.innerHTML = ""; i = 0; addLine(); }, 3000);
        return;
      }
      const l = TERM_LINES[i++];
      const div = document.createElement("div");
      div.className = "flex gap-2 mb-1.5 font-code text-[11px]";
      if (l.type === "cmd") {
        div.innerHTML = `<span class="text-neon4 whitespace-nowrap">~$</span><span class="text-[#e2eaf5]">${l.text}</span>`;
      } else {
        div.className = `font-code text-[11px] pl-4 mb-1 ${l.cls}`;
        div.textContent = l.text;
      }
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      setTimeout(addLine, l.type === "cmd" ? 650 : 260);
    }
    const timer = setTimeout(addLine, 800);
    return () => clearTimeout(timer);
  }, []);

  const name    = contact?.name ?? "Akshay Bangera";
  const summary = contact?.hero_summary ??
  "AI/ML and Backend Developer passionate about building intelligent systems, scalable backend architectures, and real-world software solutions. Skilled in Machine Learning, Databases, Computer Networks, and modern backend technologies.";
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated grid */}
      <div className="hero-grid" />

      {/* Orbs */}
      <div className="float-orb absolute w-[400px] h-[400px] rounded-full
                      bg-neon/5 top-[-100px] right-0 blur-[80px]" />
      <div className="float-orb absolute w-[300px] h-[300px] rounded-full
                      bg-neon2/8 bottom-0 left-[-50px] blur-[80px]"
           style={{ animationDelay: "-3s" }} />

      {/* Content */}
      <div className="relative z-10 w-full px-10 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block text-[11px] tracking-[3px] text-neon uppercase
                          border border-neon/20 px-3 py-1 mb-5">
            ⬢ &nbsp;Available for Opportunities
          </div>

          <h1
  className="font-display font-extrabold leading-[0.9] mb-2
             text-[clamp(48px,7vw,90px)]
             bg-gradient-to-br from-white via-neon to-neon2
             bg-clip-text text-transparent"
>
  <span className="block">Akshay</span>
  <span className="block">Bangera</span>
</h1>

          <div className="h-9 overflow-hidden mb-7">
            <p className="font-code text-[18px] text-neon2">
              <TypeAnimation sequence={TITLES} wrapper="span" repeat={Infinity} />
              <span className="inline-block w-0.5 h-[1em] bg-neon2 ml-0.5 cursor-blink align-middle" />
            </p>
          </div>

          <p className="max-w-[540px] text-[#8899aa] text-sm leading-[1.85] mb-9">
            {summary}
          </p>

          <div className="flex gap-4 flex-wrap mb-10">
            <a href="#projects"
               className="btn-clip-primary bg-gradient-to-br from-neon to-neon2
                          text-white font-code text-[12px] tracking-[2px] uppercase
                          px-7 py-3 transition-all duration-300
                          hover:shadow-neon hover:-translate-y-0.5">
              View Projects
            </a>
            <a href="#contact"
               className="btn-clip-outline border border-neon text-neon
                          font-code text-[12px] tracking-[2px] uppercase
                          px-7 py-3 transition-all duration-300
                          hover:bg-neon/8 hover:shadow-neon hover:-translate-y-0.5">
              Get In Touch
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {[
              { label: "⌘", href: contact?.github_url || "#", title: "GitHub" },
              { label: "in", href: contact?.linkedin_url || "#", title: "LinkedIn" },
              {
  label: "✉",
  href: `mailto:${contact?.email ?? "akshay.bangera2004@gmail.com"}`,
  title: "Email"
},
              { label: "◉", href: contact?.twitter_url || "#", title: "Instagram" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                 title={s.title}
                 className="w-10 h-10 border border-[var(--border)] flex items-center
                            justify-center text-[#8899aa] font-code text-xs
                            transition-all duration-300
                            hover:border-neon hover:text-neon hover:shadow-neon
                            hover:-translate-y-1">
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Terminal */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2
                      w-[420px] bg-bg1/92 border border-[var(--border)] backdrop-blur-md">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border)]
                        bg-neon/5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[#4a5e72] text-[10px] tracking-widest">
            bash — system@portfolio:~
          </span>
        </div>
        <div ref={termRef} className="p-4 min-h-[240px] overflow-hidden font-code text-[11px]" />
      </div>
    </section>
  );
}
