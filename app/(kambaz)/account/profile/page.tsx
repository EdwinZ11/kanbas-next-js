import Link from "next/link";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: 360 }}>
      <h1 className="mb-3 fw-normal">Profile</h1>

      <FormControl
        defaultValue="alice"
        placeholder="username"
        id="wd-username"
        className="mb-2"
      />

      <FormControl
        defaultValue="123"
        placeholder="password"
        type="password"
        id="wd-password"
        className="mb-2"
      />

      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2"
      />

      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2"
      />

      {/* date input: screenshot shows mm/dd/yyyy placeholder */}
      <FormControl
        type="date"
        id="wd-dob"
        className="mb-2"
        placeholder="mm/dd/yyyy"
        defaultValue="2000-01-01"
      />

      <FormControl
        defaultValue="alice@wonderland.com"
        type="email"
        id="wd-email"
        className="mb-2"
      />

      <FormSelect defaultValue="USER" id="wd-role" className="mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>

      <Link href="/account/signin" className="text-decoration-none">
        <Button variant="danger" className="w-100">
          Signout
        </Button>
      </Link>
    </div>
  );
}
