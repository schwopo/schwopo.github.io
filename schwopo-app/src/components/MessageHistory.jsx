import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import Message from "./Message.jsx";
import { MessagingContext } from './MessagingContext.js';
import Typography from '@mui/material/Typography';

function MessageHistory()
{
  const { state } = useContext(MessagingContext);

  const messageList = state.chats[state.activePartnerId]?.messages || [];

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
          Chat with {state.activePartnerId || "nobody"}:
        </Typography>
        {messageJsx}
      </Stack>
    </Box>
  )
}

export default MessageHistory;