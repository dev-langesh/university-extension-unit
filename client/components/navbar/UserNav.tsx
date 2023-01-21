import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import Profile from "./Profile";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  closeProfile,
  getProfile,
  openProfile,
  setProfile,
} from "../../src/features/profile/profileSlice";
import AddIcon from "@mui/icons-material/Add";
import JoinClassroom from "./JoinCourse";
import { useState } from "react";
import Link from "next/link";

export default function UserNav() {
  const profile = useAppSelector(getProfile);
  const dispatch = useAppDispatch();
  const [join, setJoin] = useState<boolean>(false);

  function clickHandler() {
    if (profile.openProfile) {
      dispatch(closeProfile());
    } else {
      dispatch(openProfile());
    }
  }

  return (
    <div className="">
      <Link href="/user/dashboard">
        <IconButton sx={{ color: "white" }}>
          <ViewQuiltIcon />
        </IconButton>
      </Link>
      <IconButton onClick={() => setJoin((p) => !p)} sx={{ color: "white" }}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={clickHandler} sx={{ color: "white" }}>
        <AccountCircleIcon />
      </IconButton>
      <Profile />
      {join && <JoinClassroom />}
    </div>
  );
}
