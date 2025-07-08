import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import Message from "./Message.jsx";
import { MessagingContext } from './MessagingContext.js';
import Typography from '@mui/material/Typography';

function MessageHistory()
{
  const { messaging } = useContext(MessagingContext);
  const messageList = messaging ?
    messaging.chats[messaging.activePartnerId]?.messages : [];
    console.log(messaging);


  const messageJsx = messageList.map( (message) =>
      <Message
        author={message.author}
        message={message.message}
      />
  );

  return (
    <Box sx={{flex: 1}}>
      <Stack spacing={2}>
        <Typography>
          Chat with {messaging?.activePartnerId || "nobody"}:
        </Typography>
        {messageJsx}
      </Stack>
    </Box>
  )
}

export default MessageHistory;