import Link from "next/link";
import React from "react";

export default function CourseHeader({ setPage }: { setPage: any }) {
  return (
    <header className="w-full p-3 flex items-center justify-center space-x-6">
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
