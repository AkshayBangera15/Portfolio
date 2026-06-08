"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Try again.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}
          className="bg-neon/2 border border-[var(--border)] p-10">
      <div className="font-display text-2xl font-bold mb-1">Admin Access</div>
      <div className="text-[11px] text-[#8899aa] tracking-wide mb-8">SECURE CONTROL PANEL</div>

      {error && (
        <div className="mb-5 px-3 py-2.5 border border-neon3/20 bg-neon3/5
                        text-neon3 text-[11px]">
          ⚠ {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5 mb-4">
        <label className="text-[10px] tracking-[2px] text-neon uppercase">Username</label>
        <input type="text" placeholder="admin" autoComplete="username"
               value={creds.username}
               onChange={(e) => setCreds({ ...creds, username: e.target.value })}
               className="bg-black/40 border border-[var(--border)] px-4 py-2.5 text-[#e2eaf5]
                          font-mono text-[12px] outline-none focus:border-neon transition-colors" />
      </div>

      <div className="flex flex-col gap-1.5 mb-7">
        <label className="text-[10px] tracking-[2px] text-neon uppercase">Password</label>
        <input type="password" placeholder="••••••••" autoComplete="current-password"
               value={creds.password}
               onChange={(e) => setCreds({ ...creds, password: e.target.value })}
               className="bg-black/40 border border-[var(--border)] px-4 py-2.5 text-[#e2eaf5]
                          font-mono text-[12px] outline-none focus:border-neon transition-colors" />
      </div>

      <button type="submit" disabled={loading}
              className="w-full bg-neon text-bg0 font-mono font-bold text-[11px]
                         tracking-[2px] uppercase py-3 border-none cursor-pointer
                         transition-all hover:shadow-neon disabled:opacity-50 mb-3">
        {loading ? "AUTHENTICATING..." : "ACCESS SYSTEM →"}
      </button>

      <a href="/"
         className="block text-center text-[11px] text-[#4a5e72] tracking-wide
                    hover:text-[#8899aa] transition-colors">
        ← Back to Portfolio
      </a>
    </form>
  );
}
