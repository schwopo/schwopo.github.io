import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function FriendList()
{
  const [names, setNames] = useState(["Pedro", "Albertus", "TheKiller99"]);

  const nameItems = names.map((name) => 
    <Paper sx={{padding:1}}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Avatar>{name[0]}</Avatar>
        <Typography>
          {name}
        </Typography>
      </Stack>
    </Paper>
  );

  return (
    <Box sx={{ height: "100%"}}>
      <Stack spacing={2}>
        {nameItems}
      </Stack>
    </Box>
  )
}

export default FriendList;