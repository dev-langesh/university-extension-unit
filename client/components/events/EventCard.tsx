import { Button, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserRole } from "../hooks/useUserRole";

export default function CourseCard(props: any) {
  const [openDelete, setOpenDelete] = useState<Boolean>(false);

  const user = useUserRole();

  console.log(user);

  async function deleteEvent() {
    const req = await axios.delete(`http://localhost:8000/event/${props._id}`);

    const data = req.data;

    window.location.reload();
  }

  return (
    <div className="w-72 shadow-xl m-4 p-2">
      {openDelete && (
        <section className="flex items-center justify-center absolute top-0 left-0 bg-black/20 w-screen h-screen">
          <section className="bg-white p-4 rounded shadow-lg text-center space-y-4">
            <p>¿Quieres eliminar el evento?</p>
            <div className="space-x-5">
              <Button onClick={() => setOpenDelete(false)} variant="outlined">
                Cancelar
              </Button>
              <Button
                onClick={deleteEvent}
                variant="outlined"
                color="error"
                sx={{ color: "red" }}
              >
                Confirmar
              </Button>
            </div>
          </section>
        </section>
      )}
      <div className="w-full h-1/2">
        <img className="object-contain w-full h-full" src={props.img} alt="" />
      </div>
      <main className="p-3 space-y-2">
        <h1 className="font-slab text-indigo-600  font-bold">{props.name}</h1>
        <h3 className="text-sm text-slate-600">{props.desc}</h3>

        {user === "admin" && (
          <IconButton
            onClick={() => {
              setOpenDelete(true);
            }}
            sx={{ color: "blue" }}
            className="float-right text-indigo-600"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </main>
    </div>
  );
}
