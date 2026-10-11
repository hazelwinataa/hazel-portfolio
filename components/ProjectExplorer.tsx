"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { courses, projects, roles } from "@/lib/projects";
import type { Project } from "@/lib/projects";

type SortOrder = "featured" | "newest" | "oldest" | "course" | "title";

function toggleTag(current: string[], target: string) {
  return current.includes(target)
    ? current.filter((tag) => tag !== target)
    : [...current, target];
}

function searchableText(project: Project) {
  return [
    project.title,
    project.description,
    project.dataset,
    project.datasetSize,
    project.problemStatement,
    project.businessContext,
    ...project.technologies,
    ...project.methodology,
    ...project.models,
    ...project.courseTags,
    ...project.roleTags,
    ...project.domainTags,
    ...project.preprocessing,
    ...project.featureEngineering,
    ...project.insights,
    ...project.results,
  ].join(" ").toLocaleLowerCase();
}

const hasVerifiedYears = projects.some((project) => project.year !== null);

export default function ProjectExplorer() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    const matching = projects.filter((project) => {
      const roleMatch = selectedRoles.length === 0 ||
        selectedRoles.some((tag) => project.roleTags.includes(tag));
      const courseMatch = selectedCourses.length === 0 ||
        selectedCourses.some((tag) => project.courseTags.includes(tag));
      const textMatch = !query || searchableText(project).includes(query);

      return roleMatch && courseMatch && textMatch;
    });

    return matching.sort((a, b) => {
      if (sortOrder === "featured") {
        return Number(b.featured) - Number(a.featured) ||
          (b.year ?? -1) - (a.year ?? -1) ||
          a.title.localeCompare(b.title);
      }
      if (sortOrder === "newest") {
        return (b.year ?? -1) - (a.year ?? -1) ||
          a.title.localeCompare(b.title);
      }
      if (sortOrder === "oldest") {
        return (a.year ?? Number.MAX_SAFE_INTEGER) -
          (b.year ?? Number.MAX_SAFE_INTEGER) ||
          a.title.localeCompare(b.title);
      }
      if (sortOrder === "course") {
        return (a.courseTags[0] ?? "").localeCompare(b.courseTags[0] ?? "") ||
          a.title.localeCompare(b.title);
      }
      return a.title.localeCompare(b.title);
    });
  }, [selectedRoles, selectedCourses, search, sortOrder]);

  const hasFilters = selectedRoles.length > 0 ||
    selectedCourses.length > 0 ||
    search.trim().length > 0;

  function resetFilters() {
    setSearch("");
    setSelectedRoles([]);
    setSelectedCourses([]);
  }

  return (
    <div className="explorer">
      <div className="filter-panel">
        <label className="filter-label" htmlFor="search-projects">
          SEARCH PROJECTS
        </label>
        <input
          id="search-projects"
          className="search-input"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search projects, methods, tools, datasets..."
        />

        <div className="filter-group">
          <span className="filter-label">FILTER BY ROLE</span>
          <div className="filter-chips" role="group" aria-label="Filter by target roles">
            <button
              type="button"
              className={`filter-chip ${selectedRoles.length === 0 ? "active" : ""}`}
              onClick={() => setSelectedRoles([])}
            >
              All Roles
            </button>
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                aria-pressed={selectedRoles.includes(role)}
                className={`filter-chip ${selectedRoles.includes(role) ? "active" : ""}`}
                onClick={() => setSelectedRoles((current) => toggleTag(current, role))}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">FILTER BY COURSE</span>
          <div className="filter-chips" role="group" aria-label="Filter by academic course">
            <button
              type="button"
              className={`filter-chip ${selectedCourses.length === 0 ? "active" : ""}`}
              onClick={() => setSelectedCourses([])}
            >
              All Courses
            </button>
            {courses.map((course) => (
              <button
                key={course}
                type="button"
                aria-pressed={selectedCourses.includes(course)}
                className={`filter-chip ${selectedCourses.includes(course) ? "active" : ""}`}
                onClick={() => setSelectedCourses((current) => toggleTag(current, course))}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-bottom">
          <p className="filter-count">
            <strong>{visibleProjects.length}</strong> of {projects.length} projects found
          </p>
          <div className="filter-actions">
            {hasFilters && (
              <button type="button" className="clear-button" onClick={resetFilters}>
                Clear filters
              </button>
            )}
            <label htmlFor="sort-projects" className="visually-hidden">
              Sort projects
            </label>
            <select
              id="sort-projects"
              className="sort-select"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            >
              <option value="featured">Featured first</option>
              {hasVerifiedYears && <option value="newest">Newest</option>}
              {hasVerifiedYears && <option value="oldest">Oldest</option>}
              <option value="course">Course</option>
              <option value="title">A–Z</option>
            </select>
          </div>
        </div>
        <p className="filter-hint">
          Select multiple tags within one group to match any of them.
          Selected roles and courses must both match.
        </p>
      </div>

      {visibleProjects.length > 0 ? (
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching projects</h2>
          <p>Try a different keyword or clear the filters.</p>
          <button type="button" className="button button-outline" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
