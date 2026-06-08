import {
  getProjects, getAchievements, getSkillCategories,
  getExperience, getEducation, getContact,
} from "@/lib/data";
import Navbar        from "@/components/sections/Navbar";
import HeroSection   from "@/components/sections/HeroSection";
import AboutSection  from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection    from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ExperienceSection  from "@/components/sections/ExperienceSection";
import EducationSection   from "@/components/sections/EducationSection";
import ContactSection     from "@/components/sections/ContactSection";
import Footer        from "@/components/sections/Footer";

export const revalidate = 60; // ISR — revalidate every 60 s

export default async function Home() {
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
    <main className="min-h-screen bg-bg0">
      <Navbar />
      <HeroSection contact={contact} />
      <AboutSection contact={contact} />
      <SkillsSection categories={skillCategories} />
      <ProjectsSection projects={projects} />
      <AchievementsSection achievements={achievements} />
      <ExperienceSection experience={experience} />
      <EducationSection education={education} />
      <ContactSection contact={contact} />
      <Footer contact={contact} />
    </main>
  );
}
