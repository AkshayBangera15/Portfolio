import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { uploadResume } from "@/lib/data";

export async function POST(req: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    const url = await uploadResume(file);
    if (!url) return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
