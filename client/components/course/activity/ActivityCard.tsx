import Link from "next/link";
import React from "react";

type propType = {
  title: string;
  date: string;
  id: string;
};

export default function ActivityCard({ title, date, id }: propType) {
  return (
    <Link
      href={`/course/activity/${id}`}
      className="p-2 m-4 border-l-4 border-indigo-600 shadow-lg hover:shadow-xl bg-white inline-block w-full transition-all duration-200"
    >
      <span className="text-xs text-slate-500">{date}</span>
      <h1>{title}</h1>
    </Link>
  );
}
