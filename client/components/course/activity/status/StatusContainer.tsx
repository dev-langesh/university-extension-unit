import React from "react";

export default function StatusContainer({
  type,
  data,
}: {
  type: "completed" | "pending";
  data: any[];
}) {
  return (
    <section className="border-r h-[90vh] col-span-6 md:col-span-3 row-span-6 overflow-auto shadow">
      <h1 className="font-bold font-slab text-xl text-indigo-600 text-center pt-4">
        {type === "completed" ? "Completed" : "Pending"}
      </h1>
      {data.map((d) => {
        return (
          <StatusCard email={d.email} key={d.student_id} id={d.student_id} />
        );
      })}
    </section>
  );
}

type statusPropType = {
  email: string;
  id: string;
};

function StatusCard({ email, id }: statusPropType) {
  return (
    <div className="text-ellipsis p-4 text-slate-700 border-b border-slate-200 hover:bg-slate-100 cursor-pointer">
      {email}
    </div>
  );
}
