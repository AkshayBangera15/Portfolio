/**
 * Server-side data fetching from Supabase.
 * All functions used in Server Components / Route Handlers.
 */

import { createClient, createServiceClient } from "@/lib/supabase/server";
import type {
  Project,
  Achievement,
  SkillCategory,
  Experience,
  Education,
  ContactInfo,
} from "@/types";

// ── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false });

  if (error) {
    console.error("getProjects:", error.message);
    return [];
  }

  return (data ?? []).map((r) => ({
    ...r,
    skills: r.skills ?? [],
    roadmap: r.roadmap ?? [],
  }));
}

export async function upsertProject(project: Project) {
  const supabase = createServiceClient();

  return supabase
    .from("projects")
    .upsert(project)
    .select()
    .single();
}

export async function deleteProject(id: string) {
  const supabase = createServiceClient();

  return supabase
    .from("projects")
    .delete()
    .eq("id", id);
}

// ── Achievements ────────────────────────────────────────────────────────────

export async function getAchievements(): Promise<Achievement[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("year", { ascending: false });

  if (error) {
    console.error("getAchievements:", error.message);
    return [];
  }

  return (data ?? []).map((r) => ({
    ...r,
    skills: r.skills ?? [],
  }));
}

export async function upsertAchievement(ach: Achievement) {
  const supabase = createServiceClient();

  return supabase
    .from("achievements")
    .upsert(ach)
    .select()
    .single();
}

export async function deleteAchievement(id: string) {
  const supabase = createServiceClient();

  return supabase
    .from("achievements")
    .delete()
    .eq("id", id);
}

// ── Skills ──────────────────────────────────────────────────────────────────

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skill_categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("getSkillCategories:", error.message);
    return [];
  }

  return (data ?? []).map((r) => ({
    ...r,
    skills: r.skills ?? [],
  }));
}

export async function upsertSkillCategory(cat: SkillCategory) {
  const supabase = createServiceClient();

  return supabase
    .from("skill_categories")
    .upsert(cat)
    .select()
    .single();
}

export async function deleteSkillCategory(id: string) {
  const supabase = createServiceClient();

  return supabase
    .from("skill_categories")
    .delete()
    .eq("id", id);
}

// ── Experience ──────────────────────────────────────────────────────────────

export async function getExperience(): Promise<Experience[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getExperience:", error.message);
    return [];
  }

  return data ?? [];
}

export async function upsertExperience(exp: Experience) {
  const supabase = createServiceClient();

  return supabase
    .from("experience")
    .upsert(exp)
    .select()
    .single();
}

export async function deleteExperience(id: string) {
  const supabase = createServiceClient();

  return supabase
    .from("experience")
    .delete()
    .eq("id", id);
}

// ── Education ───────────────────────────────────────────────────────────────

export async function getEducation(): Promise<Education[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("end_date", { ascending: false });

  if (error) {
    console.error("getEducation:", error.message);
    return [];
  }

  return data ?? [];
}

export async function upsertEducation(edu: Education) {
  const supabase = createServiceClient();

  return supabase
    .from("education")
    .upsert(edu)
    .select()
    .single();
}

export async function deleteEducation(id: string) {
  const supabase = createServiceClient();

  return supabase
    .from("education")
    .delete()
    .eq("id", id);
}

// ── Contact ─────────────────────────────────────────────────────────────────

export async function getContact(): Promise<ContactInfo | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("getContact:", error.message);
    return null;
  }

  return data;
}

export async function upsertContact(contact: ContactInfo) {
  const supabase = createServiceClient();

  return supabase
    .from("contact_info")
    .upsert(contact)
    .select()
    .single();
}

// ── Resume Upload (Supabase Storage) ───────────────────────────────────────

export async function uploadResume(
  file: File
): Promise<string | null> {
  const supabase = createServiceClient();

  const fileName = `resume_${Date.now()}.pdf`;

  const { error } = await supabase.storage
    .from("resume")
    .upload(fileName, file, {
      upsert: true,
      contentType: "application/pdf",
    });

  if (error) {
    console.error("uploadResume:", error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("resume")
    .getPublicUrl(fileName);

  return data.publicUrl;
}