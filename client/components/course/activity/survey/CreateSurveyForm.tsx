import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../../common/buttons/Button";
import AddIcon from "@mui/icons-material/Add";
import { Alert, IconButton, Snackbar } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { errorType } from "../../../Auth/types";

const initialState = {
  title: "",
  questions: [
    {
      id: 1,
      question_text: "",
    },
  ],
  course_id: "",
};

let id = 2;

export default function CreateSurveyForm() {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setData((p: any) => ({
        ...p,
        course_id: router.query.id,
      }));
    }
  }, [router.query]);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setData((p: any) => {
      return {
        ...p,
        title: e.target.value,
      };
    });
  }

  function addQuestion() {
    setData((p: any) => {
      return {
        ...p,
        questions: [
          ...p.questions,
          {
            id: id++,
            question_text: "",
          },
        ],
      };
    });
  }

  function removeQuestion(id: any) {
    const questions = data.questions.filter((question) => {
      return question.id !== id;
    });

    setData((p: any) => {
      return {
        ...p,
        questions,
      };
    });
  }

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };

  function updateQuestion(e: React.ChangeEvent<HTMLInputElement>, i: any) {
    const copy = JSON.parse(JSON.stringify(data));

    copy.questions[i].question_text = e.target.value;

    setData(copy);
  }

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!data.questions[0].question_text || !data.title) {
      setError(() => {
        return {
          open: true,
          msg: "Rellene todos los campos",
        };
      });
    } else {
      console.log(data);
      const req = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/survey`,
        data
      );

      console.log(req.data);

      setData(initialState);

      history.back();
    }
  }

  return (
    <form
      className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
      onSubmit={submitHandler}
    >
      <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
        Crear encuesta
      </h1>

      <input
        onChange={changeHandler}
        name="title"
        placeholder="T??tulo"
        className="border p-2 outline-none"
        id=""
        value={data.title}
      ></input>

      <h2>Preguntas</h2>

      <div className="space-y-2">
        {data.questions.map((question: any, i) => {
          return (
            <div key={question.id} className="flex">
              <input
                onChange={(e) => updateQuestion(e, i)}
                type="text"
                className="border p-2 outline-none flex-1"
                placeholder={`Pregunta ${i + 1}`}
                value={data.questions[i].question_text}
              />
              {i === data.questions.length - 1 && (
                <>
                  <IconButton onClick={addQuestion}>
                    <AddIcon />
                  </IconButton>
                  {i !== 0 && (
                    <IconButton onClick={() => removeQuestion(question.id)}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      <Button type="submit" text={"Entregar"} />

      <Snackbar open={error.open} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
    </form>
  );
}
