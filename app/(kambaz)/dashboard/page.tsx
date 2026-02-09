import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = [
    { id: "1234", title: "CS1234 React JS", desc: "Full Stack software developer", img: "/images/reactjs.jpg" },
    { id: "1101", title: "CS1101 Next JS", desc: "Full Stack software developer", img: "/images/nextjs.jpg" },
    { id: "1102", title: "CS1102 Vue JS", desc: "Full Stack software developer", img: "/images/vuejs.jpg" },
    { id: "1103", title: "CS1103 Angular JS", desc: "Full Stack software developer", img: "/images/angularjs.jpg" },
    { id: "1104", title: "CS1104 Svelte", desc: "Full Stack software developer", img: "/images/svelte.jpg" },
    { id: "1105", title: "CS1105 Ionic", desc: "Full Stack software developer", img: "/images/ionic.jpg" },
    { id: "1106", title: "CS1106 Nuxt", desc: "Full Stack software developer", img: "/images/nuxt.jpg" },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c) => (
            <Col key={c.id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/courses/${c.id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg variant="top" src={c.img} width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.desc}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
