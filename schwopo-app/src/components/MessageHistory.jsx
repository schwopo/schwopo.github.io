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
  const { state: authState } = useContext(MessagingContext);

  const [messageList, setMessageList] = useState([]);
  const fetchMessages = async (activePartnerId) => {
    const db = getFirestore(getApp());

    const querySnapshot = await getDocs(
      collection(db, "messages"),
      where("participants", "array-contains", authState.loggedInUser)
    );

    console.log("Messages fetched successfully");

    var messages = [];

    querySnapshot.forEach((doc) => {

      console.log(`${doc.id} =>`, doc.data());

      if (doc.data().participants.includes(activePartnerId)) {
        console.log( "Found messages for active partner:", activePartnerId);
        console.log( "Found messages:", doc.data().messages);
        messages = doc.data().messages;
      }
    });

    return messages;
}

  useEffect(() => {
    setMessageList([]);
    fetchMessages(state.activePartnerId)
      .then((messages) => {
        console.log("Fetched messages:", messages);
        if (messages) {
          setMessageList(messages);
        } else {
          console.log("No messages found for active partner:", state.activePartnerId);
        }
      });


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