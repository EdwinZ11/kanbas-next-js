"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function CourseNavigation({ cid }: { cid: string }) {

  const links = [
    {label: "Home", path: "home" },
    {label: "Modules", path: "modules"},
    {label: "Piazza", path: "piazza"},
    {label: "Zoom", path: "zoom"},
    {label: "Assignments", path: "assignments"},
    {label: "Quizzes", path: "quizzes"},
    {label: "Grades", path: "grades"},
    {label: "People", path: "people/table"}
  ];

  return (
    <ListGroup id="wd-course-navigation" className="wd list-group rounded-0">
      {links.map((link) => {
        const path = `/courses/${cid}/${link.path}`;
        return (
          <ListGroupItem
            key={link.label}
            as={Link}
            href={path}
            className={`border-0 text-danger`}
          >
            {link.label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}