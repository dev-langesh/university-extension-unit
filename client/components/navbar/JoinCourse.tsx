import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { errorType } from "../Auth/types";
import Button from "../common/buttons/Button";

export default function JoinCourse() {
  const [state, setState] = useState<string>();

  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState(e.target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const token = window.localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(config);

    setLoading(true);

    const req = await axios.post(
      "http://localhost:8000/course/register",
      { course_code: state },
      config
    );

    setLoading(false);

    const data = req.data;

    if (data.error) {
      setError({
        open: true,
        msg: data.error,
      });
    } else {
      window.location.reload();
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-14 bg-white right-3 text-black rounded-sm shadow-lg p-4 space-y-4"
    >
      <h1 className="text-xl font-bold font-slab text-center text-indigo-600">
        Join Classroom
      </h1>
      <input
        onChange={handleChange}
        type="text"
        value={state}
        placeholder="Enter course code"
        className="border w-full px-2 py-1 text-[15px] outline-none"
      />
      <Button text="Join" type="submit" />

      <Snackbar open={error.open} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
    </form>
  );
}
