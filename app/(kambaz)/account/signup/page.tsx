/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
    verifyPassword: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    if (user.password !== user.verifyPassword) {
      alert("Passwords do not match");
      return;
    }

    const currentUser = await client.signup({
      username: user.username,
      password: user.password,
    });

    dispatch(setCurrentUser(currentUser));
    router.push("/account/profile");
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign Up</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
        value={user.verifyPassword}
        onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
      />

      <button
        id="wd-signup-btn"
        onClick={signup}
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </button>

      <Link id="wd-signin-link" href="/account/signin">
        Sign in
      </Link>
    </div>
  );
}
