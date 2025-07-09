import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext.jsx";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

export function SignInScreen() {
  const [email, setEmail] = useState("manull@schwopo.com");
  const [password, setPassword] = useState("manuel");
  const [message, setMessage] = useState("");
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignIn = () => {

    const onSuccess = () =>
    {
	console.log("Sign in successful");
	navigate("/chat");
    }

    const onFailure = (message) =>
    {
	console.log("Sign in failed");
    	setMessage(message);
    }

    signIn(email, password, onSuccess, onFailure);
  };

  return (
    <>
    <Stack spacing={2} alignItems={"center"} sx={{ padding: 2 }}>
      <Typography variant="h3">Welcome to Schwopo! Please sign in</Typography>
      <Card>
	<Stack spacing={2} alignItems={"center"} sx={{ padding: 2 }}>
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
	  variant="filled"
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
	  variant="filled"
        />
        <Button onClick={handleSignIn}>
          Sign In
        </Button>

      <Typography variant="body2" color="error">
        {message}
      </Typography>
      </Stack>
      </Card>

    </Stack>
    </>
  );
}

export default SignInScreen;
