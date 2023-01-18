import axios from "axios";
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
  }, []);

  console.log(type);

  return (
    <div className="grid grid-cols-12 grid-rows-6 ">
      {type === "student" ? (
        <>
          <UploadWork />
        </>
      ) : type === "admin" || type === "administrator" ? (
        <>
          <StatusContainer type="completed" />
          <StatusContainer type="pending" />
          <CompletedWork work={submitted} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
