import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";

export default function UserNav() {
  return (
    <>
      <IconButton sx={{ color: "white" }}>
        <ViewQuiltIcon />
      </IconButton>

      <IconButton sx={{ color: "white" }}>
        <AccountCircleIcon />
      </IconButton>
    </>
  );
}
