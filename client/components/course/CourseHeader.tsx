import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { decodeToken } from "../../components/hooks/decodeToken";

export default function CourseHeader({ setPage }: { setPage: any }) {
  const [type, setType] = useState<"admin" | "administrator" | "student">(
    "student"
  );

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);

      setType(user.role);
    }
  }, []);

  return (
    <header className="w-full p-3 flex items-center justify-center space-x-6">
      {type === "admin" ||
        (type === "administrator" && (
          <ButtonWithLink setPage={setPage} text="Create Course" />
        ))}
      <Button setPage={setPage} text="Activities" />
      <Button setPage={setPage} text="Participants" />
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

function ButtonWithLink({ text, setPage }: { text: string; setPage: any }) {
  function clickHandler() {
    setPage(text.toLocaleLowerCase());
  }

  const router = useRouter();

  const [id, setId] = useState<string | string[]>("");

  useEffect(() => {
    if (router.query.id) {
      setId(router.query.id);
    }
  }, [router.query]);

  return (
    <Link
      href={`/course/${id}/create-activity`}
      onClick={clickHandler}
      className="text-slate-600 cursor-pointer border-b-2 border-white hover:border-indigo-600"
    >
      {text}
    </Link>
  );
}
