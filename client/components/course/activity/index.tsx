import React from "react";
import ActivityHeader from "../CourseHeader";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  return (
    <div className="flex h-full items-center justify-center flex-col">
      <main className="w-full h-full md:w-[600px]">
        <ActivityCard
          id="1"
          title="Create an  Ecommerce application"
          date="12-10-2003"
        />
        <ActivityCard
          id="1"
          title="Create an  Ecommerce application"
          date="12-10-2003"
        />
        <ActivityCard
          id="1"
          title="Create an  Ecommerce application"
          date="12-10-2003"
        />
        <ActivityCard
          id="1"
          title="Create an  Ecommerce application"
          date="12-10-2003"
        />
      </main>
    </div>
  );
}
