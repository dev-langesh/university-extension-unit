import React from "react";

export default function ActivityDetails({
  title,
  due_date,
}: {
  title: string;
  due_date: string;
}) {
  return (
    <div>
      <h1 className="text-black">{title}</h1>
      <p className="text-sm text-slate-500">Fecha de vencimiento: {due_date}</p>
    </div>
  );
}
