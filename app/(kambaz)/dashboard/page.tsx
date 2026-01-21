import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1101" className="wd-dashboard-course-link">
            <Image src="/images/nextjs.jpg" width={200} height={150} alt="Next JS" />
            <div>
              <h5> CS1101 Next JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1102" className="wd-dashboard-course-link">
            <Image src="/images/vuejs.jpg" width={200} height={150} alt="Vue JS" />
            <div>
              <h5> CS1102 Vue JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1103" className="wd-dashboard-course-link">
            <Image src="/images/angularjs.jpg" width={200} height={150} alt="Angular JS" />
            <div>
              <h5> CS1103 Angular JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1104" className="wd-dashboard-course-link">
            <Image src="/images/svelte.jpg" width={200} height={150} alt="Svelte" />
            <div>
              <h5> CS1104 Svelte</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1105" className="wd-dashboard-course-link">
            <Image src="/images/ionic.jpg" width={200} height={150} alt="Ionic" />
            <div>
              <h5> CS1105 Ionic</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/1106" className="wd-dashboard-course-link">
            <Image src="/images/nuxt.jpg" width={200} height={150} alt="Nuxt" />
            <div>
              <h5> CS1106 Nuxt</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
