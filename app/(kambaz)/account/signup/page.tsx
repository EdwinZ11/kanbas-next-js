import Link from "next/link";
import { FormControl } from "react-bootstrap";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h1>Sign Up</h1>
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <FormControl id="wd-password-verify"
             placeholder="verify password" type="password"
             className="mb-2"/>           
      <Link id="wd-signin-btn"
            href="/account/profile"
            className="btn btn-primary w-100 mb-2">
            Sign up </Link>
      <Link id="wd-signup-link" href="/account/signin">Sign in</Link>
    </div> );}

