import React from "react";
import CourseCard from "./CourseCard";

export default function CreatedCourses() {
  return (
    <div className="p-6 w-full ">
      <h1 className="text-center text-xl font-slab font-bold pb-2 text-indigo-600">
        Registered Courses
      </h1>{" "}
      <section className="flex flex-wrap flex-col md:flex-row items-center justify-center">
        <CourseCard
          title="Javascript"
          sub_title="Let's master JS with me."
          img="https://www.tutorialrepublic.com/lib/images/javascript-illustration.png"
        />
        <CourseCard
          title="React"
          sub_title="React is a wonderfull to learn. Are you ready to learn"
          img="https://dwglogo.com/wp-content/uploads/2017/09/React_logo_vector.svg"
        />
      </section>
    </div>
  );
}
