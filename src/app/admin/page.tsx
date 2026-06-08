import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  if (isAdminAuthenticated()) redirect("/admin/dashboard");
  return (
    <main className="min-h-screen bg-bg0 flex items-center justify-center px-4">
      {/* grid bg */}
      <div className="hero-grid fixed inset-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-code text-2xl font-bold text-neon mb-1" style={{ textShadow: "var(--glow)" }}>
            ⚡ ADMIN
          </div>
          <p className="text-[10px] text-[#4a5e72] tracking-[3px] uppercase">Secure Control Panel</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
