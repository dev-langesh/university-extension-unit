import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../../common/buttons/Button";
import { useUserRole } from "../../../hooks/useUserRole";

export default function SurveyCard(props: any) {
  const role = useUserRole();

  const router = useRouter();

  return (
    <div className="p-3 shadow-lg m-4 border-l-4  border-pink-500">
      <p className="text-slate-500 text-sm">Encuesta</p>

      <div className="flex justify-between">
        <h1 className="pb-1">{props.title}</h1>

        {role !== "student" && (
          <Link
            href={`/course/${router.query.id}/survey/${props._id}`}
            className="bg-orange-500 text-white px-1"
          >
            Respuestas
          </Link>
        )}
      </div>

      {role === "student" && <SurveyAnswerForm survey_id={props._id} />}
    </div>
  );
}

function SurveyAnswerForm(props: any) {
  const [data, setData] = useState<any>({
    id: props.survey_id,
    reply: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((p: any) => ({
      ...p,
      reply: e.target.value,
    }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const token = window.localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const req = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/survey/reply`,
      data,
      config
    );

    const d = req.data;

    console.log(d);

    setData((p: any) => ({
      ...p,
      reply: "",
    }));
  }

  return (
    <form className="flex space-x-4" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        className="border w-full  px-2 py-1 flex-1"
        placeholder="Reply"
        type="text"
        value={data.reply}
      />
      <div>
        <Button text="Responder" type="submit" />
      </div>
    </form>
  );
}
