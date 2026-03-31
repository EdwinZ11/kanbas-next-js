"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink href="/labs" as={Link} id="wd-labs-link" className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}>
          Home
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab1" as={Link} id="wd-lab1-link" className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}>
          Lab 1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab2" as={Link} id="wd-lab2-link"  className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`}>
          Lab 2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab2/tailwind" as={Link} id="wd-lab2-tailwind-link"  className={`nav-link ${pathname.endsWith("tailwind") ? "active" : ""}`}>
          Lab 2: Tailwind
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab3" as={Link} id="wd-lab3-link"  className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`}>
          Lab 3
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab4" as={Link} id="wd-lab4-link"  className={`nav-link ${pathname.endsWith("lab4") ? "active" : ""}`}>
          Lab 4
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab4/redux" as={Link} id="wd-lab4-redux-link"  className={`nav-link ${pathname.endsWith("redux") ? "active" : ""}`}>
          Lab 4: Redux
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab4/react-context" as={Link} id="wd-lab4-react-content-link"  className={`nav-link ${pathname.endsWith("react-context") ? "active" : ""}`}>
          Lab 4: React Context
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab4/zustand" as={Link} id="wd-lab4-zustand-link"  className={`nav-link ${pathname.endsWith("zustand") ? "active" : ""}`}>
          Lab 4: Zustand
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab5" as={Link} id="wd-lab5-link"  className={`nav-link ${pathname.endsWith("lab5") ? "active" : ""}`}>
          Lab 5
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/" as={Link} id="wd-kambaz-link">
          Kambaz
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="https://github.com/EdwinZ11/kanbas-next-js" as={Link} id="wd-kambaz-link">
          GitHub Repo
        </NavLink>
      </NavItem>
    </Nav>
  );
}
