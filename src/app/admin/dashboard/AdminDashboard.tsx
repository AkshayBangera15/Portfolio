"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { generateId } from "@/lib/utils";
import type {
  Project, Achievement, SkillCategory,
  Experience, Education, ContactInfo,
} from "@/types";

// ── Shared UI helpers ─────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] tracking-[2px] text-neon uppercase mb-1 block">{children}</label>;
}
function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props}
      className="w-full bg-black/40 border border-[var(--border)] px-3 py-2.5 text-[#e2eaf5]
                 font-mono text-[12px] outline-none focus:border-neon transition-colors
                 placeholder:text-[#4a5e72]" />
  );
}
function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props}
      className="w-full bg-black/40 border border-[var(--border)] px-3 py-2.5 text-[#e2eaf5]
                 font-mono text-[12px] outline-none focus:border-neon transition-colors resize-y
                 placeholder:text-[#4a5e72] min-h-[90px]" />
  );
}
function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props}
      className="w-full bg-black/40 border border-[var(--border)] px-3 py-2.5 text-[#e2eaf5]
                 font-mono text-[12px] outline-none focus:border-neon transition-colors cursor-pointer">
      {children}
    </select>
  );
}
function SaveBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="bg-neon text-bg0 font-mono font-bold text-[11px] tracking-[1px] uppercase
                 px-5 py-2.5 border-none cursor-pointer transition-all hover:shadow-neon
                 disabled:opacity-50">
      {children}
    </button>
  );
}
function CancelBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="bg-transparent border border-[var(--border)] text-[#8899aa] font-mono
                 text-[11px] tracking-[1px] uppercase px-5 py-2.5 cursor-pointer
                 transition-all hover:border-[#8899aa] hover:text-[#e2eaf5]">
      Cancel
    </button>
  );
}
function TagInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [val, setVal] = useState("");
  function add() {
    const v = val.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setVal("");
  }
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input value={val} onChange={(e) => setVal(e.target.value)}
               onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); }}}
               placeholder="Type skill and press Enter or Add…"
               className="flex-1 bg-black/40 border border-[var(--border)] px-3 py-2 text-[#e2eaf5]
                          font-mono text-[12px] outline-none focus:border-neon transition-colors
                          placeholder:text-[#4a5e72]" />
        <button type="button" onClick={add}
                className="border border-neon/25 text-neon px-4 font-mono text-[11px]
                           transition-all hover:bg-neon/10 whitespace-nowrap">
          + Add
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span key={t}
                className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 border
                           border-neon/20 text-neon bg-neon/4">
            {t}
            <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))}
                    className="text-neon3 hover:text-white transition-colors leading-none">×</button>
          </span>
        ))}
      </div>
    </div>
  );
}
function ListItem({ title, sub, onEdit, onDelete }: { title: string; sub?: string; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-black/25 border border-[var(--border)]
                    px-5 py-4 transition-colors hover:border-neon/20">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium truncate">{title}</div>
        {sub && <div className="text-[11px] text-[#8899aa] mt-0.5">{sub}</div>}
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={onEdit}
                className="border border-neon/25 text-neon px-3 py-1.5 font-mono text-[10px]
                           tracking-wide uppercase transition-all hover:bg-neon/10">
          Edit
        </button>
        <button onClick={onDelete}
                className="border border-neon3/25 text-neon3 px-3 py-1.5 font-mono text-[10px]
                           tracking-wide uppercase transition-all hover:bg-neon3/10">
          Delete
        </button>
      </div>
    </div>
  );
}
function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="font-display text-xl font-bold">{title}</div>
      <button onClick={onAdd}
              className="bg-gradient-to-br from-neon to-neon2 text-white border-none
                         font-mono text-[11px] tracking-wide uppercase px-5 py-2.5
                         cursor-pointer transition-all hover:shadow-neon">
        + Add
      </button>
    </div>
  );
}
function FormCard({ title, children, onSave, onCancel, saving }:
  { title: string; children: React.ReactNode; onSave: () => void; onCancel: () => void; saving?: boolean }) {
  return (
    <div className="bg-neon/2 border border-[var(--border)] p-6 mb-6">
      <div className="text-[11px] tracking-[2px] text-neon uppercase mb-5 pb-3
                      border-b border-[var(--border)]">
        {title}
      </div>
      <div className="space-y-4">{children}</div>
      <div className="flex gap-3 mt-6">
        <SaveBtn onClick={onSave} disabled={saving}>{saving ? "Saving…" : "Save"}</SaveBtn>
        <CancelBtn onClick={onCancel} />
      </div>
    </div>
  );
}
function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}

