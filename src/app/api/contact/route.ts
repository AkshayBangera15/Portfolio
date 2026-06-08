import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    // TODO: integrate with email service (Resend, SendGrid, etc.)
    // For now we just log it. Replace with your email provider:
    // await resend.emails.send({ from: "...", to: "...", subject: "...", text: message });
    console.log("Contact form submission:", { name, email, message });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
