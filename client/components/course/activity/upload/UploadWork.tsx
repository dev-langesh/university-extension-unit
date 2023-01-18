import React, { useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { errorType } from "../../../Auth/types";
import Button from "../../../common/buttons/Button";

export default function UploadWork() {
  const [state, setState] = useState<any>("");
  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef(null);

  const router = useRouter();

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      let formData;

      if (formRef.current) {
        formData = new FormData(formRef.current);
      }

      const token = window.localStorage.getItem("token");

      if (!token) {
        return [];
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true);
      const req = await axios.post(
        "http://localhost:8000/submit",
        formData,
        config
      );

      setLoading(false);

      const data = req.data;

      if (data.error) {
        setError({
          open: true,
          msg: data.error,
        });
      }
      // else {
      //   router.push("/auth/verify-email");
      // }
    } catch (err) {
      if (err) {
        setError({
          open: true,
          msg: err,
        });
      }
    }
  };

  return (
    <div className="w-screen flex items-center justify-center pt-16 pb-10">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
      >
        <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
          Upload Work
        </h1>

        <input type="file" name="work" />

        <Button type="submit" text={loading ? "Loading..." : "Submit"} />

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
