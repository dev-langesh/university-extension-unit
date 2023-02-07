import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserRole } from "../../hooks/useUserRole";

export default function Participant() {
  const router = useRouter();
  const [participants, setParticipants] = useState<any>([]);
  const [genFile, setGenFile] = useState<String>("");

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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/student-details/${router.query.id}`
    );

    setGenFile(req.data.filename);
  }

  return (
    <section className="w-full h-full p-6">
      <table className="table table-auto w-full border border-collapse">
        <tr className="border text-white bg-blue-500">
          <th className="border p-2">Nombre</th>
          <th className="border p-2">cedula</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Semistre</th>
          <th className="border p-2">Carrera</th>
        </tr>

        {participants.map((p: any) => {
          return <ParticipantRecord {...p} key={p._id} />;
        })}
      </table>

      <div className="flex items-end justify-end">
        {role !== "student" &&
          (genFile ? (
            <a
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/studentDetails/${genFile}`}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{ margin: "10px" }}
              >
                Download
              </Button>
            </a>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={generateFile}
              sx={{ margin: "10px" }}
            >
              Generate File
            </Button>
          ))}
      </div>
    </section>
  );
}

function ParticipantRecord({
  email,
  username,
  student_id,
  career,
  semister,
}: any) {
  return (
    <tr className="border even:bg-slate-100 ">
      <td className="border p-2">{username}</td>
      <td className="border p-2">{student_id}</td>
      <td className="border p-2">{email}</td>
      <td className="border p-2">{career}</td>
      <td className="border p-2">{semister}</td>
    </tr>
  );
}
