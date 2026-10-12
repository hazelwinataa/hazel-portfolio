"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

// NAVIGATION
const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "All Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setIsOpen(false);
  }

  function handleNavigationKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      closeMenu();
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link
          className="brand"
          href="/"
          aria-label={`${site.name} - Go to homepage`}
          onClick={closeMenu}
        >
          <span className="brand-mark" aria-hidden="true">HN</span>
          <span className="brand-name">{site.name}</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu-toggle"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links${isOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
          onKeyDown={handleNavigationKeyDown}
        >
          {navigationItems.map(({ href, label }) => (
            <Link href={href} key={href} onClick={closeMenu}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
