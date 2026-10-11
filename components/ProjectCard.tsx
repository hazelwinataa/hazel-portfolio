import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const keyTechnologies = project.technologies.length > 0
    ? project.technologies.slice(0, 2)
    : project.models.slice(0, 2);

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
          <span className="tag" key={tag}>
            {tag}
          </span>
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
