import React from "react";
import { inputs } from "./inputs";

type propType = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormFields({ handleChange }: propType) {
  return (
    <>
      {inputs.map((inp, i) => {
        return (
          <input
            onChange={handleChange}
            className="border px-2 py-1 text-[15px] outline-none"
            {...inp}
            key={i}
          />
        );
      })}
    </>
  );
}
