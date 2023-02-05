import { CleaningServices } from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { setEnvironmentData } from "worker_threads";
import Button from "../../../common/buttons/Button";
import { decodeToken } from "../../../hooks/decodeToken";
import { useUserRole } from "../../../hooks/useUserRole";

export default function SurveyCard(props: any) {
  const role = useUserRole();

  const router = useRouter();

  const [answered, setAnswered] = useState<Boolean>(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const decoded = decodeToken(token);

      if (token) {
        const isAnswered = props.answers.find((a: any) => {
          return a.sid == decoded.id;
        });

        if (isAnswered) {
          setAnswered(true);
        }
      }
    }
  }, []);

  return (
    <div className="p-3 shadow-lg m-4 border-l-4  border-pink-500">
      <div className="flex justify-between">
        <p className="text-slate-500 text-sm">{props.title}</p>

        {
          <Link
            href={`/course/${router.query.id}/survey/${props._id}`}
            className="bg-orange-500 text-white px-1"
          >
            Respuestas
          </Link>
        }
      </div>

      {role === "student" && !answered && (
        <SurveyAnswerForm
          setAnswered={setAnswered}
          {...props}
          survey_id={props._id}
        />
      )}
    </div>
  );
}

function SurveyAnswerForm(props: any) {
  const [data, setData] = useState<any>({
    id: props.survey_id,
    replies: [],
  });

  console.log(props);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, qid: string) {
    setData((p: any) => ({
      ...p,
      replies: {
        ...p.replies,
        [e.target.name]: e.target.value,
      },
    }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    console.log(data);

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

    props.setAnswered(true);
  }

  return (
    <form className="flex space-x-4 items-end" onSubmit={handleSubmit}>
      <div className="flex-1 space-y-3">
        {props.questions.map((question: any, i: number) => {
          return (
            <div className="">
              <p className="text-sm">{question.question_text}</p>
              <input
                onChange={(e) => handleChange(e, question._id)}
                className="border w-full  px-2 py-1 flex-1"
                placeholder="Reply"
                type="text"
                name={question._id}
                value={data.reply}
              />
            </div>
          );
        })}
      </div>
      <div>
        <Button text="Responder" type="submit" />
      </div>
    </form>
  );
}
