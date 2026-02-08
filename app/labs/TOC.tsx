'use client'
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";

export default function TOC() {
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink href="/labs" as={Link} id="wd-labs-link">
          Home
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab1" as={Link} id="wd-lab1-link">
          Lab 1
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab2" as={Link} id="wd-lab2-link">
          Lab 2
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab2/tailwind" as={Link} id="wd-lab2-tailwind-link">
          Lab 2: Tailwind
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink href="/labs/lab3" as={Link} id="wd-lab3-link">
          Lab 3
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
