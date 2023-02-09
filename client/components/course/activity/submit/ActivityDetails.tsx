import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function ActivityDetails({
  title,
  due_date,
}: {
  title: string;
  due_date: string;
}) {
  const [activity, setActivity] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    async function getActivity() {
      const token = window.localStorage.getItem("token");

      if (!token) {
        return [];
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const activity_id = router.query.id;

      if (activity_id) {
        const req = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/activity/${activity_id}`,
          config
        );

        const data = req.data;

        console.log(data);

        if (!data.error) {
          setActivity(data.activities);
        }
      }
    }

    getActivity();
  }, [router.query]);

  return (
    <div>
      <h1 className="text-black">{activity.title}</h1>
      <p className="text-sm text-slate-500">
        Fecha de vencimiento: {activity.due_date}
      </p>
      <br />
      {activity.material && (
        <a rel="noreferrer" target="_blank" href={activity.material}>
          <div className="border px-4 py-2 flex items-center justify-between bg-slate-100">
            <h1>{activity.material_name}</h1>
          </div>
        </a>
      )}
    </div>
  );
}
