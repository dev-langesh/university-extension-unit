import axios from "axios";
import React, { useRef, useState } from "react";
import Button from "../../common/buttons/Button";
import CourseCreationInputField from "./CourseCreationInputField";
import UploadImage from "./UploadImage";

export default function CourseCreationForm() {
  const fromRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<any>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((p: any) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function submitHandler(e: any) {
    e.preventDefault();

    if (fromRef.current) {
      const formData = new FormData(fromRef?.current);

      const token = window.localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const req = await axios.post(
        "http://localhost:8000/course",
        formData,
        config
      );

      const data = req.data;

      console.log(data);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form
        ref={fromRef}
        onSubmit={submitHandler}
        className="p-6 shadow-2xl m-10 flex flex-col space-y-3"
      >
        <h1 className="text-center text-xl font-slab font-bold pb-2 text-indigo-600">
          Create New Course
        </h1>

        <CourseCreationInputField
          state={formData}
          handleChange={handleChange}
        />

        <UploadImage />

        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
}
