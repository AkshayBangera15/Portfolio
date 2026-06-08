/**
 * Simple cookie-based admin auth.
 * For production, replace with Supabase Auth or NextAuth.js.
 */
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE  = "authenticated";

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export function checkCredentials(username: string, password: string): boolean {
  console.log("ENV USER:", process.env.ADMIN_USERNAME);
  console.log("ENV PASS:", process.env.ADMIN_PASSWORD);
  console.log("INPUT USER:", username);
  console.log("INPUT PASS:", password);

  return true;
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 8, // 8 hours
  path: "/",
};

export { SESSION_COOKIE, SESSION_VALUE };
