import React from "react";
import useCourses from "../../hooks/useCourses";
import CourseCard from "./CourseCard";

export default function CreatedCourses() {
  const courses = useCourses();

  return (
    <div className="p-6 w-full ">
      <h1 className="text-center text-xl font-slab font-bold pb-2 text-indigo-600">
        Cursos registrados
      </h1>{" "}
      <section className="flex flex-wrap flex-col md:flex-row items-center justify-center">
        {courses.length === 0 && (
          <h1 className="text-slate-500 text-center pt-10">
            No se encontraron cursos
          </h1>
        )}
        {courses.map((course: any) => {
          return (
            <CourseCard
              key={course._id}
              title={course.title}
              id={course._id}
              sub_title={course.sub_title}
              img={course.img}
              code={course.code}
            />
          );
        })}
      </section>
    </div>
  );
}
