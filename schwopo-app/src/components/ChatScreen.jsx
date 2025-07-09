import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FriendList from "./FriendList";
import MessageHistory from "./MessageHistory";
import { useState } from "react";
import UserBar from "./UserBar";

function MessageInput() {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      //messageList.push(input);
      setInput("");
    }
  };

  return (
    <TextField
      label="Write your message"
      variant="outlined"
      sx={{ flexGrow: 1 }}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

function ChatScreen() {
  return (
    <>
      <Container sx={{ height: "100vh", padding: 2 }}>
	<UserBar />
        <Paper sx={{ height: "100%", padding: 2 }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid size={4}>
              <Paper sx={{ height: "100%", padding: 1, bgcolor: "ButtonFace" }}>
                <FriendList />
              </Paper>
            </Grid>
            <Grid size={8}>
              <Paper sx={{ height: "100%", padding: 2 }}>
                <Stack sx={{ height: "100%" }}>
                  <MessageHistory />
                  <Stack direction={"row"}>
                    <MessageInput />
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default ChatScreen;