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

export const projects: Project[] = source as Project[];

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
