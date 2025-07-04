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


function SendButton() {
  return <Button variant="contained">Send</Button>;
}

function MessageInput() {
  return <TextField label="Write your message" variant="outlined" sx={{flexGrow: 1}}/>;
}

function Message({message, author})
{
  return (
    <Typography>
      {author}: {message}
    </Typography>
  )
}

function MessageHistory()
{
  const [messageList, setMessageList] = useState([]);
  return (
    <Box sx={{flex: 1}}>
      <Message
        author="manull"
        message="Hello everynyan"
      />
    </Box>
  )
}

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

function App() {
  return (
    <>
    <Container sx={{height: "100vh", padding: 2}}>
      <Paper sx={{height: "100%"}}>

      <Grid container spacing={2} sx={{height: "100%"}}>
        <Grid size={4}>
          <Paper sx={{height: "100%"}}>
            <FriendList />
          </Paper>
        </Grid>
        <Grid size={8}>
          <Stack sx={{height: "100%"}}>
            <MessageHistory />
            <Stack direction={"row"}>
              <MessageInput />
              <SendButton />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      </Paper>
    </Container>
    </>
  );
}

export default App;
