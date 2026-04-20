"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../admin.css";

const socialPlatforms = ["LinkedIn", "LeetCode", "GitHub", "YouTube", "Instagram", "Facebook"];
const splitList = (value) => value.split(",").map((item) => item.trim()).filter(Boolean);
const joinList = (value) => value.join(", ");
const emptyProject = () => ({ name: "", image: "", link: "", description: "", frontend: [], backend: [] });
const emptyUpcoming = () => ({ name: "", status: "" });
const emptyEducation = () => ({ title: "", subtitle: "", detail: "", school: "", link: "", side: "left" });
const emptyHighlight = () => ({ title: "", text: "" });
const emptySocial = () => ({ platform: "LinkedIn", url: "", color: "#f4b400" });

export default function AdminEditor() {
  const router = useRouter();
  const [draft, setDraft] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/admin/content", { cache: "no-store" });

        if (response.status === 401) {
          router.push("/admin/login");
          router.refresh();
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load admin content.");
        }

        const data = await response.json();
        setDraft(data);
      } catch (err) {
        setError(err.message || "Unable to load content.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [router]);

  const updateSection = (section, key, value) => {
    setDraft((current) => ({ ...current, [section]: { ...current[section], [key]: value } }));
  };

  const replaceList = (section, listKey, nextList) => {
    setDraft((current) => ({ ...current, [section]: { ...current[section], [listKey]: nextList } }));
  };

  const updateListItem = (section, listKey, index, key, value) => {
    replaceList(section, listKey, draft[section][listKey].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  };

  const addItem = (section, listKey, item) => replaceList(section, listKey, [...draft[section][listKey], item]);
  const removeItem = (section, listKey, index) => replaceList(section, listKey, draft[section][listKey].filter((_, itemIndex) => itemIndex !== index));

  const saveDraft = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (response.status === 401) {
        router.push("/admin/login");
        router.refresh();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save content.");
      }

      setDraft(data);
      setMessage("Changes saved successfully.");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to save content.");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  if (loading) {
    return <main className="admin-page"><div className="container admin-shell py-5">Loading dashboard...</div></main>;
  }

  if (!draft) {
    return <main className="admin-page"><div className="container admin-shell py-5 text-danger">{error || "Unable to load dashboard."}</div></main>;
  }

  return (
    <main className="admin-page">
      <div className="container admin-shell">
        <div className="admin-header">
          <div>
            <p className="admin-kicker">Professional Admin Dashboard</p>
            <h1>Manage portfolio content</h1>
            <p className="admin-subtitle">Update projects, skills, education, hero copy, social links, and contact content from one protected dashboard.</p>
          </div>
          <div className="admin-toolbar">
            <button className="btn btn-warning fw-semibold" type="button" onClick={saveDraft} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
            <button className="btn btn-outline-light" type="button" onClick={logout}>Logout</button>
          </div>
        </div>

        {message ? <div className="alert alert-success rounded-4 border-0">{message}</div> : null}
        {error ? <div className="alert alert-danger rounded-4 border-0">{error}</div> : null}

        <section className="admin-section-card">
          <h2>Home Section</h2>
          <p className="admin-help">Controls the hero area on your landing page.</p>
          <div className="admin-grid">
            <div className="admin-field"><label>Greeting</label><input value={draft.home.greeting} onChange={(e) => updateSection("home", "greeting", e.target.value)} /></div>
            <div className="admin-field"><label>Role / Subtitle</label><input value={draft.home.role} onChange={(e) => updateSection("home", "role", e.target.value)} /></div>
            <div className="admin-field"><label>Resume URL</label><input value={draft.home.resumeUrl} onChange={(e) => updateSection("home", "resumeUrl", e.target.value)} /></div>
            <div className="admin-field"><label>Resume Button Label</label><input value={draft.home.resumeLabel} onChange={(e) => updateSection("home", "resumeLabel", e.target.value)} /></div>
            <div className="admin-field"><label>Profile Image URL</label><input value={draft.home.profileImage} onChange={(e) => updateSection("home", "profileImage", e.target.value)} /></div>
          </div>
          <div className="admin-grid mt-3">
            <div className="admin-field"><label>Summary</label><textarea value={draft.home.summary} onChange={(e) => updateSection("home", "summary", e.target.value)} /></div>
            <div className="admin-field"><label>Description</label><textarea value={draft.home.description} onChange={(e) => updateSection("home", "description", e.target.value)} /></div>
          </div>
        </section>

        <section className="admin-section-card">
          <h2>About and Skills</h2>
          <p className="admin-help">Edit the about text, highlights, and skill badges.</p>
          <div className="admin-grid">
            <div className="admin-field"><label>About Heading</label><input value={draft.about.heading} onChange={(e) => updateSection("about", "heading", e.target.value)} /></div>
            <div className="admin-field"><label>Highlights Heading</label><input value={draft.about.highlightsHeading} onChange={(e) => updateSection("about", "highlightsHeading", e.target.value)} /></div>
            <div className="admin-field"><label>Skills Heading</label><input value={draft.about.skillsHeading} onChange={(e) => updateSection("about", "skillsHeading", e.target.value)} /></div>
          </div>
          <div className="admin-grid mt-3">
            {draft.about.paragraphs.map((paragraph, index) => (
              <div className="admin-field" key={`paragraph-${index}`}>
                <label>{`About Paragraph ${index + 1}`}</label>
                <textarea value={paragraph} onChange={(e) => replaceList("about", "paragraphs", draft.about.paragraphs.map((item, itemIndex) => itemIndex === index ? e.target.value : item))} />
              </div>
            ))}
          </div>
          {draft.about.highlights.map((item, index) => (
            <div className="admin-list-card" key={`highlight-${index}`}>
              <div className="admin-list-header">
                <h3>{`Highlight ${index + 1}`}</h3>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => removeItem("about", "highlights", index)}>Remove</button>
              </div>
              <div className="admin-grid">
                <div className="admin-field"><label>Title</label><input value={item.title} onChange={(e) => updateListItem("about", "highlights", index, "title", e.target.value)} /></div>
                <div className="admin-field"><label>Description</label><textarea value={item.text} onChange={(e) => updateListItem("about", "highlights", index, "text", e.target.value)} /></div>
              </div>
            </div>
          ))}
          <div className="admin-actions"><button className="btn btn-outline-warning" type="button" onClick={() => addItem("about", "highlights", emptyHighlight())}>Add Highlight</button></div>
          <div className="admin-field mt-4"><label>Skills List</label><textarea value={joinList(draft.about.skills)} onChange={(e) => updateSection("about", "skills", splitList(e.target.value))} /></div>
        </section>

        <section className="admin-section-card">
          <h2>Education Timeline</h2>
          <p className="admin-help">Manage each timeline card and its left or right position.</p>
          <div className="admin-field"><label>Section Heading</label><input value={draft.education.heading} onChange={(e) => updateSection("education", "heading", e.target.value)} /></div>
          {draft.education.items.map((item, index) => (
            <div className="admin-list-card" key={`education-${index}`}>
              <div className="admin-list-header">
                <h3>{`Education Item ${index + 1}`}</h3>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => removeItem("education", "items", index)}>Remove</button>
              </div>
              <div className="admin-grid">
                <div className="admin-field"><label>Title</label><input value={item.title} onChange={(e) => updateListItem("education", "items", index, "title", e.target.value)} /></div>
                <div className="admin-field"><label>Subtitle</label><input value={item.subtitle} onChange={(e) => updateListItem("education", "items", index, "subtitle", e.target.value)} /></div>
                <div className="admin-field"><label>Detail</label><input value={item.detail} onChange={(e) => updateListItem("education", "items", index, "detail", e.target.value)} /></div>
                <div className="admin-field"><label>School / Company</label><input value={item.school} onChange={(e) => updateListItem("education", "items", index, "school", e.target.value)} /></div>
                <div className="admin-field"><label>Link</label><input value={item.link} onChange={(e) => updateListItem("education", "items", index, "link", e.target.value)} /></div>
                <div className="admin-field"><label>Timeline Side</label><select value={item.side} onChange={(e) => updateListItem("education", "items", index, "side", e.target.value)}><option value="left">Left</option><option value="right">Right</option></select></div>
              </div>
            </div>
          ))}
          <div className="admin-actions"><button className="btn btn-outline-warning" type="button" onClick={() => addItem("education", "items", emptyEducation())}>Add Timeline Item</button></div>
        </section>

        <section className="admin-section-card">
          <h2>Projects</h2>
          <p className="admin-help">Edit project cards and the upcoming project list.</p>
          <div className="admin-grid">
            <div className="admin-field"><label>Main Heading</label><input value={draft.projects.heading} onChange={(e) => updateSection("projects", "heading", e.target.value)} /></div>
            <div className="admin-field"><label>Upcoming Heading</label><input value={draft.projects.upcomingHeading} onChange={(e) => updateSection("projects", "upcomingHeading", e.target.value)} /></div>
          </div>
          {draft.projects.items.map((project, index) => (
            <div className="admin-list-card" key={`project-${index}`}>
              <div className="admin-list-header">
                <h3>{project.name || `Project ${index + 1}`}</h3>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => removeItem("projects", "items", index)}>Remove</button>
              </div>
              <div className="admin-grid">
                <div className="admin-field"><label>Name</label><input value={project.name} onChange={(e) => updateListItem("projects", "items", index, "name", e.target.value)} /></div>
                <div className="admin-field"><label>Image URL</label><input value={project.image} onChange={(e) => updateListItem("projects", "items", index, "image", e.target.value)} /></div>
                <div className="admin-field"><label>Project Link</label><input value={project.link} onChange={(e) => updateListItem("projects", "items", index, "link", e.target.value)} /></div>
                <div className="admin-field"><label>Description</label><textarea value={project.description} onChange={(e) => updateListItem("projects", "items", index, "description", e.target.value)} /></div>
                <div className="admin-field"><label>Frontend Stack</label><textarea value={joinList(project.frontend)} onChange={(e) => updateListItem("projects", "items", index, "frontend", splitList(e.target.value))} /></div>
                <div className="admin-field"><label>Backend Stack</label><textarea value={joinList(project.backend)} onChange={(e) => updateListItem("projects", "items", index, "backend", splitList(e.target.value))} /></div>
              </div>
            </div>
          ))}
          <div className="admin-actions"><button className="btn btn-outline-warning" type="button" onClick={() => addItem("projects", "items", emptyProject())}>Add Project</button></div>
          {draft.projects.upcoming.map((item, index) => (
            <div className="admin-list-card" key={`upcoming-${index}`}>
              <div className="admin-list-header">
                <h3>{`Upcoming Project ${index + 1}`}</h3>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => removeItem("projects", "upcoming", index)}>Remove</button>
              </div>
              <div className="admin-grid">
                <div className="admin-field"><label>Name</label><input value={item.name} onChange={(e) => updateListItem("projects", "upcoming", index, "name", e.target.value)} /></div>
                <div className="admin-field"><label>Status</label><input value={item.status} onChange={(e) => updateListItem("projects", "upcoming", index, "status", e.target.value)} /></div>
              </div>
            </div>
          ))}
          <div className="admin-actions"><button className="btn btn-outline-warning" type="button" onClick={() => addItem("projects", "upcoming", emptyUpcoming())}>Add Upcoming Project</button></div>
        </section>

        <section className="admin-section-card">
          <h2>Social Links</h2>
          <p className="admin-help">Choose a supported icon, set the URL, and adjust the icon color.</p>
          <div className="admin-field"><label>Section Heading</label><input value={draft.profile.heading} onChange={(e) => updateSection("profile", "heading", e.target.value)} /></div>
          {draft.profile.links.map((item, index) => (
            <div className="admin-list-card" key={`social-${index}`}>
              <div className="admin-list-header">
                <h3>{item.platform || `Social Link ${index + 1}`}</h3>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => removeItem("profile", "links", index)}>Remove</button>
              </div>
              <div className="admin-grid">
                <div className="admin-field"><label>Platform</label><select value={item.platform} onChange={(e) => updateListItem("profile", "links", index, "platform", e.target.value)}>{socialPlatforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}</select></div>
                <div className="admin-field"><label>URL</label><input value={item.url} onChange={(e) => updateListItem("profile", "links", index, "url", e.target.value)} /></div>
                <div className="admin-field"><label>Icon Color</label><input value={item.color} onChange={(e) => updateListItem("profile", "links", index, "color", e.target.value)} /></div>
              </div>
            </div>
          ))}
          <div className="admin-actions"><button className="btn btn-outline-warning" type="button" onClick={() => addItem("profile", "links", emptySocial())}>Add Social Link</button></div>
        </section>

        <section className="admin-section-card">
          <h2>Contact Section</h2>
          <p className="admin-help">Edit the contact form text and Web3Forms access key.</p>
          <div className="admin-grid">
            <div className="admin-field"><label>Heading</label><input value={draft.contact.heading} onChange={(e) => updateSection("contact", "heading", e.target.value)} /></div>
            <div className="admin-field"><label>Submit Button Label</label><input value={draft.contact.submitLabel} onChange={(e) => updateSection("contact", "submitLabel", e.target.value)} /></div>
            <div className="admin-field"><label>Web3Forms Access Key</label><input value={draft.contact.accessKey} onChange={(e) => updateSection("contact", "accessKey", e.target.value)} /></div>
          </div>
          <div className="admin-field mt-3"><label>Subheading</label><textarea value={draft.contact.subheading} onChange={(e) => updateSection("contact", "subheading", e.target.value)} /></div>
        </section>
      </div>
    </main>
  );
}
