import { Alert, Snackbar } from "@mui/material";
import React from "react";
import Button from "../../../common/buttons/Button";

export default function UploadForm({
  formRef,
  handleSubmit,
  loading,
  closeError,
  error,
}: {
  formRef: any;
  handleSubmit: any;
  loading: any;
  closeError: any;
  error: any;
}) {
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
    >
      <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
        Subir trabajo
      </h1>

      <textarea
        className="border p-2 outline-none"
        placeholder="Comentario"
        name="comment"
        id=""
        cols={30}
        rows={5}
      ></textarea>

      <input type="file" name="work" />

      <Button type="submit" text={loading ? "Cargando..." : "Entregar"} />

      <Snackbar onClose={closeError} open={error.open} autoHideDuration={6000}>
        <Alert onClose={closeError} severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
    </form>
  );
}
