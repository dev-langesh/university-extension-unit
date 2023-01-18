import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  const [data, setData] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const course_id = router.query.id;

      if (course_id) {
        const req = await axios.get(
          `http://localhost:8000/activity/?course_id=${course_id}`
        );

        const data = req.data;

        if (!data.error) {
          setData(data.activities);
        }
      }
    }

    getData();
  }, [router.query]);

  return (
    <div className="flex h-full items-center justify-center flex-col">
      <main className="w-full h-full md:w-[600px]">
        {data.length === 0 && (
          <h1 className="text-slate-500 text-center pt-10">Sin actividades</h1>
        )}
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
      </main>
    </div>
  );
}
