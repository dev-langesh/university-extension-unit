import React, { useEffect, useState } from "react";
import Button from "../../common/buttons/Button";
import {
  adminInputs,
  adminRegisterationData,
  initialRegisterState,
} from "./inputs";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { validateRegister } from "./validateRegister";
import { errorType, RegisterStateType } from "../types";
import RadioGroup from "./RadioGroup";
import FormFields from "./FormFields";
import Footer from "./Footer";
import Link from "next/link";
import { CleaningServices } from "@mui/icons-material";

export default function RegisterForm({ type }: { type: String }) {
  const [state, setState] = useState<any>(initialRegisterState);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState((prev: any) => ({
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
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

        router.push("/auth/login");
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

  useEffect(() => {
    if (type === "admin") {
      setState(adminRegisterationData);
    } else {
      setState(initialRegisterState);
    }
  }, [type]);

  return (
    <div className="w-screen flex items-center justify-center pt-16 pb-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
      >
        <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
          Registro
        </h1>

        <FormFields type={type} handleChange={handleChange} />

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
