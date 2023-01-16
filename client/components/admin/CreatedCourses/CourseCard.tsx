import { IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

type propType = {
  title: string;
  sub_title: string;
  img: string;
  id: string;
};

export default function CourseCard({ title, sub_title, img, id }: propType) {
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
      <IconButton
        onClick={deleteCourse}
        sx={{ color: "blue" }}
        className="float-right text-indigo-600"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
