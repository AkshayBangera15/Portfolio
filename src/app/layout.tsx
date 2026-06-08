import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio — AI/ML & Backend Engineer",
  description:
    "A futuristic developer portfolio showcasing AI/ML and backend engineering projects, skills, and experience.",
  openGraph: {
    title: "Portfolio — AI/ML & Backend Engineer",
    description: "Futuristic cyber-tech developer portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(3,11,18,0.95)",
              border: "1px solid rgba(0,245,255,0.25)",
              color: "#00f5ff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.5px",
            },
          }}
        />
      </body>
    </html>
  );
}
