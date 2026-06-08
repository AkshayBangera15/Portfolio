import { NextResponse } from "next/server";
import { checkCredentials, SESSION_COOKIE, SESSION_VALUE, COOKIE_OPTIONS } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!checkCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, SESSION_VALUE, COOKIE_OPTIONS);
    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
