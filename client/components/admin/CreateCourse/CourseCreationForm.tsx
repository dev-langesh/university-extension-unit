import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { config } from "process";
import React, { useRef, useState } from "react";
import { errorType } from "../../Auth/types";
import Button from "../../common/buttons/Button";
import CourseCreationInputField from "./CourseCreationInputField";
import UploadImage from "./UploadImage";

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

      const token = window.localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const req = await axios.post(
        "http://localhost:8000/course",
        formData,
        config
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
    <div className="flex items-center justify-center">
      <form
        ref={fromRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="p-6 shadow-2xl m-10 flex flex-col space-y-3"
      >
        <h1 className="text-center text-xl font-slab font-bold pb-2 text-indigo-600">
          Create New Course
        </h1>

        <CourseCreationInputField
          state={formData}
          handleChange={handleChange}
        />

        <UploadImage />

        <Button type="button" handleClick={submitHandler} text="Submit" />

        <Snackbar
          open={error.open}
          autoHideDuration={6000}
          onClose={closeError}
        >
          <Alert onClose={closeError} severity="error">
            {error.msg}
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
