import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import UploadImage from "../admin/CreateCourse/UploadImage";
import { errorType } from "../Auth/types";
import Button from "../common/buttons/Button";
import EventCreationInputField from "./EventCreationFormInputField";

export default function CourseCreationForm() {
  const fromRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<any>({});

  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((p: any) => ({ ...p, [e.target.name]: e.target.value }));
  }

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };

  async function submitHandler() {
    if (fromRef.current) {
      const formData = new FormData(fromRef?.current);

      const req = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/event`,
        formData
      );

      const data = req.data;

      if (data.error) {
        setError({
          open: true,
          msg: data.error,
        });
      } else {
        window.location.href = "/admin";
      }

      console.log(data);
    }
  }

  return (
    <form
      ref={fromRef}
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="p-6 shadow-2xl m-10 flex flex-col space-y-3"
    >
      <h1 className="text-center text-xl font-slab font-bold pb-2 text-indigo-600">
        Crear evento
      </h1>

      <EventCreationInputField state={formData} handleChange={handleChange} />

      <UploadImage />

      <Button type="button" handleClick={submitHandler} text="Crear" />

      <Snackbar open={error.open} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
    </form>
  );
}
