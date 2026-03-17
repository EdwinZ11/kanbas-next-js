import Link from "next/link";
export default function labs() {
  return (
    <div id="wd-labs">
      <h1>Labs Edwin Zhou Section 2</h1>
      <ul>
        <li>
          <Link href="/labs/lab1" id="wd-lab1-link">
            Lab 1: HTML Examples{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab2/tailwind" id="wd-lab2-tailwind-link">
            Lab 2: Tailwind CSS{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">
            Lab 4: State Management Fundamentals{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4/redux" id="wd-lab4-redux-link">
            Lab 4: Redux{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4/react-context" id="wd-lab4-react-context-link">
            Lab 4: React Context{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4/zustand" id="wd-lab4-zustand-link">
            Lab 4: Zustand{" "}
          </Link>
        </li>
        <li>
          <Link href="/" id="wd-kambaz-link">
            Kambaz{" "}
          </Link>
        </li>
        <li>
          <Link href="https://github.com/EdwinZ11/kanbas-next-js" id="wd-github">
            github repo
          </Link>
        </li>
      </ul>
    </div>
  );
}
