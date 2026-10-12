import source from "@/data/projects.json";

export type Project = {
  id: string;
  slug: string;
  title: string;
  year: number | null;
  projectType: string;
  status: string;
  grade: string;
  featured: boolean;
  roleTags: string[];
  courseTags: string[];
  domainTags: string[];
  description: string;
  problemStatement: string;
  businessContext: string;
  dataset: string;
  datasetSize: string;
  preprocessing: string[];
  featureEngineering: string[];
  methodology: string[];
  models: string[];
  technologies: string[];
  evaluationMetrics: string[];
  results: string[];
  insights: string[];
  businessImpact: string;
  challenges: string[];
  limitations: string[];
  futureImprovements: string[];
  githubUrl: string;
  demoUrl: string;
  reportUrl: string;
  image: string;
  gallery: string[];
  relatedProjects?: string[];
  highlights?: { value: string; label: string; note?: string }[];
};

// Normalization only changes how existing verified content is presented.
// The original project dataset remains untouched.
function normalizeProject(project: Project): Project {
  const normalizedCourseTags = project.courseTags.map((course) =>
    course === "Data Management & Organization / DMO"
      ? "Data Management & Organization"
      : course,
  );

  if (project.slug !== "customer-repeat-order") {
    return { ...project, courseTags: normalizedCourseTags };
  }

  return {
    ...project,
    title: "Customer Repeat-Order & Transaction Quality Analysis",
    projectType: "Team case study · Customer Analytics & Data Quality",
    status: "Completed team EDA and preprocessing case study",
    description:
      "Analyzed 319,978 vehicle-sales transactions to investigate customer repeat-order indicators and data-quality issues, including duplicate records, demographic anomalies, geographic inconsistencies, and financing fields.",
    businessContext:
      "A team-based exploratory study of vehicle-sales transactions and customer behavior. The publicly documented scope covers data understanding, EDA, and preprocessing rather than validated prediction-model performance or quantified commercial outcomes.",
    businessImpact:
      "The analysis highlights transaction-quality concerns and customer behavior indicators relevant to follow-up prioritization. No measured marketing uplift or validated predictive-model performance is claimed.",
    methodology: project.methodology.map((item) =>
      item.replace(/SPARC 2026/gi, "the original team project").replace(/\bSPARC\b/gi, "the project"),
    ),
    limitations: project.limitations.map((item) =>
      item.replace(/SPARC 2026/gi, "the original team project").replace(/\bSPARC\b/gi, "the project"),
    ),
    highlights: (project.highlights ?? []).filter(
      (item) => !/SPARC|FINALIST/i.test(`${item.value} ${item.label}`),
    ),
    courseTags: normalizedCourseTags,
  };
}

export const projects: Project[] = (source as Project[]).map(normalizeProject);

export const roles = [
  "Data Science",
  "Data Analyst",
  "Data Engineer",
  "Business Analytics",
  "AI / Machine Learning",
  "MLOps",
];

export const courses = [
  "Machine Learning",
  "Deep Learning",
  "Model Deployment",
  "Data Management & Organization",
  "Database Technology",
  "Big Data & Infrastructure",
  "Program Design Method",
  "Competition / Independent Project",
  "Other Academic Project",
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
