import React from "react";

export default function StatusContainer({
  type,
}: {
  type: "completed" | "pending";
}) {
  return (
    <section className="border-r h-[90vh] col-span-6 md:col-span-3 row-span-6 overflow-auto shadow">
      <h1 className="font-bold font-slab text-xl text-indigo-600 text-center pt-4">
        {type === "completed" ? "Completed" : "Pending"}
      </h1>
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
      <StatusCard email="langesh@gmail.com" id="1" />
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
