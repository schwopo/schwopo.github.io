import React, { useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { MessagingContext } from './MessagingContext.js';

function FriendList()
{
  const { state, dispatch } = useContext(MessagingContext);
  const names = ["Alice", "Bob", "Charlie"];

  const setUser = (name) => {
    console.log("Setting active partner to:", name);
    dispatch({ type: 'SET_ACTIVE_PARTNER', payload: name });
  };

  const nameItems = names.map((name) => 
    <Paper sx={{padding:1, cursor: "pointer"}} onClick={() => setUser(name)} key={name}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Avatar>{name[0]}</Avatar>
        <Typography variant="button">
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