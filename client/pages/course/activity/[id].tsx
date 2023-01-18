import React from "react";
import CompletedWork from "../../../components/course/activity/status/CompletedWork";
import StatusContainer from "../../../components/course/activity/status/StatusContainer";
import UploadWork from "../../../components/course/activity/upload/UploadWork";
import { useUserRole } from "../../../components/hooks/useUserRole";

export default function Activity() {
  const type = useUserRole();

  return (
    <div className="grid grid-cols-12 grid-rows-6 ">
      {type === "student" ? (
        <>
          <UploadWork />
        </>
      ) : (
        <>
          <StatusContainer type="completed" />
          <StatusContainer type="pending" />
          <CompletedWork />
        </>
      )}
    </div>
  );
}
