import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Message from "./Message.jsx";

function MessageHistory()
{
  const [messageList, setMessageList] = useState([

    {
      author: "manull",
      message: "hello everynyan"
    },
    {
      author: "manull",
      message: "how are you"
    },
    {
      author: "manull",
      message: "fine thank you"
    },
  ]);

  const messageJsx = messageList.map( (message) =>
      <Message
        author={message.author}
        message={message.message}
      />
  );

  return (
    <Box sx={{flex: 1}}>
      <Stack>
        {messageJsx}
      </Stack>
    </Box>
  )
}

export default MessageHistory;