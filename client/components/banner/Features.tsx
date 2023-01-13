import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BuildIcon from "@mui/icons-material/Build";

export default function Features() {
  return (
    <section className="p-6 flex items-center justify-center sm:flex-row flex-col">
      <div className="w-60 h-60 text-center p-6 shadow-2xl space-y-5 bg-white m-4  flex flex-col items-center justify-center">
        <div className="bg-indigo-100 inline-block p-2 rounded-full ">
          <AccessTimeIcon
            className="text-indigo-700"
            sx={{ fontSize: "30px" }}
          />
        </div>
        <p>Ahorre tiempo y simplifique las tareas diarias</p>
      </div>{" "}
      <div className="w-60 h-60 text-center p-6 shadow-2xl space-y-5 bg-white m-4 flex flex-col items-center justify-center">
        <div className="bg-indigo-100 inline-block p-2 rounded-full ">
          <MenuBookIcon className="text-indigo-700" sx={{ fontSize: "30px" }} />
        </div>
        <p>Mejorar las experiencias de aprendizaje de los estudiantes</p>
      </div>
      <div className="w-60 h-60 text-center p-6 shadow-2xl space-y-5 bg-white m-4 flex flex-col items-center justify-center">
        <div className="bg-indigo-100 inline-block p-2 rounded-full ">
          <BuildIcon className="text-indigo-700" sx={{ fontSize: "30px" }} />
        </div>
        <p>
          Opere con facilidad utilizando herramientas de visibilidad,
          información y control
        </p>
      </div>
    </section>
  );
}
