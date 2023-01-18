import axios from "axios";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  getProfile,
  reset,
  setProfile,
} from "../../src/features/profile/profileSlice";
import Button from "../common/buttons/Button";

export default function Profile() {
  const profile = useAppSelector(getProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getProfileDetails() {
      const token = window.localStorage.getItem("token");

      const req = await axios.post("http://localhost:8000/user/profile", {
        token,
      });

      const data = req.data;

      if (data.error) {
        window.localStorage.clear();

        window.location.reload();
      }

      if (data) {
        dispatch(
          setProfile({
            email: data.email,
            name: data.username,
            user: data.userType,
          })
        );
      }
    }

    getProfileDetails();
  }, []);

  function logout() {
    window.localStorage.removeItem("token");

    dispatch(reset());

    window.location.reload();
  }

  return (
    <div
      className={`${
        profile.openProfile ? "block" : "hidden"
      } b-0 bg-white shadow-xl text-black p-4 absolute right-3 rounded space-y-2 text-center`}
    >
      <h1>{profile.name}</h1>
      <p className="text-slate-600">{profile.email}</p>

      <Button handleClick={logout} text="cerrar sesión" type="button" />
    </div>
  );
}
