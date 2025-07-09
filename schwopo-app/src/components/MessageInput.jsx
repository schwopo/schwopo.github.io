import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { MessagingContext } from "./MessagingContext.js";


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