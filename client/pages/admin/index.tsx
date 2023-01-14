import React from "react";
import CourseCreationForm from "../../components/admin/CreateCourse/CourseCreationForm";
import { useAppSelector } from "../../src/app/hooks";
import { getCCF } from "../../src/features/admin/courseCreationSlice";

export default function Admin() {
  const CCF = useAppSelector(getCCF);

  return <div>{CCF && <CourseCreationForm />}</div>;
}
