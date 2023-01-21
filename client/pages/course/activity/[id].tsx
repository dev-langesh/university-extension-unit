import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CompletedWork from "../../../components/course/activity/status/CompletedWork";
import StatusContainer from "../../../components/course/activity/status/StatusContainer";
import UploadWork from "../../../components/course/activity/submit/Work";
import { useUserRole } from "../../../components/hooks/useUserRole";
import { useAppSelector } from "../../../src/app/hooks";
import { getSelectedActivity } from "../../../src/features/submission/uploadWork.slice";

export default function Activity() {
  const type = useUserRole();

  const [submitted, setSubmitted] = useState<any>({
    stauts: false,
    work: {},
  });

  const [status, setStatus] = useState<{
    completed: any[];
    pending: any[];
  }>({
    completed: [],
    pending: [],
  });

  const router = useRouter();

  useEffect(() => {
    async function getSubmittedWork() {
      const token = window.localStorage.getItem("token");

      if (!token) {
        return [];
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const req = await axios.get("http://localhost:8000/submit", config);

      const data = req.data;

      if (data.work) {
        setSubmitted({
          status: true,
          work: data.work,
        });
      }
    }

    getSubmittedWork();

    async function getStatus() {
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
          `http://localhost:8000/activity/${activity_id}/status`,
          config
        );

        const data = req.data;

        if (!data.error) {
          setStatus(data);
        }
      }
    }

    getStatus();
  }, [router.query]);

  return (
    <div className="grid grid-cols-12 grid-rows-6 ">
      {type === "student" ? (
        <>
          <UploadWork />
        </>
      ) : type === "admin" || type === "administrator" ? (
        <>
          <StatusContainer data={status.completed} type="completed" />
          <StatusContainer data={status.pending} type="pending" />
          <CompletedWork work={submitted} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
