import React, { useState } from "react";
import Button from "../../common/buttons/Button";
import { initialRegisterState } from "./inputs";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { validateRegister } from "./validateRegister";
import { errorType, RegisterStateType } from "../types";
import RadioGroup from "./RadioGroup";
import FormFields from "./FormFields";
import Footer from "./Footer";
import Link from "next/link";

export default function RegisterForm() {
  const [state, setState] = useState<RegisterStateType>(initialRegisterState);
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

    try {
      console.log(state);

      await validateRegister({ state });

      setLoading(true);

      const req = await axios.post(
        "http://localhost:8000/auth/register",
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
        setState(initialRegisterState);

        router.push("/auth/verify-email");
      }
    } catch (err) {
      if (err) {
        setError({
          open: true,
          msg: err,
        });
      }
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
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
      >
        <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
          Registro
        </h1>

        <FormFields handleChange={handleChange} />

        <Button type="submit" text={loading ? "Cargando..." : "Registrar"} />

        <Footer />
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
