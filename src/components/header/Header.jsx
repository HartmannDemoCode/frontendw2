import { useState } from "react";
import { NavLink } from "react-router";
import "./header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span className="menu-toggle-bar" />
        <span className="menu-toggle-bar" />
        <span className="menu-toggle-bar" />
      </button>

      <nav
        className={`main-nav ${isMenuOpen ? "main-nav-open" : ""}`}
        aria-label="Main navigation"
      >
        <NavLink
          to="/booktable"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
          onClick={closeMenu}
        >
          Book Table
        </NavLink>
        <NavLink
          to="/bookform"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
          onClick={closeMenu}
        >
          Book Form
        </NavLink>
        <NavLink
          to="/nonexistent"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link-active" : ""}`
          }
          onClick={closeMenu}
        >
            404 Page
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
