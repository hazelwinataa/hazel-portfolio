"use client";

import { useMemo, useState } from "react";

import ProjectCard from "@/components/ProjectCard";
import { courses, projects, roles } from "@/lib/projects";
import type { Project } from "@/lib/projects";

type SortOrder = "featured" | "newest" | "oldest" | "course" | "title";

const coreRoles = [
  "Data Science",
  "Data Analyst",
  "Data Engineer",
  "Business Analytics",
] as const;

function toggleTag(current: string[], tag: string) {
  return current.includes(tag)
    ? current.filter((item) => item !== tag)
    : [...current, tag];
}

function searchableText(project: Project) {
  return [
    project.title,
    project.description,
    project.dataset,
    project.datasetSize,
    project.problemStatement,
    project.businessContext,
    project.projectType,
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
  ]
    .join(" ")
    .toLocaleLowerCase();
}

const roleOptions = roles.map((role) => ({
  label: role,
  count: projects.filter((project) => project.roleTags.includes(role)).length,
}));

const courseOptions = courses
  .map((course) => ({
    label: course,
    count: projects.filter((project) => project.courseTags.includes(course))
      .length,
  }))
  .filter((course) => course.count > 0);

const hasVerifiedYears = projects.some((project) => project.year !== null);

export default function ProjectExplorer() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("featured");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [publicCodeOnly, setPublicCodeOnly] = useState(false);

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    const matching = projects.filter((project) => {
      const roleMatch =
        selectedRoles.length === 0 ||
        selectedRoles.some((role) => project.roleTags.includes(role));
      const courseMatch =
        selectedCourses.length === 0 ||
        selectedCourses.some((course) => project.courseTags.includes(course));
      const textMatch = !query || searchableText(project).includes(query);
      const featuredMatch = !featuredOnly || project.featured;
      const sourceMatch = !publicCodeOnly || Boolean(project.githubUrl);

      return (
        roleMatch && courseMatch && textMatch && featuredMatch && sourceMatch
      );
    });

    return matching.sort((a, b) => {
      if (sortOrder === "featured") {
        return (
          Number(b.featured) - Number(a.featured) ||
          (b.year ?? -1) - (a.year ?? -1) ||
          a.title.localeCompare(b.title)
        );
      }
      if (sortOrder === "newest") {
        return (
          (b.year ?? -1) - (a.year ?? -1) || a.title.localeCompare(b.title)
        );
      }
      if (sortOrder === "oldest") {
        return (
          (a.year ?? Number.MAX_SAFE_INTEGER) -
            (b.year ?? Number.MAX_SAFE_INTEGER) ||
          a.title.localeCompare(b.title)
        );
      }
      if (sortOrder === "course") {
        return (
          (a.courseTags[0] ?? "").localeCompare(b.courseTags[0] ?? "") ||
          a.title.localeCompare(b.title)
        );
      }
      return a.title.localeCompare(b.title);
    });
  }, [selectedRoles, selectedCourses, search, sortOrder, featuredOnly, publicCodeOnly]);

  const hasFilters =
    selectedRoles.length > 0 ||
    selectedCourses.length > 0 ||
    Boolean(search.trim()) ||
    featuredOnly ||
    publicCodeOnly;

  function clearFilters() {
    setSearch("");
    setSelectedRoles([]);
    setSelectedCourses([]);
    setFeaturedOnly(false);
    setPublicCodeOnly(false);
  }

  function focusRole(role: string) {
    setSelectedRoles((current) =>
      current.length === 1 && current[0] === role ? [] : [role],
    );
  }

  return (
    <div className="explorer archive-explorer">
      <section className="archive-focus" aria-labelledby="archive-focus-title">
        <div className="archive-section-title">
          <div>
            <p className="archive-kicker">FIND WORK RELEVANT TO YOUR ROLE</p>
            <h2 id="archive-focus-title">Explore by career focus</h2>
          </div>
          <p>Choose a focus area, or combine detailed filters below.</p>
        </div>
        <div className="archive-focus-grid">
          {coreRoles.map((role) => {
            const count = roleOptions.find((item) => item.label === role)?.count ?? 0;
            const active =
              selectedRoles.length === 1 && selectedRoles[0] === role;

            return (
              <button
                type="button"
                className={`archive-focus-button ${active ? "active" : ""}`}
                aria-pressed={active}
                key={role}
                onClick={() => focusRole(role)}
              >
                <span className="archive-focus-name">{role}</span>
                <span className="archive-focus-meta">
                  {count} projects <span aria-hidden="true">↗</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="filter-panel archive-filter-panel" aria-label="Project filters">
        <div className="archive-filter-top">
          <label className="filter-label" htmlFor="search-projects">
            SEARCH PROJECTS
          </label>
          {hasFilters && (
            <button type="button" className="clear-button" onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </div>
        <input
          id="search-projects"
          className="search-input archive-search-input"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by project, dataset, technique, or tool..."
        />

        <div className="filter-group">
          <span className="filter-label">FILTER BY TARGET ROLE</span>
          <div className="filter-chips" role="group" aria-label="Target role filters">
            <button
              type="button"
              aria-pressed={selectedRoles.length === 0}
              className={`filter-chip ${selectedRoles.length === 0 ? "active" : ""}`}
              onClick={() => setSelectedRoles([])}
            >
              All roles
            </button>
            {roleOptions.map(({ label, count }) => (
              <button
                type="button"
                key={label}
                aria-pressed={selectedRoles.includes(label)}
                className={`filter-chip ${selectedRoles.includes(label) ? "active" : ""}`}
                onClick={() =>
                  setSelectedRoles((current) => toggleTag(current, label))
                }
              >
                {label} <span className="archive-chip-count">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">FILTER BY COURSE OR PROJECT CONTEXT</span>
          <div className="filter-chips" role="group" aria-label="Course filters">
            <button
              type="button"
              aria-pressed={selectedCourses.length === 0}
              className={`filter-chip ${selectedCourses.length === 0 ? "active" : ""}`}
              onClick={() => setSelectedCourses([])}
            >
              All courses
            </button>
            {courseOptions.map(({ label, count }) => (
              <button
                type="button"
                key={label}
                aria-pressed={selectedCourses.includes(label)}
                className={`filter-chip ${selectedCourses.includes(label) ? "active" : ""}`}
                onClick={() =>
                  setSelectedCourses((current) => toggleTag(current, label))
                }
              >
                {label} <span className="archive-chip-count">{count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="archive-filter-extras">
          <label className="archive-toggle">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(event) => setFeaturedOnly(event.target.checked)}
            />
            Featured projects only
          </label>
          <label className="archive-toggle">
            <input
              type="checkbox"
              checked={publicCodeOnly}
              onChange={(event) => setPublicCodeOnly(event.target.checked)}
            />
            Public GitHub repository
          </label>
        </div>
        <p className="filter-hint">
          Multiple choices within a group match any selected tag. Role, course,
          search and checkboxes are combined to narrow your results.
        </p>
      </section>

      <div className="archive-results-toolbar">
        <div>
          <p className="archive-kicker">PROJECT RESULTS</p>
          <h2 aria-live="polite" aria-atomic="true">
            {visibleProjects.length} of {projects.length} projects
          </h2>
        </div>
        <div className="archive-results-actions">
          <label htmlFor="sort-projects">Sort by</label>
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

      {visibleProjects.length ? (
        <div className="project-grid archive-project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="archive" />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No projects match these filters</h2>
          <p>Try removing a role or course, or use a broader search term.</p>
          <button type="button" className="button button-outline" onClick={clearFilters}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
