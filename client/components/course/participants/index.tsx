import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserRole } from "../../hooks/useUserRole";

export default function Participant() {
  const router = useRouter();
  const [participants, setParticipants] = useState<any>([]);
  const [genFile, setGenFile] = useState<Boolean>(false);

  const role = useUserRole();

  useEffect(() => {
    const id = router.query.id;

    async function getData() {
      const req = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/course/${id}/participants`
      );

      const data = req.data;

      console.log(data);

      if (!data.error) {
        setParticipants(data);
      }
    }

    if (id) {
      getData();
    }
  }, [router.query]);

  async function generateFile(e: any) {
    const req = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/student-details`
    );

    setGenFile(true);
  }

  return (
    <section className="w-full h-full">
      {role !== "student" &&
        (genFile ? (
          <a
            href={`${process.env.NEXT_PUBLIC_SERVER_URL}/studentDetails/student-details.xlsx`}
          >
            <Button sx={{ marginLeft: "10px" }}>Download</Button>
          </a>
        ) : (
          <Button onClick={generateFile} sx={{ marginLeft: "10px" }}>
            Generate File
          </Button>
        ))}

      <section className="h-full flex flex-wrap items-center justify-center">
        {participants.map((p: any) => {
          return <ParticipantCard {...p} key={p._id} />;
        })}
      </section>
    </section>
  );
}

function ParticipantCard({
  email,
  username,
  student_id,
  career,
  semister,
}: any) {
  return (
    <div className="shadow-lg p-4 border  m-3 rounded space-y-2 w-52">
      <div>
        <h1 className="font-bold text-sm text-gray-700">Nombre Apellido</h1>
        <p className="text-slate-500">{username}</p>
      </div>
      <div>
        <h1 className="font-bold text-sm text-gray-700">Cedula</h1>
        <p className="text-slate-500">{student_id}</p>
      </div>
      <div>
        <h1 className="font-bold text-sm text-gray-700">Carrera</h1>
        <p className="text-slate-500">{career}</p>
      </div>
      <div>
        <h1 className="font-bold text-sm text-gray-700">Semestre</h1>
        <p className="text-slate-500">{semister}</p>
      </div>
      <div>
        <h1 className="font-bold text-sm text-gray-700">Email</h1>
        <p className="text-slate-500">{email}</p>
      </div>
    </div>
  );
}
