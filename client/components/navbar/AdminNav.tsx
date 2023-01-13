import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";

export default function AdminNav() {
  return (
    <>
      <IconButton sx={{ color: "white" }}>
        <ViewQuiltIcon />
      </IconButton>
      <IconButton sx={{ color: "white" }}>
        <AddIcon />
      </IconButton>
      <IconButton sx={{ color: "white" }}>
        <AccountCircleIcon />
      </IconButton>
    </>
  );
}
