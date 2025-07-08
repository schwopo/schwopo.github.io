import {use, useState} from "react"
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MessageHistory from "./components/MessageHistory.jsx"
import FriendList from "./components/FriendList.jsx"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Chat, Messaging} from "./api/Messaging.js"
import { MessagingProvider } from "./components/MessagingContext";

const firebaseConfig = {
  apiKey: "AIzaSyB9TnvJ1q4kPrKmQDhJlebYQS5bqzhgg_U",
  authDomain: "schwopoapp.firebaseapp.com",
  projectId: "schwopoapp",
  storageBucket: "schwopoapp.firebasestorage.app",
  messagingSenderId: "1099486094427",
  appId: "1:1099486094427:web:13cb3d2e53306578b74b7e"
};

const app = initializeApp(firebaseConfig);



// Get the authentication instance

const auth = getAuth();

// Assuming you have email and password from your form input fields
const email = "manull@schwopo.com"; // Replace with actual user input
const password = "manuel"; // Replace with actual user input

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in successfully!
    const user = userCredential.user;
    console.log("User signed in:", user);
    // You can now redirect the user to their dashboard, update UI, etc.
  })

  .catch((error) => {
    // Handle errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error signing in:", errorCode, errorMessage);
    // Display error message to the user (e.g., "Invalid credentials", "User not found")
  });

function MessageInput() {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      //messageList.push(input);
      setInput("");
    }
  };

  return (
    <TextField
      label="Write your message"
      variant="outlined"
      sx={{ flexGrow: 1 }}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

function App() {
  return (
    <>
      <MessagingProvider>
        <Container sx={{ height: "100vh", padding: 2 }}>
          <Paper sx={{ height: "100%", padding: 2 }}>
            <Grid container spacing={2} sx={{ height: "100%" }}>
              <Grid size={4}>
                <Paper
                  sx={{ height: "100%", padding: 1, bgcolor: "ButtonFace" }}
                >
                  <FriendList />
                </Paper>
              </Grid>
              <Grid size={8}>
                <Paper sx={{ height: "100%", padding: 2 }}>
                  <Stack sx={{ height: "100%" }}>
                    <MessageHistory />
                    <Stack direction={"row"}>
                      <MessageInput />
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </MessagingProvider>
    </>
  );
}

export default App;
