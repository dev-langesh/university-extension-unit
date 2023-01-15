import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { errorType } from "../../../components/Auth/types";
import Button from "../../../components/common/buttons/Button";

export default function CreateActivityPage() {
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

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <div className="w-screen flex items-center justify-center pt-16 pb-10">
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
      >
        <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
          Create Activity
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border px-2 py-1 text-[15px] outline-none"
        />

        <div>
          <label className="text-sm" htmlFor="date">
            Due Date
          </label>
          <br />
          <input
            id="date"
            type="date"
            className="border w-full px-2 py-1 text-[15px] outline-none"
          />
        </div>

        <div>
          <label className="text-sm" htmlFor="file">
            Documents
          </label>
          <br />
          <input id="file" type="file" />
        </div>

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
