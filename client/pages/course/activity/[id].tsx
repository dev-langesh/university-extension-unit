import React from "react";
import CompletedWork from "../../../components/course/activity/status/CompletedWork";
import StatusContainer from "../../../components/course/activity/status/StatusContainer";

export default function Activity() {
  return (
    <div className="grid grid-cols-12 grid-rows-6 ">
      <StatusContainer type="completed" />
      <StatusContainer type="pending" />
      <CompletedWork />
    </div>
  );
}
