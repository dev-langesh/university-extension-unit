import React, { useState } from "react";
import Button from "../../../common/buttons/Button";

export default function ProvideMarks() {
  const [state, setState] = useState<{
    comment: string;
    marks: number;
  }>({
    comment: "",
    marks: 0,
  });

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

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
