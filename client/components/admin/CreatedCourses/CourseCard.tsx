import { IconButton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { decodeToken } from "../../hooks/decodeToken";

type propType = {
  title: string;
  sub_title: string;
  img: string;
  id: string;
  code: string | number;
};

export default function CourseCard({
  title,
  sub_title,
  img,
  id,
  code,
}: propType) {
  const [user, setUser] = useState<"admin" | "student" | "administrator">();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const decoded = decodeToken(token);

      setUser(decoded.role);
    }
  }, []);

  async function deleteCourse() {
    const token = window.localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const req = await axios.delete(
      `http://localhost:8000/course/${id}`,
      config
    );

    const data = req.data;

    if (data.message) {
      window.location.reload();
    }
  }

  return (
    <div className="w-72 h-60 shadow-xl m-4 p-2">
      <Link href={`/course/${id}`}>
        <div className="w-full h-1/2">
          <img className="object-contain w-full h-full" src={img} alt="" />
        </div>
        <main className="p-3 space-y-2">
          <h1 className="font-slab text-indigo-600  font-bold">{title}</h1>
          <h3 className="text-sm text-slate-600">{sub_title}</h3>
        </main>
      </Link>
      <div className="flex justify-between items-center px-4">
        <span className="text-sm text-slate-500">Código del curso: {code}</span>
        {user === "admin" ||
          (user === "administrator" && (
            <IconButton
              onClick={deleteCourse}
              sx={{ color: "blue" }}
              className="float-right text-indigo-600"
            >
              <DeleteIcon />
            </IconButton>
          ))}
      </div>
    </div>
  );
}
