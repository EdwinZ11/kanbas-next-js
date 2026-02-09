import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="p-3">
       <Link
        href="/account/signin"
        className="text-danger text-decoration-none d-inline-block mb-3"
        id="wd-account-signin-link"
      >
        SignIn
      </Link>
      <br />

      <Link
        href="/account/signup"
        className="text-danger text-decoration-none d-inline-block mb-3"
        id="wd-account-signup-link"
      >
        Signup
      </Link>
      <br />

      <Link
        href="/account/profile"
        className="text-danger text-decoration-none d-inline-block"
        id="wd-account-profile-link"
      >
        Profile
      </Link>
    </div>
  );
}
