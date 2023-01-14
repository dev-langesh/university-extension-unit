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
import { useEffect } from "react";
import axios from "axios";

export default function UserNav() {
  const profile = useAppSelector(getProfile);
  const dispatch = useAppDispatch();

  function clickHandler() {
    if (profile.openProfile) {
      dispatch(closeProfile());
    } else {
      dispatch(openProfile());
    }
  }

  return (
    <>
      <IconButton sx={{ color: "white" }}>
        <ViewQuiltIcon />
      </IconButton>

      <IconButton onClick={clickHandler} sx={{ color: "white" }}>
        <AccountCircleIcon />
      </IconButton>

      <Profile />
    </>
  );
}
