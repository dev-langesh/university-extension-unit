import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React from "react";

type propType = {
  title: string;
  date: string;
  id: string;
};

export default function ActivityCard({ title, date, id }: propType) {
  async function deleteActivity() {
    const req = await axios.delete(`http://localhost:8000/activity/${id}`);

    const data = req.data;

    if (!data.error) {
      window.location.reload();
    }
  }

  return (
    <div className="p-2 m-4 border-l-4 border-indigo-600 shadow-lg hover:shadow-xl bg-white flex items-center justify-between transition-all duration-200 ">
      <Link className="flex-1" href={`/course/activity/${id}`}>
        <div>
          <span className="text-xs text-slate-500">
            Fecha de vencimiento: {date}
          </span>
          <h1>{title}</h1>
        </div>
      </Link>
      <div>
        <IconButton onClick={deleteActivity} sx={{ color: "red" }}>
          <DeleteOutline />
        </IconButton>
      </div>
    </div>
  );
}
