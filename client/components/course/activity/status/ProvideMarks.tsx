import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../../common/buttons/Button";
import { decodeToken } from "../../../hooks/decodeToken";

export default function ProvideMarks(props: any) {
  const [state, setState] = useState<{
    comment: string;
    marks: number | string;
  }>({
    comment: "",
    marks: "",
  });

  const router = useRouter();

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prev: any) => {
      return {
        ...prev,
        [e.target.name]: [e.target.value],
      };
    });
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const token = window.localStorage.getItem("token");

    if (token) {
      const obj = decodeToken(token);

      const activity_id = router.query.id;

      console.log(props);

      const req = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/submit/?student_id=${props.studentId}&activity_id=${activity_id}&marks=${state.marks}&remarks=${state.comment}`
      );

      const data = req.data;

      window.location.reload();
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <textarea
        className="border p-2 outline-none w-full"
        placeholder="Observaciones"
        name="comment"
        id=""
        cols={30}
        rows={5}
        value={state.comment}
        onChange={changeHandler}
      ></textarea>{" "}
      <input
        type="text"
        value={state.marks}
        onChange={changeHandler}
        name="marks"
        className="border px-2 py-1 text-[15px] outline-none  w-full"
        placeholder="Introducir marca de actividad"
      />
      <Button type="submit" text="Submit" />
    </form>
  );
}
