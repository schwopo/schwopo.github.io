import { useContext } from "react";
import { MessagingContext } from "./MessagingContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export function UserBar() {
  const { state } = useContext(MessagingContext);
  const user = state.loggedInUser || "Nobody";

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Avatar>{user[0]}</Avatar>
            <Typography variant="button">{user}</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default UserBar;