import Link from "next/link";

import type { Project } from "@/lib/projects";
import { getProjectCardContent } from "@/lib/project-card-content";

type ProjectCardProps = {
  project: Project;
  variant?: "standard" | "archive";
};

export default function ProjectCard({
  project,
  variant = "standard",
}: ProjectCardProps) {
  const keyTechnologies = project.technologies.length > 0
    ? project.technologies.slice(0, 2)
    : project.models.slice(0, 2);

  if (variant === "archive") {
    const content = getProjectCardContent(project.slug);
    const summary = content?.summary ?? project.description;
    const evidence = content?.evidence;

    return (
      <article className="project-card project-card--archive">
        <div className="project-card-top">
          <span>PROJECT {project.id.padStart(2, "0")}</span>
          <div className="archive-card-meta">
            {project.featured && (
              <span className="archive-featured-tag">FEATURED</span>
            )}
            {project.year !== null && (
              <span className="project-year">{project.year}</span>
            )}
          </div>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="project-heading archive-card-heading"
        >
          <h3>{project.title}</h3>
          <span aria-hidden="true">↗</span>
        </Link>

        <p className="project-description archive-card-description">
          {summary}
        </p>

        <div className="archive-card-taxonomy">
          {project.roleTags.length > 0 && (
            <div className="archive-card-tag-group">
              <span className="archive-card-tag-heading">ROLE</span>
              <div className="tags">
                {project.roleTags.slice(0, 2).map((role) => (
                  <span className="tag tag-role" key={role}>
                    {role}
                  </span>
                ))}
                {project.roleTags.length > 2 && (
                  <span
                    className="archive-more-tags"
                    title={project.roleTags.slice(2).join(", ")}
                    aria-label={`Additional roles: ${project.roleTags.slice(2).join(", ")}`}
                  >
                    +{project.roleTags.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {project.courseTags.length > 0 && (
            <div className="archive-card-tag-group">
              <span className="archive-card-tag-heading">COURSE / CONTEXT</span>
              <div className="tags">
                {project.courseTags.slice(0, 2).map((course) => (
                  <span className="tag" key={course}>{course}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {evidence && (
          <div className="archive-card-evidence" aria-label="Project evidence">
            <span className="archive-card-evidence-value">
              {evidence.value}
            </span>
            <span className="archive-card-evidence-text">
              {evidence.label}
            </span>
            {evidence.note && (
              <span className="archive-card-evidence-note">
                {evidence.note}
              </span>
            )}
          </div>
        )}

        <div className="archive-card-footer">
          <p className="archive-card-tech">
            {keyTechnologies.join(" · ") || project.domainTags[0] || "Technical case study"}
          </p>
          <div className="archive-card-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open GitHub repository for ${project.title}`}
              >
                GitHub ↗
              </a>
            )}
            <Link href={`/projects/${project.slug}`}>
              Case study →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Preserve the original Featured Project cards on the homepage.
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-index">
          PROJECT {project.id.padStart(2, "0")}
        </span>
        {project.year !== null && (
          <span className="project-year">{project.year}</span>
        )}
      </div>

      <Link href={`/projects/${project.slug}`} className="project-heading">
        <h3>{project.title}</h3>
        <span aria-hidden="true">↗</span>
      </Link>

      <p className="project-description">{project.description}</p>

      <div className="tags" aria-label="Course categories">
        {project.courseTags.slice(0, 2).map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-card-bottom">
        <span className="project-technology">
          {keyTechnologies.join(" · ") || project.domainTags[0] || ""}
        </span>
        <Link className="text-link" href={`/projects/${project.slug}`}>
          Read case study →
        </Link>
      </div>
    </article>
  );
}
