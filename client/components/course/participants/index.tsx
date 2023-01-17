import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Participant() {
  const router = useRouter();
  const [participants, setParticipants] = useState<any>([]);

  useEffect(() => {
    const id = router.query.id;

    async function getData() {
      const req = await axios.get(
        `http://localhost:8000/course/${id}/participants`
      );

      const data = req.data;

      console.log(data);

      if (!data.error) {
        setParticipants(data.students);
      }
    }

    if (id) {
      getData();
    }
  }, [router.query]);

  return (
    <section className="h-full flex flex-wrap items-center justify-center">
      {participants.map((p: any) => {
        return <ParticipantCard email={p.email} key={p.student_id} />;
      })}
    </section>
  );
}

function ParticipantCard({ email }: { email: string }) {
  return (
    <div className="shadow-lg p-4 border  m-3 rounded space-x-4">
      <span>{email}</span>
    </div>
  );
}
