import { Radio } from "@mui/material";
import React from "react";
import { RegisterStateType } from "../types";

type RadioGroupType = {
  state: RegisterStateType;
  setUserType: (e: any) => void;
};

export default function RadioGroup({ state, setUserType }: RadioGroupType) {
  return (
    <section className="flex items-center justify-between text-sm">
      <div className="flex items-center">
        <Radio
          checked={state?.userType === "student"}
          onChange={setUserType}
          value="student"
          name="radio-buttons"
          inputProps={{ "aria-label": "Student" }}
          size="small"
        />{" "}
        Student
      </div>
      <div className="flex items-center">
        <Radio
          checked={state?.userType === "administrator"}
          onChange={setUserType}
          value="administrator"
          name="radio-buttons"
          inputProps={{ "aria-label": "Administerator" }}
          size="small"
        />{" "}
        Administrator
      </div>
    </section>
  );
}
