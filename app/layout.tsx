import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.title}`, template: `%s | ${site.name}` },
  description: site.introduction,
  keywords: ["Data Science", "Data Analyst", "Data Engineer", "Machine Learning", "MLOps", "Portfolio"],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><Navbar /><main>{children}</main><Footer /></body></html>;
}
