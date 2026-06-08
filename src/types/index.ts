// ── Portfolio Data Types ───────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  github_url?: string;
  demo_url?: string;
  year: number;
  roadmap: string[]; // ordered steps explaining how the project was built
  images?: string[];
  created_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  skills: string[];
  year: number;
  created_at?: string;
}

export interface SkillCategory {
  id: string;
  name: string; // "Languages" | "Core CS" | "Databases" | "Technologies & Tools"
  skills: string[];
  created_at?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  description: string;
  start_date: string; // e.g. "Jan 2022"
  end_date: string;   // e.g. "Present"
  created_at?: string;
}

export type ScoreType = "CGPA" | "Percentage";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  branch: string;
  start_date: string;
  end_date: string;
  score_type: ScoreType;
  score: string;
  coursework?: string;
  created_at?: string;
}

export interface ContactInfo {
  id: string;
  name: string;
  email: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  hero_summary: string;
  resume_url?: string;
  updated_at?: string;
}

// ── Admin form types ───────────────────────────────────────────────────────────

export type ProjectFormData = Omit<Project, "id" | "created_at">;
export type AchievementFormData = Omit<Achievement, "id" | "created_at">;
export type ExperienceFormData = Omit<Experience, "id" | "created_at">;
export type EducationFormData = Omit<Education, "id" | "created_at">;
export type ContactFormData = Omit<ContactInfo, "id" | "updated_at">;

// ── API response wrapper ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}
