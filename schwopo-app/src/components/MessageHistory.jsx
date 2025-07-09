import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import Message from "./Message.jsx";
import { MessagingContext } from './MessagingContext.js';
import Typography from '@mui/material/Typography';
import {getApp} from "firebase/app"; 
import {getFirestore, collection, addDoc, getDocs, where} from "firebase/firestore"; 

function MessageHistory() {
  const { state } = useContext(MessagingContext);
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const db = getFirestore(getApp());
    setMessageList([]);

    const querySnapshot = getDocs(
      collection(db, "messages"),
      where("participants", "array-contains", "manull")
  ).then(
      (querySnapshot) => {
        console.log("Messages fetched successfully");
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} =>`, doc.data());
          if (doc.data().participants.includes(state.activePartnerId)) {
            console.log("Found messages for active partner:", state.activePartnerId);
            setMessageList(doc.data().messages);
          }
        });
      }
    );
  }, [state.activePartnerId]);

  const messageJsx = messageList.map((message) => (
    <Message author={message.author} message={message.content} />
  ));

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={2}>
        <Typography>Chat with {state.activePartnerId || "nobody"}:</Typography>
        {messageJsx}
      </Stack>
    </Box>
  );
}

export default MessageHistory;