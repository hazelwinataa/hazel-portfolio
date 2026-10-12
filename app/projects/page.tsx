import type { Metadata } from "next";

import ProjectExplorer from "@/components/ProjectExplorer";
import { featuredProjects, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "All Projects | Data Science & Analytics Portfolio",
  description:
    "Explore documented projects in Data Science, Data Analytics, Data Engineering and Business Analytics, including machine learning, databases and deployment.",
};

export default function ProjectsPage() {
  return (
    <main className="container page-section archive-page">
      <header className="archive-header">
        <div className="archive-header-copy">
          <p className="eyebrow">PROJECT ARCHIVE / SELECTED EXPERIENCE</p>
          <h1>
            All projects<span className="heading-period">.</span>
          </h1>
          <p className="archive-intro">
            Explore my academic and technical work across Data Science, Data
            Analytics, Data Engineering, and Business Analytics. Browse projects
            by target role, course, or technical approach, then open the case
            studies for methods, results, and supporting evidence.
          </p>
        </div>

        <div className="archive-overview" aria-label="Project archive overview">
          <div className="archive-overview-number">
            <strong>{projects.length}</strong>
            <span>DOCUMENTED PROJECTS</span>
          </div>
          <div className="archive-overview-divider" />
          <div className="archive-overview-small">
            <strong>{featuredProjects.length}</strong>
            <span>Featured case studies</span>
          </div>
          <div className="archive-overview-small">
            <strong>4</strong>
            <span>Core career directions</span>
          </div>
        </div>
      </header>

      <ProjectExplorer />
    </main>
  );
}
