import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import Activities from "../../../components/course/activity";
import CourseHeader from "../../../components/course/CourseHeader";
import Participants from "../../../components/course/participants";
import CourseProvider, { CourseContext } from "../../../context/CourseProvider";

export default function Course() {
  const [page, setPage] = useState<"activities" | "participants">("activities");

  return (
    <CourseProvider>
      <CourseHeader setPage={setPage} />

      {page === "activities" ? <Activities /> : <Participants />}
    </CourseProvider>
  );
}
