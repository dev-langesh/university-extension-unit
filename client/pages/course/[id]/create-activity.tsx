import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { errorType } from "../../../components/Auth/types";
import Button from "../../../components/common/buttons/Button";

export default function CreateActivityPage() {
  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });
  // const [formData, setFormData] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const formRef = useRef(null);

  // useEffect(() => {
  //   const course_id = router.query.id;

  //   setFormData((prev: any) => ({
  //     ...prev,
  //     course_id,
  //   }));
  // }, []);

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setFormData((p: any) => {
  //     return {
  //       ...p,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const token = window.localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const id: any = router.query.id;

      formData.append("course_id", id);

      const req = await axios.post(
        "http://localhost:8000/activity",
        formData,
        config
      );

      const data = req.data;

      if (!data.error) {
        history.back();
      }

      console.log(data);
    }
  }

  return (
    <div className="w-screen flex items-center justify-center pt-16 pb-10">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
      >
        <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
          Crear actividad
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Título"
          className="border px-2 py-1 text-[15px] outline-none"
        />

        <div>
          <label className="text-sm" htmlFor="date">
            Fecha de vencimiento
          </label>
          <br />
          <input
            id="date"
            type="date"
            name="due_date"
            className="border w-full px-2 py-1 text-[15px] outline-none"
          />
        </div>

        <div>
          <label className="text-sm" htmlFor="file">
            Subir material
          </label>
          <br />
          <input name="material" id="file" type="file" />
        </div>

        <Button type="submit" text={loading ? "Cargando..." : "Crear"} />

        <Snackbar
          onClose={closeError}
          open={error.open}
          autoHideDuration={6000}
        >
          <Alert onClose={closeError} severity="error">
            {error.msg}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
