import Link from "next/link";
import React from "react";
import LinkButton from "../common/buttons/LinkButton";

export default function Navbar() {
  return (
    <header className="p-4 flex items-center justify-between bg-gradient-to-tr from-blue-500 to-indigo-500 text-white">
      <h1 className="font-slab font-bold md:text-xl">
        <Link href="/">Unidad de extensión universitaria</Link>
      </h1>

      <nav className="space-x-5 hidden sm:block">
        <LinkButton href="/auth/login" text="Acceso" variant="contained" />
        <LinkButton
          href="/auth/register"
          text="Registrarse"
          variant="outlined"
        />
      </nav>
    </header>
  );
}
