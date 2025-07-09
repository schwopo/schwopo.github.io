import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { MessagingContext } from "./MessagingContext.js";

import {getApp} from "firebase/app"; 
import {getFirestore, collection, setDoc, addDoc, getDocs, where, arrayUnion} from "firebase/firestore"; 

async function sendMessage(message, activePartnerId) {
  const db = getFirestore(getApp());
  var querySnapshot = await getDocs(collection(db, "messages"), where("participants", "array-contains", "manull")); // HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY Replace "manull" with the actual user ID
  console.log("Query snapshot:", querySnapshot);
  querySnapshot = querySnapshot.docs.filter(doc => doc.data().participants.includes(activePartnerId));
  console.log("Query snapshot after filter:", querySnapshot);

  var docRef = null;

  if (querySnapshot.length === 0) {
    // If no message document exists for the user, create one
    await addDoc(collection(db, "messages"), {
      participants: ["manull", activePartnerId], // HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY Replace "manull" with the actual user ID
    });
    console.log("Created new message document for participants:", ["manull", activePartnerId]);
  }
  else {
    // If a message document exists, use the first one
    docRef = querySnapshot[0].ref;
    console.log("Found existing message document");
    console.log("Document reference:", docRef);
  }

  await setDoc(docRef, {
    messages: arrayUnion({ author: "manull", content: message }) // HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY Replace "manull" with the actual user ID
  }, { merge: true });
}

export function MessageInput() {
  const [input, setInput] = useState("");
  const { state } = useContext(MessagingContext);

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