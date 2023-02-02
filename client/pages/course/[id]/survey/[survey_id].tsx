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
    <div className="w-full md:w-[500px] p-6 space-y-4">
      {replies.map((reply: any) => {
        return <ReplyCard {...reply} key={reply._id} />;
      })}
    </div>
  );
}

function ReplyCard(props: any) {
  return (
    <div className="w-full shadow-md p-2 flex justify-between">
      <h1>{props.answer}</h1>
      <aside className="text-slate-500">
        <p>{props.name}</p>
        <p>{props.student_id}</p>
      </aside>
    </div>
  );
}