// ── API helpers ───────────────────────────────────────────────────────────────
async function apiSave(section: string, data: any) {
  const res = await fetch(`/api/admin/${section}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error ?? "Save failed");
  return res.json();
}
async function apiDelete(section: string, id: string) {
  const res = await fetch(`/api/admin/${section}`, {
    method: "DELETE", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Delete failed");
}

// ── Types for editing state ───────────────────────────────────────────────────
type Tab = "projects" | "skills" | "achievements" | "experience" | "education" | "contact" | "resume";
const TABS: Tab[] = ["projects", "skills", "achievements", "experience", "education", "contact", "resume"];

interface Props {
  initialProjects: Project[];
  initialAchievements: Achievement[];
  initialSkillCategories: SkillCategory[];
  initialExperience: Experience[];
  initialEducation: Education[];
  initialContact: ContactInfo | null;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminDashboard({
  initialProjects, initialAchievements, initialSkillCategories,
  initialExperience, initialEducation, initialContact,
}: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("projects");

  const [projects, setProjects] = useState(initialProjects);
  const [achievements, setAchievements] = useState(initialAchievements);
  const [skillCats, setSkillCats] = useState(initialSkillCategories);
  const [experience, setExperience] = useState(initialExperience);
  const [education, setEducation] = useState(initialEducation);
  const [contact, setContact] = useState<ContactInfo>(
    initialContact ?? {
      id: generateId(), name: "", email: "", linkedin_url: "", github_url: "",
      twitter_url: "", hero_summary: "", resume_url: "",
    }
  );

  // form visibility
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── Projects ──────────────────────────────────────────────────────────────
  const blankProj = (): Project => ({
    id: generateId(), title: "", description: "", skills: [], year: new Date().getFullYear(),
    roadmap: [], github_url: "", demo_url: "",
  });
  const [proj, setProj] = useState<Project>(blankProj());

  async function saveProject() {
    if (!proj.title || !proj.description) { toast.error("Title and description required."); return; }
    setSaving(true);
    try {
      await apiSave("projects", proj);
      const exists = projects.find((p) => p.id === proj.id);
      setProjects(exists ? projects.map((p) => p.id === proj.id ? proj : p) : [proj, ...projects]);
      setShowForm(false); setProj(blankProj());
      toast.success(exists ? "Project updated!" : "Project added!");
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }
  async function deleteProjectItem(id: string) {
    if (!confirm("Delete this project?")) return;
    try { await apiDelete("projects", id); setProjects(projects.filter((p) => p.id !== id)); toast.success("Deleted."); }
    catch (e: any) { toast.error(e.message); }
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  const SKILL_CATS = ["Languages", "Core CS", "Databases", "Technologies & Tools"];
  const blankSkill = (): SkillCategory => ({ id: generateId(), name: "Languages", skills: [] });
  const [skill, setSkill] = useState<SkillCategory>(blankSkill());

  async function saveSkill() {
    if (!skill.name) { toast.error("Category name required."); return; }
    setSaving(true);
    try {
      await apiSave("skills", skill);
      const exists = skillCats.find((s) => s.id === skill.id);
      setSkillCats(exists ? skillCats.map((s) => s.id === skill.id ? skill : s) : [skill, ...skillCats]);
      setShowForm(false); setSkill(blankSkill());
      toast.success(exists ? "Skills updated!" : "Skill category added!");
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }
  async function deleteSkillItem(id: string) {
    if (!confirm("Delete this skill category?")) return;
    try { await apiDelete("skills", id); setSkillCats(skillCats.filter((s) => s.id !== id)); toast.success("Deleted."); }
    catch (e: any) { toast.error(e.message); }
  }

  // ── Achievements ──────────────────────────────────────────────────────────
  const blankAch = (): Achievement => ({ id: generateId(), title: "", description: "", skills: [], year: new Date().getFullYear() });
  const [ach, setAch] = useState<Achievement>(blankAch());

  async function saveAchievement() {
    if (!ach.title || !ach.description) { toast.error("Title and description required."); return; }
    setSaving(true);
    try {
      await apiSave("achievements", ach);
      const exists = achievements.find((a) => a.id === ach.id);
      setAchievements(exists ? achievements.map((a) => a.id === ach.id ? ach : a) : [ach, ...achievements]);
      setShowForm(false); setAch(blankAch());
      toast.success(exists ? "Updated!" : "Achievement added!");
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }
  async function deleteAchievementItem(id: string) {
    if (!confirm("Delete this achievement?")) return;
    try { await apiDelete("achievements", id); setAchievements(achievements.filter((a) => a.id !== id)); toast.success("Deleted."); }
    catch (e: any) { toast.error(e.message); }
  }

  // ── Experience ────────────────────────────────────────────────────────────
  const blankExp = (): Experience => ({ id: generateId(), title: "", company: "", description: "", start_date: "", end_date: "" });
  const [exp, setExp] = useState<Experience>(blankExp());

  async function saveExp() {
    if (!exp.title || !exp.company) { toast.error("Title and company required."); return; }
    setSaving(true);
    try {
      await apiSave("experience", exp);
      const exists = experience.find((e) => e.id === exp.id);
      setExperience(exists ? experience.map((e) => e.id === exp.id ? exp : e) : [exp, ...experience]);
      setShowForm(false); setExp(blankExp());
      toast.success(exists ? "Updated!" : "Experience added!");
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }
  async function deleteExpItem(id: string) {
    if (!confirm("Delete this experience?")) return;
    try { await apiDelete("experience", id); setExperience(experience.filter((e) => e.id !== id)); toast.success("Deleted."); }
    catch (e: any) { toast.error(e.message); }
  }

  // ── Education ─────────────────────────────────────────────────────────────
  const blankEdu = (): Education => ({
    id: generateId(), institution: "", degree: "", branch: "",
    start_date: "", end_date: "", score_type: "CGPA", score: "", coursework: "",
  });
  const [edu, setEdu] = useState<Education>(blankEdu());

  async function saveEdu() {
    if (!edu.institution || !edu.degree) { toast.error("Institution and degree required."); return; }
    setSaving(true);
    try {
      await apiSave("education", edu);
      const exists = education.find((e) => e.id === edu.id);
      setEducation(exists ? education.map((e) => e.id === edu.id ? edu : e) : [edu, ...education]);
      setShowForm(false); setEdu(blankEdu());
      toast.success(exists ? "Updated!" : "Education added!");
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }
  async function deleteEduItem(id: string) {
    if (!confirm("Delete this education?")) return;
    try { await apiDelete("education", id); setEducation(education.filter((e) => e.id !== id)); toast.success("Deleted."); }
    catch (e: any) { toast.error(e.message); }
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  async function saveContact() {
    setSaving(true);
    try {
      await apiSave("contact", contact);
      toast.success("Contact info saved!");
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }

  // ── Resume ────────────────────────────────────────────────────────────────
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState(initialContact?.resume_url ?? "");
  const [uploading, setUploading] = useState(false);

  async function uploadResumeFile() {
    if (!resumeFile) { toast.error("Select a file first."); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", resumeFile);
      const res = await fetch("/api/admin/resume", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setResumeUrl(url);
      setContact({ ...contact, resume_url: url });
      await apiSave("contact", { ...contact, resume_url: url });
      toast.success("Resume uploaded and saved!");
    } catch (e: any) { toast.error(e.message); }
    finally { setUploading(false); }
  }
  async function saveResumeUrl() {
    if (!resumeUrl) { toast.error("Enter a URL first."); return; }
    setSaving(true);
    try {
      const updated = { ...contact, resume_url: resumeUrl };
      await apiSave("contact", updated);
      setContact(updated);
      toast.success("Resume URL saved!");
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  }

  // ── Logout ────────────────────────────────────────────────────────────────
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg0">
      {/* Nav */}
      <div className="sticky top-0 z-50 bg-bg1 border-b border-[var(--border)] px-8 py-3
                      flex items-center gap-3 flex-wrap">
        <div className="font-display text-base font-bold text-neon mr-4">⚡ ADMIN</div>
        <div className="flex gap-1 flex-wrap flex-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => { setTab(t); setShowForm(false); }}
                    className={`px-4 py-2 font-mono text-[11px] tracking-wide uppercase
                               border-b-2 transition-all duration-200
                               ${tab === t
                                 ? "text-neon border-neon"
                                 : "text-[#8899aa] border-transparent hover:text-[#e2eaf5]"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto flex-shrink-0">
          <a href="/" target="_blank"
             className="border border-[var(--border)] text-[#8899aa] px-3 py-1.5 font-mono
                        text-[10px] tracking-wide uppercase hover:border-neon hover:text-neon
                        transition-all">
            ↗ View Site
          </a>
          <button onClick={logout}
                  className="border border-neon3/30 text-neon3 px-3 py-1.5 font-mono
                             text-[10px] tracking-wide uppercase hover:bg-neon3/10 transition-all">
            ✕ Logout
          </button>
        </div>
      </div>

      <div className="max-w-[880px] mx-auto px-8 py-10">

        {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
        {tab === "projects" && (
          <div>
            <SectionHeader title="Manage Projects" onAdd={() => { setProj(blankProj()); setShowForm(true); }} />
            {showForm && (
              <FormCard title={proj.id && projects.find(p=>p.id===proj.id) ? "EDIT PROJECT" : "ADD PROJECT"}
                        onSave={saveProject} onCancel={() => setShowForm(false)} saving={saving}>
                <Grid2>
                  <div><Label>Title *</Label><Input value={proj.title} onChange={(e) => setProj({ ...proj, title: e.target.value })} placeholder="Project name" /></div>
                  <div><Label>Year *</Label><Input type="number" value={proj.year} onChange={(e) => setProj({ ...proj, year: +e.target.value })} /></div>
                </Grid2>
                <div><Label>Description *</Label><Textarea value={proj.description} onChange={(e) => setProj({ ...proj, description: e.target.value })} placeholder="What does this project do?" /></div>
                <Grid2>
                  <div><Label>GitHub URL</Label><Input value={proj.github_url ?? ""} onChange={(e) => setProj({ ...proj, github_url: e.target.value })} placeholder="https://github.com/..." /></div>
                  <div><Label>Demo / Live URL</Label><Input value={proj.demo_url ?? ""} onChange={(e) => setProj({ ...proj, demo_url: e.target.value })} placeholder="https://..." /></div>
                </Grid2>
                <div>
                  <Label>Skills Used</Label>
                  <TagInput tags={proj.skills} onChange={(s) => setProj({ ...proj, skills: s })} />
                </div>
                <div>
                  <Label>Build Roadmap — one step per line</Label>
                  <Textarea
                    value={proj.roadmap.join("\n")}
                    onChange={(e) => setProj({ ...proj, roadmap: e.target.value.split("\n") })}
                    placeholder={"Step 1: Define architecture\nStep 2: Build the API\nStep 3: Deploy on Kubernetes"}
                    style={{ minHeight: 120 }}
                  />
                </div>
              </FormCard>
            )}
            <div className="flex flex-col gap-2.5">
              {projects.map((p) => (
                <ListItem key={p.id} title={p.title} sub={`${p.year} · ${p.skills.slice(0,4).join(", ")}`}
                          onEdit={() => { setProj(p); setShowForm(true); }}
                          onDelete={() => deleteProjectItem(p.id)} />
              ))}
              {!projects.length && <p className="text-[#4a5e72] text-[12px] py-4">No projects yet. Click + Add.</p>}
            </div>
          </div>
        )}

        {/* ── SKILLS ───────────────────────────────────────────────────────── */}
        {tab === "skills" && (
          <div>
            <SectionHeader title="Manage Skills" onAdd={() => { setSkill(blankSkill()); setShowForm(true); }} />
            {showForm && (
              <FormCard title="ADD / EDIT SKILL CATEGORY" onSave={saveSkill} onCancel={() => setShowForm(false)} saving={saving}>
                <Grid2>
                  <div>
                    <Label>Category *</Label>
                    <Select value={skill.name} onChange={(e) => setSkill({ ...skill, name: e.target.value })}>
                      {SKILL_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </Select>
                  </div>
                </Grid2>
                <div>
                  <Label>Skills</Label>
                  <TagInput tags={skill.skills} onChange={(s) => setSkill({ ...skill, skills: s })} />
                </div>
              </FormCard>
            )}
            <div className="flex flex-col gap-2.5">
              {skillCats.map((s) => (
                <ListItem key={s.id} title={s.name} sub={s.skills.join(", ")}
                          onEdit={() => { setSkill(s); setShowForm(true); }}
                          onDelete={() => deleteSkillItem(s.id)} />
              ))}
              {!skillCats.length && <p className="text-[#4a5e72] text-[12px] py-4">No skill categories yet.</p>}
            </div>
          </div>
        )}

        {/* ── ACHIEVEMENTS ─────────────────────────────────────────────────── */}
        {tab === "achievements" && (
          <div>
            <SectionHeader title="Manage Achievements" onAdd={() => { setAch(blankAch()); setShowForm(true); }} />
            {showForm && (
              <FormCard title="ADD / EDIT ACHIEVEMENT" onSave={saveAchievement} onCancel={() => setShowForm(false)} saving={saving}>
                <Grid2>
                  <div><Label>Title *</Label><Input value={ach.title} onChange={(e) => setAch({ ...ach, title: e.target.value })} placeholder="Achievement title" /></div>
                  <div><Label>Year *</Label><Input type="number" value={ach.year} onChange={(e) => setAch({ ...ach, year: +e.target.value })} /></div>
                </Grid2>
                <div><Label>Description *</Label><Textarea value={ach.description} onChange={(e) => setAch({ ...ach, description: e.target.value })} placeholder="Describe this achievement..." /></div>
                <div><Label>Skills Used</Label><TagInput tags={ach.skills} onChange={(s) => setAch({ ...ach, skills: s })} /></div>
              </FormCard>
            )}
            <div className="flex flex-col gap-2.5">
              {achievements.map((a) => (
                <ListItem key={a.id} title={a.title} sub={String(a.year)}
                          onEdit={() => { setAch(a); setShowForm(true); }}
                          onDelete={() => deleteAchievementItem(a.id)} />
              ))}
              {!achievements.length && <p className="text-[#4a5e72] text-[12px] py-4">No achievements yet.</p>}
            </div>
          </div>
        )}

        {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
        {tab === "experience" && (
          <div>
            <SectionHeader title="Manage Experience" onAdd={() => { setExp(blankExp()); setShowForm(true); }} />
            {showForm && (
              <FormCard title="ADD / EDIT EXPERIENCE" onSave={saveExp} onCancel={() => setShowForm(false)} saving={saving}>
                <Grid2>
                  <div><Label>Job Title *</Label><Input value={exp.title} onChange={(e) => setExp({ ...exp, title: e.target.value })} placeholder="Senior Engineer" /></div>
                  <div><Label>Company *</Label><Input value={exp.company} onChange={(e) => setExp({ ...exp, company: e.target.value })} placeholder="Company Name" /></div>
                  <div><Label>Start Date *</Label><Input value={exp.start_date} onChange={(e) => setExp({ ...exp, start_date: e.target.value })} placeholder="Jan 2022" /></div>
                  <div><Label>End Date *</Label><Input value={exp.end_date} onChange={(e) => setExp({ ...exp, end_date: e.target.value })} placeholder="Present" /></div>
                </Grid2>
                <div><Label>Description *</Label><Textarea value={exp.description} onChange={(e) => setExp({ ...exp, description: e.target.value })} placeholder="Describe your role and key achievements..." /></div>
              </FormCard>
            )}
            <div className="flex flex-col gap-2.5">
              {experience.map((e) => (
                <ListItem key={e.id} title={e.title} sub={`${e.company} · ${e.start_date} – ${e.end_date}`}
                          onEdit={() => { setExp(e); setShowForm(true); }}
                          onDelete={() => deleteExpItem(e.id)} />
              ))}
              {!experience.length && <p className="text-[#4a5e72] text-[12px] py-4">No experience yet.</p>}
            </div>
          </div>
        )}

        {/* ── EDUCATION ────────────────────────────────────────────────────── */}
        {tab === "education" && (
          <div>
            <SectionHeader title="Manage Education" onAdd={() => { setEdu(blankEdu()); setShowForm(true); }} />
            {showForm && (
              <FormCard title="ADD / EDIT EDUCATION" onSave={saveEdu} onCancel={() => setShowForm(false)} saving={saving}>
                <div><Label>Institution / College / School *</Label><Input value={edu.institution} onChange={(e) => setEdu({ ...edu, institution: e.target.value })} placeholder="IIT Bombay / MIT" /></div>
                <Grid2>
                  <div><Label>Degree *</Label><Input value={edu.degree} onChange={(e) => setEdu({ ...edu, degree: e.target.value })} placeholder="B.Tech / M.S. / High School" /></div>
                  <div><Label>Branch / Specialization *</Label><Input value={edu.branch} onChange={(e) => setEdu({ ...edu, branch: e.target.value })} placeholder="Computer Science" /></div>
                  <div><Label>Start Date *</Label><Input value={edu.start_date} onChange={(e) => setEdu({ ...edu, start_date: e.target.value })} placeholder="2019" /></div>
                  <div><Label>End Date *</Label><Input value={edu.end_date} onChange={(e) => setEdu({ ...edu, end_date: e.target.value })} placeholder="2023" /></div>
                  <div>
                    <Label>Score Type</Label>
                    <Select value={edu.score_type} onChange={(e) => setEdu({ ...edu, score_type: e.target.value as "CGPA" | "Percentage" })}>
                      <option value="CGPA">CGPA</option>
                      <option value="Percentage">Percentage</option>
                    </Select>
                  </div>
                  <div><Label>Score Value *</Label><Input value={edu.score} onChange={(e) => setEdu({ ...edu, score: e.target.value })} placeholder="9.2 or 94" /></div>
                </Grid2>
                <div><Label>Key Coursework (comma-separated)</Label><Input value={edu.coursework ?? ""} onChange={(e) => setEdu({ ...edu, coursework: e.target.value })} placeholder="Algorithms, ML, Distributed Systems, OS" /></div>
              </FormCard>
            )}
            <div className="flex flex-col gap-2.5">
              {education.map((e) => (
                <ListItem key={e.id} title={`${e.degree} — ${e.institution}`} sub={`${e.branch} · ${e.start_date} – ${e.end_date}`}
                          onEdit={() => { setEdu(e); setShowForm(true); }}
                          onDelete={() => deleteEduItem(e.id)} />
              ))}
              {!education.length && <p className="text-[#4a5e72] text-[12px] py-4">No education yet.</p>}
            </div>
          </div>
        )}

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        {tab === "contact" && (
          <div>
            <div className="font-display text-xl font-bold mb-6">Contact Information</div>
            <div className="bg-neon/2 border border-[var(--border)] p-6 space-y-4">
              <div className="text-[11px] tracking-[2px] text-neon uppercase mb-5 pb-3 border-b border-[var(--border)]">EDIT CONTACT DETAILS</div>
              <Grid2>
                <div><Label>Full Name</Label><Input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Your Name" /></div>
                <div><Label>Email</Label><Input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" /></div>
                <div><Label>LinkedIn URL</Label><Input value={contact.linkedin_url ?? ""} onChange={(e) => setContact({ ...contact, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
                <div><Label>GitHub URL</Label><Input value={contact.github_url ?? ""} onChange={(e) => setContact({ ...contact, github_url: e.target.value })} placeholder="https://github.com/..." /></div>
                <div><Label>Twitter / X URL</Label><Input value={contact.twitter_url ?? ""} onChange={(e) => setContact({ ...contact, twitter_url: e.target.value })} placeholder="https://twitter.com/..." /></div>
              </Grid2>
              <div><Label>Hero Summary (shown on homepage)</Label><Textarea value={contact.hero_summary} onChange={(e) => setContact({ ...contact, hero_summary: e.target.value })} placeholder="Brief bio text shown in the hero section..." /></div>
              <SaveBtn onClick={saveContact} disabled={saving}>{saving ? "Saving…" : "Save Contact Info"}</SaveBtn>
            </div>
          </div>
        )}

        {/* ── RESUME ───────────────────────────────────────────────────────── */}
        {tab === "resume" && (
          <div>
            <div className="font-display text-xl font-bold mb-6">Resume Management</div>
            <div className="bg-neon/2 border border-[var(--border)] p-6 space-y-6">
              <div className="text-[11px] tracking-[2px] text-neon uppercase pb-3 border-b border-[var(--border)]">UPLOAD OR LINK RESUME</div>
              {/* Upload */}
              <div>
                <Label>Upload PDF File</Label>
                <div
                  onClick={() => document.getElementById("resumeFileInput")?.click()}
                  className="border-2 border-dashed border-neon/20 p-8 text-center cursor-pointer
                             transition-all hover:border-neon hover:bg-neon/3">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="text-[12px] text-[#8899aa]">
                    {resumeFile ? resumeFile.name : "Click to select resume PDF"}
                  </p>
                  <p className="text-[10px] text-[#4a5e72] mt-1">PDF format recommended</p>
                  <input id="resumeFileInput" type="file" accept=".pdf,.doc,.docx"
                         className="hidden"
                         onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
                </div>
                <button onClick={uploadResumeFile} disabled={uploading || !resumeFile}
                        className="mt-3 bg-neon text-bg0 font-mono font-bold text-[11px]
                                   tracking-wide uppercase px-5 py-2.5 border-none cursor-pointer
                                   transition-all hover:shadow-neon disabled:opacity-50">
                  {uploading ? "Uploading…" : "Upload to Supabase Storage"}
                </button>
              </div>

              {/* Or URL */}
              <div>
                <Label>Or paste a direct PDF / Google Drive URL</Label>
                <div className="flex gap-2">
                  <Input value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)}
                         placeholder="https://drive.google.com/... or direct PDF link" />
                  <button onClick={saveResumeUrl} disabled={saving}
                          className="bg-neon text-bg0 font-mono font-bold text-[11px] tracking-wide
                                     uppercase px-4 py-2.5 border-none cursor-pointer whitespace-nowrap
                                     transition-all hover:shadow-neon disabled:opacity-50">
                    {saving ? "Saving…" : "Save URL"}
                  </button>
                </div>
              </div>

              {resumeUrl && (
                <div className="border border-neon4/20 bg-neon4/3 px-4 py-3 text-[12px] text-neon4">
                  ✓ Resume set: <a href={resumeUrl} target="_blank" rel="noreferrer"
                                   className="underline hover:text-white transition-colors">{resumeUrl}</a>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
