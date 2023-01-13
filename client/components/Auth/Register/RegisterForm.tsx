import React, { useState } from "react";
import Button from "../../common/buttons/Button";
import { inputs } from "./inputs";
import Link from "next/link";
import { Alert, Radio, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

type errorType = {
  open: boolean;
  msg?: string;
};

type stateType = {
  username: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "student" | "administerator";
};

export default function RegisterForm() {
  const [state, setState] = useState<stateType>({
    username: "",
    phone: 0,
    email: "",
    password: "",
    userType: "student",
    confirmPassword: "",
  });
  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const closeError = () => setError({ open: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const req = await axios.post("http://localhost:8000/auth/login", state);

    const data = req.data;

    setLoading(false);
    if (data.error) {
      setError({
        open: true,
        msg: data.error,
      });
    } else {
      window.localStorage.setItem("token", data.token);
      router.push("/");
    }
  };

  function setUserType(e: any) {
    setState((prev) => ({
      ...prev,
      userType: e.target.value,
    }));
  }

  return (
    <div className="w-screen flex items-center justify-center pt-16 pb-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center"
      >
        <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
          Register
        </h1>

        <section className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Radio
              checked={state?.userType === "student"}
              onChange={setUserType}
              value="student"
              name="radio-buttons"
              inputProps={{ "aria-label": "Student" }}
              size="small"
            />{" "}
            Student
          </div>
          <div className="flex items-center">
            <Radio
              checked={state?.userType === "administerator"}
              onChange={setUserType}
              value="administerator"
              name="radio-buttons"
              inputProps={{ "aria-label": "Administerator" }}
              size="small"
            />{" "}
            Administrator
          </div>
        </section>

        {inputs.map((inp, i) => {
          return (
            <input
              onChange={handleChange}
              className="border px-2 py-1 text-[15px] outline-none"
              {...inp}
              key={i}
            />
          );
        })}

        <Button type="submit" text={loading ? "Loading..." : "Submit"} />

        <p className="text-center text-slate-500 text-sm">
          Already have an account?
          <br />
          <Link className="text-blue-500" href="/auth/login">
            Login
          </Link>
        </p>
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
