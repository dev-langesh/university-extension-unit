import Link from "next/link";
import React from "react";
import LinkButton from "../common/buttons/LinkButton";

export default function Navbar() {
  return (
    <header className="p-4 flex items-center justify-between bg-gradient-to-tr from-blue-500 to-indigo-500 text-white">
      <h1 className="font-slab font-bold md:text-xl">
        Unidad de extensión universitaria
      </h1>

      <nav className="space-x-5">
        <LinkButton href="/auth/login" text="Sign in" variant="contained" />
        <LinkButton href="/auth/login" text="Sign up" variant="outlined" />
      </nav>
    </header>
  );
}
