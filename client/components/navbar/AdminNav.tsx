import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import {
  getProfile,
  openProfile,
  closeProfile,
} from "../../src/features/profile/profileSlice";
import Profile from "./Profile";
import {
  closeCCF,
  openCCF,
} from "../../src/features/admin/courseCreationSlice";
import { useRouter } from "next/router";

export default function AdminNav() {
  const profile = useAppSelector(getProfile);
  const dispatch = useAppDispatch();

  const router = useRouter();

  function accountClickHandler() {
    if (profile.openProfile) {
      dispatch(closeProfile());
    } else {
      dispatch(openProfile());
    }
  }

  function openCourseCreation() {
    dispatch(openCCF());
  }

  return (
    <section>
      <IconButton
        onClick={() => {
          dispatch(closeCCF());
          router.push("/admin");
        }}
        sx={{ color: "white" }}
      >
        <ViewQuiltIcon />
      </IconButton>
      <IconButton onClick={openCourseCreation} sx={{ color: "white" }}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={accountClickHandler} sx={{ color: "white" }}>
        <AccountCircleIcon />
      </IconButton>

      <Profile />
    </section>
  );
}
