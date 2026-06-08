"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { ContactInfo } from "@/types";

interface Props { contact: ContactInfo | null; }

export default function ContactSection({ contact }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! I'll reply within 24 hours.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send. Please email directly.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const items = [
    { icon: "✉", label: "Email",    value: contact?.email ?? "akshay.bangera2004@gmail.com",  href: `mailto:${contact?.email ?? ""}` },
    { icon: "in", label: "LinkedIn", value: "View Profile",                         href: contact?.linkedin_url ?? "#" },
    { icon: "⌘", label: "GitHub",   value: "View Repositories",                    href: contact?.github_url   ?? "#" },
  ];

  function openResume() {
    if (contact?.resume_url) window.open(contact.resume_url, "_blank");
    else toast.error("Resume not uploaded yet.");
  }

  return (
    <section id="contact" className="py-28">
      <div className="max-w-[1100px] mx-auto px-10">
        <div className="mb-14">
          <div className="flex items-center gap-3 text-[10px] tracking-[4px] text-neon uppercase mb-3">
            <span className="w-10 h-px bg-neon" />07 — Connect
          </div>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)]">
            Get In <span className="text-neon">Touch</span>
          </h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-neon to-transparent mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — links + resume */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-4 mb-8">
              {items.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                   className="flex items-center gap-4 p-4 border border-[var(--border)]
                              transition-all duration-300 hover:border-neon hover:shadow-neon
                              hover:translate-x-1 text-[#e2eaf5] no-underline">
                  <div className="w-9 h-9 bg-neon/6 border border-neon/15 flex items-center
                                  justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8899aa] tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-[13px] text-neon">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume card */}
            <div className="bg-neon/3 border border-neon/15 p-7">
              <h3 className="font-display text-lg font-bold mb-2">Resume</h3>
              <p className="text-[12px] text-[#8899aa] leading-[1.75] mb-5">
                Download or view my full resume to learn more about my experience and projects.
              </p>
              <div className="flex flex-col gap-2.5">
                <button onClick={openResume}
                        className="btn-clip-primary bg-gradient-to-br from-neon to-neon2
                                   text-white font-code text-[12px] tracking-[2px] uppercase
                                   px-6 py-3 border-none cursor-pointer transition-all
                                   hover:shadow-neon hover:-translate-y-0.5 text-center">
                  📄 Open Resume PDF
                </button>
                <button onClick={() => {
                          if (contact?.resume_url) {
                            const a = document.createElement("a");
                            a.href = contact.resume_url;
                            a.download = "resume.pdf";
                            a.click();
                          } else toast.error("Resume not uploaded yet.");
                        }}
                        className="btn-clip-outline border border-neon text-neon font-code
                                   text-[12px] tracking-[2px] uppercase px-6 py-3 bg-transparent
                                   cursor-pointer transition-all hover:bg-neon/8
                                   hover:shadow-neon hover:-translate-y-0.5 text-center">
                  ⬇ Download Resume
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-[#8899aa] leading-[1.85] mb-6">
              Have a project in mind or want to discuss opportunities? Drop me a message and I'll
              get back within 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {(["name", "email"] as const).map((field) => (
                <input key={field}
                       type={field === "email" ? "email" : "text"}
                       placeholder={field === "name" ? "Your Name" : "Email Address"}
                       value={form[field]}
                       onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                       className="w-full bg-black/30 border border-[var(--border)] px-4 py-3
                                  text-[#e2eaf5] font-mono text-[12px] outline-none
                                  transition-colors focus:border-neon placeholder:text-[#4a5e72]" />
              ))}
              <textarea
                placeholder="Your Message..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-black/30 border border-[var(--border)] px-4 py-3
                           text-[#e2eaf5] font-mono text-[12px] outline-none resize-none
                           transition-colors focus:border-neon placeholder:text-[#4a5e72]"
              />
              <button type="submit" disabled={sending}
                      className="btn-clip-primary bg-gradient-to-br from-neon to-neon2
                                 text-white font-code text-[12px] tracking-[2px] uppercase
                                 px-6 py-3 border-none cursor-pointer transition-all
                                 hover:shadow-neon hover:-translate-y-0.5 disabled:opacity-50">
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
