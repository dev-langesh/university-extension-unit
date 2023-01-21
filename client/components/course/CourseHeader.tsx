import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { decodeToken } from "../../components/hooks/decodeToken";
import { useUserRole } from "../hooks/useUserRole";

export default function CourseHeader({ setPage }: { setPage: any }) {
  const role = useUserRole();

  return (
    <header className="w-full p-3 flex items-center justify-center space-x-6">
      {role !== "student" && <ButtonWithLink text="Crear actividad" />}
      <Button setPage={setPage} text="Actividades" />
      <Button setPage={setPage} text="Estudiantes" />
    </header>
  );
}

function Button({ text, setPage }: { text: string; setPage: any }) {
  function clickHandler() {
    setPage(text.toLocaleLowerCase());
  }
  return (
    <span
      onClick={clickHandler}
      className="text-slate-600 cursor-pointer border-b-2 border-white hover:border-indigo-600"
    >
      {text}
    </span>
  );
}

function ButtonWithLink({ text }: { text: string }) {
  const router = useRouter();

  const [id, setId] = useState<string | string[]>("");

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query]);

  return (
    <>
      {id && (
        <Link
          href={`/course/${id}/create-activity`}
          className="text-slate-600 cursor-pointer border-b-2 border-white hover:border-indigo-600"
        >
          {text}
        </Link>
      )}
    </>
  );
}
