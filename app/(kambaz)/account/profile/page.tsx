"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
    }
  }, [currentUser, router]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  if (!currentUser) return null;

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      <div>
        <FormControl
          id="wd-username"
          className="mb-2"
          value={currentUser.username || ""}
          readOnly
        />
        <FormControl
          id="wd-password"
          className="mb-2"
          value={currentUser.password || ""}
          readOnly
        />
        <FormControl
          id="wd-firstname"
          className="mb-2"
          value={currentUser.firstName || ""}
          readOnly
        />
        <FormControl
          id="wd-lastname"
          className="mb-2"
          value={currentUser.lastName || ""}
          readOnly
        />
        <FormControl
          id="wd-dob"
          className="mb-2"
          type="date"
          value={currentUser.dob || ""}
          readOnly
        />
        <FormControl
          id="wd-email"
          className="mb-2"
          value={currentUser.email || ""}
          readOnly
        />
        <FormControl
          id="wd-role"
          className="mb-2"
          value={currentUser.role || ""}
          readOnly
        />
        <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
          Sign out
        </Button>
      </div>
    </div>
  );
}