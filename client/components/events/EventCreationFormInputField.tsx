import React from "react";
import { inputs } from "./inputs";

type propType = {
  state: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EventCreationInputField({
  state,
  handleChange,
}: propType) {
  return (
    <>
      {inputs.map((inp, i) => {
        return (
          <input
            onChange={handleChange}
            className="border px-2 py-1 text-[15px] outline-none"
            {...inp}
            value={state[inp.name]}
            key={i}
          />
        );
      })}
    </>
  );
}
