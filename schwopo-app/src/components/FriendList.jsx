import React, { useContext, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MessagingContext } from './MessagingContext.js';
import {getApp} from "firebase/app"; 
import {getFirestore, collection, setDoc, addDoc, getDocs, where, arrayUnion} from "firebase/firestore"; 

async function fetchFriends() {
  const db = getFirestore(getApp());
  const querySnapshot = await getDocs(collection(db, "friends"), where("userId", "==", "manull")); // HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY Replace "manull" with the actual user ID
  var friends = [];
  querySnapshot.forEach((doc) => {
    friends = doc.data().friends;
  });
  return friends;
}

async function addFriend(friendName) {
  var success = false;
  var error = null;

  const db = getFirestore(getApp());
  const friends = await fetchFriends();

  if (friends.includes(friendName)) {
    error = "Friend already exists";
    success = false;
    return { success, error };
  }

  const docRef = await getDocs(collection(db, "friends"), where("userId", "==", "manull")); // HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY Replace "manull" with the actual user ID
  setDoc(docRef.docs[0].ref,
    {
      userId: "manull", // HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEY Replace "manull" with the actual user ID
      friends: arrayUnion(friendName)
    }, { merge: true }
  )


}

function FriendList()
{
  const { state, dispatch } = useContext(MessagingContext);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");

  useEffect(() => {
    fetchFriends().then(setFriends);
  }, []);

  const setUser = (name) => {
    console.log("Setting active partner to:", name);
    dispatch({ type: 'SET_ACTIVE_PARTNER', payload: name });
  };

  const handleAddFriend = () => {
    // Implement add friend functionality
    addFriend(newFriend).then(fetchFriends).then(setFriends);
  };

  const nameItems = friends.map((name) => 
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
        <Box>
          <TextField
            label="New Friend"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
          />
          <Button onClick={handleAddFriend}>Add Friend</Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default FriendList;