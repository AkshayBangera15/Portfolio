import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getProjects, getAchievements, getSkillCategories,
  getExperience, getEducation, getContact,
} from "@/lib/data";
import AdminDashboard from "./AdminDashboard";

export default async function AdminDashboardPage() {
  if (!isAdminAuthenticated()) redirect("/admin");

  const [projects, achievements, skillCategories, experience, education, contact] =
    await Promise.all([
      getProjects(),
      getAchievements(),
      getSkillCategories(),
      getExperience(),
      getEducation(),
      getContact(),
    ]);

  return (
    <AdminDashboard
      initialProjects={projects}
      initialAchievements={achievements}
      initialSkillCategories={skillCategories}
      initialExperience={experience}
      initialEducation={education}
      initialContact={contact}
    />
  );
}
