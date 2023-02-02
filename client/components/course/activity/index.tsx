import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import SurveyCard from "./survey/SurveyCard";

export default function Activities() {
  const [data, setData] = useState<any>([]);
  const [survey, setSurvey] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const course_id = router.query.id;

      if (course_id) {
        const req = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/activity/?course_id=${course_id}`
        );

        const req1 = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/survey/${course_id}`
        );

        const data1 = req1.data;

        const data = req.data;

        if (!data.error) {
          setData(data.activities);
        }

        if (!data1.error) {
          setSurvey(data1);
        }
      }
    }

    getData();
  }, [router.query]);

  return (
    <div className="flex h-full items-center justify-center flex-col">
      <section className="w-full h-full md:w-[600px]">
        {data.length === 0 && (
          <h1 className="text-slate-500 text-center pt-10">Sin actividades</h1>
        )}

        {survey.map((s: any) => {
          return <SurveyCard {...s} />;
        })}

        {data.map((activity: any) => {
          return (
            <ActivityCard
              key={activity._id}
              id={activity._id}
              title={activity.title}
              date={activity.due_date}
            />
          );
        })}
      </section>
    </div>
  );
}
