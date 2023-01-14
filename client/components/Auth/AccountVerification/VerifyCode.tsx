import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../common/buttons/Button";
import { errorType } from "../types";

export default function VerifyCode() {
  const [state, setState] = useState<{ code: string; email: string }>({
    email: "",
    code: "",
  });
  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const _email = window.localStorage.getItem("email");

    if (_email) {
      setState((p) => ({ ...p, email: _email }));
    }
  }, []);

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
      "http://localhost:8000/auth/verify-code",
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
      window.localStorage.setItem("token", data.token);

      if (data.userType !== "student") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user/dashboard";
      }
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
          Enter Your OTP
        </h1>

        <p className="text-slate-500 pb-2">
          The verification code sent to{" "}
          {state.email ? state.email : "your email"}
        </p>

        <input
          type="text"
          name="code"
          value={state.code}
          placeholder="OTP"
          className="border px-2 py-1 text-[15px] outline-none"
          onChange={handleChange}
        />

        <Button
          text={loading ? "Loading..." : "Verify Account"}
          type="submit"
        />

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
