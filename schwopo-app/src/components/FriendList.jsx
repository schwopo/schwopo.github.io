import React, { useContext, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MessagingContext } from './MessagingContext.js';
import { AuthContext } from './AuthContext.jsx';
import {getApp} from "firebase/app"; 
import {doc, getFirestore, collection, setDoc, getDoc, addDoc, getDocs, where, query, arrayUnion} from "firebase/firestore"; 


function FriendList()
{
  const {state: authState} = useContext(AuthContext);
  const { state, dispatch } = useContext(MessagingContext);
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");

  useEffect(() => {
    fetchFriends().then(setFriends);
  }, []);

  const setUser = (uid) => {
    console.log("Setting active partner to:", uid);
    dispatch({ type: 'SET_ACTIVE_PARTNER', payload: uid });
  };

  const handleAddFriend = () => {
    // Implement add friend functionality
    addFriend(newFriend).then(fetchFriends).then(setFriends);
  };

  const fetchFriends = async () => {
    console.log("Fetching friends for:", authState.loggedInUser);
    const db = getFirestore(getApp());
    const docSnap = await getDoc(
      doc(db, "friends", authState.loggedInUser)
    );

    if (!docSnap.exists()) {
      console.log("No friends document found for user:", authState.loggedInUser);

      setDoc(doc(db, "friends", authState.loggedInUser),
        {
          friends: []
        });

      return [];
    }

    console.log("Document", docSnap);
    const friends = docSnap.data().friends;
    console.log("Fetched friends:", friends);

    const friendsData = await Promise.all(friends.map(async (uid) => {
      const name = await fetchNameByUid(uid);
      if (!name) {
        console.warn(`No name found for UID: ${uid}`);
      }
      return { uid, name };
    }));


    return friendsData;
  };

  const fetchUidByName = async (name) => {
    const db = getFirestore(getApp());
    const q = query(collection(db, "usernames"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    let uid = null;
    querySnapshot.forEach((doc) => {
      uid = doc.id;
    });
    return uid;
  };

  const fetchNameByUid = async (uid) => {
    const db = getFirestore(getApp());
    const docSnap = await getDoc(doc(db, "usernames", uid));
    return docSnap.exists() ? docSnap.data().name : null;
  };

const addFriend = async (friendName) => {
  var success = false;
  var error = null;

  const db = getFirestore(getApp());
  const friends = await fetchFriends();

  //if (friends.includes(friendName)) {
    //error = "Friend already exists";
    //success = false;
    //return { success, error };
  //}

  const friendUid = await fetchUidByName(friendName);
  if (!friendUid) {
    error = "Friend not found";
    success = false;
    return { success, error };
  }

  setDoc(doc(db, "friends", authState.loggedInUser),
    {
      friends: arrayUnion(friendUid)
    }, { merge: true }
  )
}

  const unselectedStyle = {
    padding: 1,
    cursor: "pointer"
  };
  const selectedStyle = {
    backgroundColor: "#faaafa",
    padding: 1,
  }

  const nameItems = friends.map(({uid, name}) => 
    <Paper sx={state.activePartner === uid ? selectedStyle : unselectedStyle} onClick={() => setUser(uid)} key={uid}>
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