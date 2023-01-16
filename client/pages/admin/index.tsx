import React from "react";
import CourseCreationForm from "../../components/admin/CreateCourse/CourseCreationForm";
import CreatedCourses from "../../components/admin/CreatedCourses/CreatedCourses";
import { useAppSelector } from "../../src/app/hooks";
import { getCCF } from "../../src/features/admin/courseCreationSlice";
import { GetStaticProps } from "next";
import axios from "axios";
import useCourses from "../../components/hooks/useCourses";

export default function Admin() {
  const CCF = useAppSelector(getCCF);

  return <div>{CCF ? <CourseCreationForm /> : <CreatedCourses />}</div>;
}
