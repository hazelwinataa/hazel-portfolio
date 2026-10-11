import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© 2026 {site.name}</span>
        <span>Built with Next.js · Project details are editable and source-verified.</span>
      </div>
    </footer>
  );
}
