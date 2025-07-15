import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { MessagingContext } from "./MessagingContext.js";
import { AuthContext } from "./AuthContext.jsx";

import {getApp} from "firebase/app"; 
import {getFirestore, collection, setDoc, addDoc, getDocs, where, arrayUnion} from "firebase/firestore"; 


export function MessageInput() {
  const [input, setInput] = useState("");
  const { state } = useContext(MessagingContext);
  const { state: authState } = useContext(AuthContext);

const sendMessage = async (message, activePartnerId) => {
  const db = getFirestore(getApp());
  var querySnapshot = await getDocs(collection(db, "messages"), where("participants", "array-contains", authState.loggedInUser));
  console.log("Query snapshot:", querySnapshot);
  querySnapshot = querySnapshot.docs.filter(doc => doc.data().participants.includes(activePartnerId));
  console.log("Query snapshot after filter:", querySnapshot);

  var docRef = null;

  if (querySnapshot.length === 0) {
    // If no message document exists for the user, create one
    docRef = await addDoc(collection(db, "messages"), {
      participants: [authState.loggedInUser, activePartnerId], 
    });
    console.log("Created new message document for participants:", [authState.loggedInUser, activePartnerId]);
  }
  else {
    // If a message document exists, use the first one
    docRef = querySnapshot[0].ref;
    console.log("Found existing message document");
    console.log("Document reference:", docRef);
  }

  await setDoc(docRef, {
    messages: arrayUnion({ author: authState.username, content: message })
  }, { merge: true });
}

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {

	sendMessage(input, state.activePartnerId).then(() => {
          console.log("Message sent:", input);
	});

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

export default MessageInput;