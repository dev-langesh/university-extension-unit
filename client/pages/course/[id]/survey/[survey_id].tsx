import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Replys() {
  const router = useRouter();
  const [replies, setReplies] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      const req = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/survey/${router.query.survey_id}/replies`
      );

      console.log(req.data);

      setReplies(req.data.answers);
    }

    getData();
  }, [router.query]);
  return (
    <section>
      <h1 className="text-center pt-6 text-xl font-bold font-slab">
        Todas las respuestas
      </h1>
      <div className="w-full md:w-[500px] p-6 space-y-4 mx-auto">
        {replies.map((reply: any) => {
          return <ReplyCard {...reply} key={reply._id} />;
        })}
      </div>
    </section>
  );
}

function ReplyCard(props: any) {
  return (
    <div className="w-full shadow-md p-3 flex justify-between border-l-4 border-blue-500">
      <h1>{props.answer}</h1>
      <aside className="text-slate-500">
        <p className="text-gray-700">{props.name}</p>
        <p>{props.student_id}</p>
      </aside>
    </div>
  );
}
