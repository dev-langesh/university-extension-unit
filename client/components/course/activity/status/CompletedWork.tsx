import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import Button from "../../../common/buttons/Button";
import { useUserRole } from "../../../hooks/useUserRole";
import ProvideMarks from "./ProvideMarks";

export default function CompletedWork(props: any) {
  const role = useUserRole();

  return (
    <div className="col-span-12 p-4 row-span-6 md:col-span-6 flex flex-col space-y-4 w-[500px]">
      <h1 className="font-bold font-slab text-xl text-indigo-600 text-center pt-4">
        Trabajo enviado
      </h1>
      <p>{props.work.work.comment}</p>
      <p>
        Enviado en:{" "}
        <span className="text-slate-500">{props.work.work.submitted_at}</span>
      </p>
      <a rel="noreferrer" target="_blank" href={props.work.work.url}>
        <div className="border px-4 py-2 flex items-center justify-between bg-slate-100">
          <h1>{props.work.work.file_name}</h1>
        </div>
      </a>

      <br />
      <br />

      {props.work.work.reviewed ? (
        <div className="space-y-4">
          <h1 className="font-bold font-slab text-xl text-indigo-600 text-center pt-4">
            Tu reseña
          </h1>
          <p>
            <span className="text-slate-500 text-sm">
              {props.work.work.remarks}
            </span>
          </p>
          <p>
            Puntaje <br />{" "}
            <span className="text-slate-500">{props.work.work.score}</span>
          </p>
        </div>
      ) : (
        role !== "student" && (
          <ProvideMarks studentId={props.work.work.student_id} />
        )
      )}
    </div>
  );
}
