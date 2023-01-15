import React from "react";

export default function Participant() {
  return (
    <section className="h-full flex flex-wrap items-center justify-center">
      <ParticipantCard email="langesh@gmail.com" type="admin" />
      <ParticipantCard email="langesh@gmail.com" type="student" />
      <ParticipantCard email="langesh@gmail.com" type="student" />
      <ParticipantCard email="langesh@gmail.com" type="student" />
      <ParticipantCard email="langesh@gmail.com" type="student" />
      <ParticipantCard email="langesh@gmail.com" type="student" />
      <ParticipantCard email="langesh@gmail.com" type="student" />
    </section>
  );
}

function ParticipantCard({
  email,
  type,
}: {
  email: string;
  type: "student" | "admin";
}) {
  return (
    <div className="shadow-lg p-4 border  m-3 rounded space-x-4">
      <span>{email}</span>
      <span className="text-xs text-slate-500">{type}</span>
    </div>
  );
}
