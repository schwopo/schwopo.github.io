import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import Message from "./Message.jsx";
import { MessagingContext } from './MessagingContext.js';
import { AuthContext } from './AuthContext.jsx';
import Typography from '@mui/material/Typography';
import {getApp} from "firebase/app"; 
import {getFirestore, collection, addDoc, getDocs, where} from "firebase/firestore"; 


function MessageHistory() {
  const { state } = useContext(MessagingContext);
  const { state: authState } = useContext(AuthContext);

  const [messageList, setMessageList] = useState([]);
  const fetchMessages = async (activePartnerId) => {
    const db = getFirestore(getApp());

    const querySnapshot = await getDocs(
      collection(db, "messages")
    );

    console.log("Messages fetched successfully");

    var messages = [];

    querySnapshot.forEach((doc) => {
      console.log("Checking document:", doc.id);
      console.log("Document data:", doc.data());
      console.log("Participants in document:", doc.data().participants);
      console.log("Active partner ID:", activePartnerId);
      console.log("Logged-in user:", authState.loggedInUser);
      // Check if the active partner ID is in the participants array
      // and if the logged-in user is also in the participants array  

      if (doc.data().participants.includes(activePartnerId)
        && doc.data().participants.includes(authState.loggedInUser)) {
        messages = doc.data().messages;
      console.log("Found messages for active partner:", activePartnerId);
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