import React, { useRef, useState } from "react";
import Button from "../../common/buttons/Button";
import Link from "next/link";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import Footer from "./Footer";
import LoginInputField from "./LoginInputField";

type errorType = {
  open: boolean;
  msg?: string;
};

type stateType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [state, setState] = useState<stateType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      setError({ open: true, msg: "Fill All The Fields" });
    }

    setLoading(true);

    const req = await axios.post("http://localhost:8000/auth/login", state);

    const data = req.data;

    setLoading(false);

    setState({
      email: "",
      password: "",
    });

    if (data.error) {
      setError({
        open: true,
        msg: data.error,
      });
    } else {
      window.localStorage.setItem("token", data.token);

      if (data.userType !== "student") window.location.href = "/admin";
      else window.location.href = "/user/dashboard";
    }
  };

  return (
    <div className="w-screen flex items-center justify-center pt-16 pb-20">
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center"
      >
        <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
          Login
        </h1>
        <LoginInputField handleChange={handleChange} />

        <Link
          className="text-slate-500 text-sm hover:underline"
          href="/auth/reset-password"
        >
          Forgot Password?
        </Link>

        <Button type="submit" text={loading ? "Loading..." : "Submit"} />

        <Footer />

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
