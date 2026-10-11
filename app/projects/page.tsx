import type { Metadata } from "next";
import ProjectExplorer from "@/components/ProjectExplorer";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "All Projects", description: "Explore the complete academic and technical project archive." };

export default function ProjectsPage() {
  return <section className="container page-section"><p className="eyebrow">PROJECT ARCHIVE</p><h1>All projects<span className="heading-period">.</span></h1><p className="archive-intro">Explore {projects.length} documented projects across data science, analytics, machine learning, deep learning, engineering, and deployment. Use filters to find the work most relevant to your interests.</p><ProjectExplorer /></section>;
}
