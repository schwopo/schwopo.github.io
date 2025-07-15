
import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { MessagingContext } from "./MessagingContext.js";
import { AuthContext } from "./AuthContext.jsx";

import {getApp} from "firebase/app"; 
import {getAuth} from "firebase/auth"; 
import {getFirestore, collection, setDoc, addDoc, getDocs, where, arrayUnion} from "firebase/firestore"; 
import { updateProfile } from "firebase/auth";


export function ChangeNameInput() {
  const [input, setInput] = useState("");
  const { state } = useContext(MessagingContext);
  const { state: authState, dispatch: authDispatch, setUsername} = useContext(AuthContext);

const sendChangeName = async (name) => {
	const auth = getAuth();
	setUsername(name);
}

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {

      sendChangeName(input).then(() => {
        console.log("Name changed:", input);
      });

      setInput("");
    }
  };

  return (
    <TextField
      label="Set new username"
      variant="outlined"
      sx={{ flexGrow: 1 }}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default ChangeNameInput;