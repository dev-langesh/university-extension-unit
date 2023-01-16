import Link from "next/link";
import React, { useContext, useEffect } from "react";
import LinkButton from "../common/buttons/LinkButton";
import { AuthContext } from "../../context/AuthProvider";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";

export default function Navbar() {
  const user = useContext(AuthContext);

  console.log(user);

  return (
    <header className="p-4 flex items-center justify-between bg-gradient-to-tr from-blue-500 to-indigo-500 text-white">
      <h1 className="font-slab font-bold md:text-xl">
        <Link href="/">Unidad de extensión universitaria</Link>
      </h1>
      <nav className="space-x-5 hidden sm:block">
        {!user && <NavWithoutAuth />}
        {user === "admin" || user === "administrator" ? (
          <AdminNav />
        ) : user === "student" ? (
          <UserNav />
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}

function NavWithoutAuth() {
  return (
    <>
      <LinkButton href="/auth/login" text="Acceso" variant="contained" />
      <LinkButton href="/auth/register" text="Registrarse" variant="outlined" />
    </>
  );
}
