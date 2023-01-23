import React, { useEffect, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import { errorType } from "../../../Auth/types";
import Button from "../../../common/buttons/Button";
import { useAppSelector } from "../../../../src/app/hooks";
import { getSelectedActivity } from "../../../../src/features/submission/uploadWork.slice";
import UploadForm from "./UploadForm";
import ActivityDetails from "./ActivityDetails";
import CompletedWork from "../status/CompletedWork";
import { useRouter } from "next/router";
import { decodeToken } from "../../../hooks/decodeToken";

export default function UploadWork() {
  const [error, setError] = useState<errorType>({
    open: false,
    msg: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<any>({
    stauts: false,
    work: {},
  });

  const formRef = useRef(null);

  const activity = useAppSelector(getSelectedActivity);

  const router = useRouter();

  useEffect(() => {
    async function getSubmittedWork() {
      const token = window.localStorage.getItem("token");

      if (!token) {
        return [];
      }

      setLoading(true);
      const activity_id = router.query.id;

      const obj = decodeToken(token);

      const req = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/submit/?student_id=${obj.id}&activity_id=${activity_id}`
      );
      setLoading(false);

      const data = req.data;
      console.log(data);

      if (data.work) {
        setSubmitted({
          status: true,
          work: data.work,
        });
      }

      if (data.error) {
        setError(data.error);
      }
    }

    getSubmittedWork();
  }, [router.query]);

  const closeError = () => {
    setError((prev) => ({ ...prev, open: false }));

    setTimeout(() => {
      setError({ open: false, msg: "" });
    }, 400);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let formData;

    if (formRef.current) {
      formData = new FormData(formRef.current);

      const activity_id: any = router.query.id;

      formData.append("activity_id", activity_id);
    }

    const token = window.localStorage.getItem("token");

    if (!token) {
      return [];
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    const req = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/submit`,
      formData,
      config
    );

    setLoading(false);

    const data = req.data;

    console.log(data);

    if (data.error) {
      setError({
        open: true,
        msg: data.error,
      });
    } else {
      history.back();
    }
  };

  return (
    <div className="w-screen flex items-center justify-around pt-16 pb-10 row-span-6 col-span-12">
      <ActivityDetails
        title={activity.activity_title}
        due_date={activity.due_date}
      />

      {submitted.status ? (
        <CompletedWork work={submitted} />
      ) : (
        <UploadForm
          handleSubmit={handleSubmit}
          closeError={closeError}
          error={error}
          formRef={formRef}
          loading={loading}
        />
      )}
    </div>
  );
}
