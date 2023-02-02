import React from "react";
import { inputs } from "./inputs";

type propType = {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function FormFields({ handleChange }: propType) {
  return (
    <>
      {inputs.map((inp, i) => {
        if (inp.name === "career") {
          return (
            <>
              <input
                onChange={handleChange}
                className="border px-2 py-1 text-[15px] outline-none"
                {...inp}
                key={i}
              />

              <select
                onChange={handleChange}
                name="semister"
                className="border p-2"
              >
                <option value="1° semestre">1° semestre</option>
                <option value="2° semestre">2° semestre</option>
                <option value="3° semestre">3° semestre</option>
                <option value="3° semestre">4° semestre</option>
                <option value="5° semestre">5° semestre</option>
                <option value="6° semestre">6° semestre</option>
                <option value="7° semestre">7° semestre</option>
                <option value="8° semestre">8° semestre</option>
              </select>
            </>
          );
        }
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
