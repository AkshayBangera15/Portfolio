/**
 * Generic admin CRUD route: /api/admin/[section]
 * Sections: projects | achievements | skills | experience | education | contact | resume
 */
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  upsertProject, deleteProject,
  upsertAchievement, deleteAchievement,
  upsertSkillCategory, deleteSkillCategory,
  upsertExperience, deleteExperience,
  upsertEducation, deleteEducation,
  upsertContact, uploadResume,
} from "@/lib/data";
import { generateId } from "@/lib/utils";

type Params = { section: string };

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(req: Request, { params }: { params: Params }) {
  if (!isAdminAuthenticated()) return unauthorized();
  const { section } = params;

  if (section === "resume") {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    const url = await uploadResume(file);
    if (!url) return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    return NextResponse.json({ url });
  }

  const body = await req.json();
  const id = body.id ?? generateId();

  const handlers: Record<string, () => Promise<{ data: unknown; error: unknown }>> = {
    projects:     () => upsertProject({ ...body, id }),
    achievements: () => upsertAchievement({ ...body, id }),
    skills:       () => upsertSkillCategory({ ...body, id }),
    experience:   () => upsertExperience({ ...body, id }),
    education:    () => upsertEducation({ ...body, id }),
    contact:      () => upsertContact({ ...body, id }),
  };

  const handler = handlers[section];
  if (!handler) return NextResponse.json({ error: "Unknown section" }, { status: 400 });

  const { data, error } = await handler();
  if (error) return NextResponse.json({ error: String(error) }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  if (!isAdminAuthenticated()) return unauthorized();
  const { section } = params;
  const { id } = await req.json();

  const handlers: Record<string, () => Promise<{ error: unknown }>> = {
    projects:     () => deleteProject(id),
    achievements: () => deleteAchievement(id),
    skills:       () => deleteSkillCategory(id),
    experience:   () => deleteExperience(id),
    education:    () => deleteEducation(id),
  };

  const handler = handlers[section];
  if (!handler) return NextResponse.json({ error: "Unknown section" }, { status: 400 });

  const { error } = await handler();
  if (error) return NextResponse.json({ error: String(error) }, { status: 500 });
  return NextResponse.json({ success: true });
}
