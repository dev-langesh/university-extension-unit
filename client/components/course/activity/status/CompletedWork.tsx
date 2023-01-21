import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import Button from "../../../common/buttons/Button";
import { useUserRole } from "../../../hooks/useUserRole";

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
      <a target="_blank" href={props.work.work.url}>
        <div className="border px-4 py-2 flex items-center justify-between bg-slate-100">
          <h1>{props.work.work.file_name}</h1>
        </div>
      </a>

      <br />
      <br />

      {role !== "student" && (
        <form className="space-y-6">
          <textarea
            className="border p-2 outline-none w-full"
            placeholder="Observaciones"
            name="comment"
            id=""
            cols={30}
            rows={5}
          ></textarea>{" "}
          <input
            type="text"
            className="border px-2 py-1 text-[15px] outline-none  w-full"
            placeholder="Introducir marca de actividad"
          />
          <Button type="submit" text="Submit" />
        </form>
      )}
    </div>
  );
}
