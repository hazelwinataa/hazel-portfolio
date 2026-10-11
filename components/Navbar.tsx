import Link from "next/link";
import { site } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link className="brand" href="/" aria-label="Go to homepage">
          <span className="brand-mark">HN</span>
          <span>{site.name}</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/projects">All Projects</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
