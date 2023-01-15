import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";

export default function CompletedWork() {
  return (
    <div className="col-span-12 p-4 row-span-6 md:col-span-6 flex flex-col space-y-4">
      <h1 className="font-bold font-slab text-xl text-indigo-600 text-center pt-4">
        Submited Work
      </h1>
      <div className="border px-4 py-2 flex items-center justify-between">
        <h1>doc.txt</h1>
        <IconButton>
          <DownloadIcon />
        </IconButton>
      </div>
    </div>
  );
}
