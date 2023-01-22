import React from "react";
import CourseCreationForm from "../../components/admin/CreateCourse/CourseCreationForm";
import CreateEventForm from "../../components/events/CreateEventForm";

export default function CreateCoursePage() {
  return (
    <div className="flex items-center justify-center md:flex-row flex-col">
      <CourseCreationForm />
      <CreateEventForm />
    </div>
  );
}
