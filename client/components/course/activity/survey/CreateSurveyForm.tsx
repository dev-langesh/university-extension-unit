import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../../common/buttons/Button";

export default function CreateSurveyForm() {
  const [data, setData] = useState({
    title: "",
    course_id: "",
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

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setData((p: any) => {
      return {
        ...p,
        title: e.target.value,
      };
    });
  }

  async function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    console.log(data);
    const req = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/survey`,
      data
    );

    console.log(req.data);
  }

  return (
    <form
      className="shadow-2xl p-8 space-y-3 flex flex-col justify-center w-4/5 sm:w-80"
      onSubmit={submitHandler}
    >
      <h1 className="text-center text-2xl font-bold pb-4 font-slab text-indigo-600">
        Crear encuesta
      </h1>

      <textarea
        onChange={changeHandler}
        name="title"
        placeholder="Título"
        className="border p-2 outline-none"
        id=""
        cols={30}
        rows={5}
      ></textarea>
      <Button type="submit" text={"Entregar"} />
    </form>
  );
}
