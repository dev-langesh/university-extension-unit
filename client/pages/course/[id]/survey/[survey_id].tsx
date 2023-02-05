import { CleaningServices } from "@mui/icons-material";
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

      setReplies(req.data);
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
      <div className="space-y-2">
        {props.replies[0] &&
          props.replies[0].map((reply: any) => {
            console.log(reply);
            return (
              <div>
                <h1>{reply.question}</h1>
                <p className="text-sm">{reply.answer}</p>
              </div>
            );
          })}
      </div>

      <aside className="text-slate-500">
        <p className="text-gray-700">{props.name}</p>
        <p>{props.student_id}</p>
      </aside>
    </div>
  );
}
