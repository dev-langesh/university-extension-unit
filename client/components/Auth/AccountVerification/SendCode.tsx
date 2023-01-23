import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Button from "../../common/buttons/Button";
import { errorType } from "../types";

export default function SendCode({ openVerifyStep }: { openVerifyStep: any }) {
  const [state, setState] = useState<{ email: string }>({
    email: "",
  });
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

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);

    const req = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/send-code`,
      state
    );

    const data = req.data;

    setLoading(false);

    if (data.error) {
      setError({
        open: true,
        msg: data.error,
      });
    } else {
      window.localStorage.setItem("email", state.email);
      openVerifyStep();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  return (
    <div className="w-screen flex items-center justify-center pt-16 pb-20">
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center"
      >
        <h1 className="text-center text-xl font-bold font-slab text-indigo-600">
          Enter Your Email
        </h1>

        <p className="text-slate-500 pb-2">
          The verification code will be sent to this mail
        </p>

        <input
          type="text"
          name="email"
          placeholder="Email"
          className="border px-2 py-1 text-[15px] outline-none"
          onChange={handleChange}
        />

        <Button text={loading ? "Loading..." : "Send Code"} type="submit" />

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
