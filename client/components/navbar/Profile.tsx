import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  closeProfile,
  getProfile,
  reset,
  setProfile,
} from "../../src/features/profile/profileSlice";
import Button from "../common/buttons/Button";
import { useUserRole } from "../hooks/useUserRole";

export default function Profile() {
  const profile = useAppSelector(getProfile);
  const dispatch = useAppDispatch();

  const user = useUserRole();

  useEffect(() => {
    async function getProfileDetails() {
      const token = window.localStorage.getItem("token");

      if (token) {
        const req = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/profile`,
          {
            token,
          }
        );

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
      } b-0 bg-white shadow-xl text-black p-4 absolute z-50 right-3 rounded space-y-2 text-center`}
    >
      <h1>{profile.name}</h1>
      <p className="text-slate-600">{profile.email}</p>

      <div>
        {(user === "admin" || user === "administrator") && (
          <Link href="/admin/add-admin">
            <span
              onClick={() => dispatch(closeProfile())}
              className="text-blue-500 hover:underline"
            >
              Agregar administrador
            </span>
          </Link>
        )}
      </div>

      <Button handleClick={logout} text="cerrar sesión" type="button" />
    </div>
  );
}
