import Link from "next/link";
export default function NotFound() { return <section className="container empty-state"><h1>Page not found</h1><p>The requested project is unavailable or the URL has changed.</p><Link href="/projects" className="button button-primary">View projects</Link></section>; }
