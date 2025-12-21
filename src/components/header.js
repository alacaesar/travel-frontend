"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Simple navigation based on the implementation
  const navItems = [
    { label: "Journal", href: "/" },
    // Add other links if pages exist
  ];

  return (
    <header className={menuOpen ? "active" : ""}>
      <div className="container">
        <div className="logo">
          <Link href="/" onClick={closeMenu}>
            <h2>The Gal Abroad</h2>
          </Link>
        </div>
      </div>

      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

    </header>
  );
}
