import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../src/app/hooks";
import { setCurrentActivity } from "../../../src/features/submission/uploadWork.slice";
import { useUserRole } from "../../hooks/useUserRole";

type propType = {
  title: string;
  date: string;
  id: string;
};

export default function ActivityCard({ title, date, id }: propType) {
  const role = useUserRole();

  const dispatch = useAppDispatch();

  async function deleteActivity() {
    const req = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/activity/${id}`
    );

    const data = req.data;

    if (!data.error) {
      window.location.reload();
    }
  }

  function handleClick(e: any) {
    dispatch(
      setCurrentActivity({
        activity_title: title,
        due_date: date,
        activity_id: id,
      })
    );
  }

  return (
    <div className="p-2 m-4 border-l-4 border-indigo-600 shadow-lg hover:shadow-xl bg-white flex items-center justify-between transition-all duration-200 ">
      <Link className="flex-1" href={`/course/activity/${id}`}>
        <div className="w-full" onClick={handleClick}>
          <span className="text-xs text-slate-500">
            Fecha de vencimiento: {date}
          </span>
          <h1>{title}</h1>
        </div>
      </Link>
      {role !== "student" && (
        <div>
          <IconButton onClick={deleteActivity} sx={{ color: "red" }}>
            <DeleteOutline />
          </IconButton>
        </div>
      )}
    </div>
  );
}
