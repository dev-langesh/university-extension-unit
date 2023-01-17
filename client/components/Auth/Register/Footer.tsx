import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <p className="text-center text-slate-500 text-sm">
      ¿Ya tienes una cuenta?
      <br />
      <Link className="text-blue-500" href="/auth/login">
        Acceso
      </Link>
    </p>
  );
}
