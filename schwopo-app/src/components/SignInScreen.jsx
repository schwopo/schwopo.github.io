import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext.jsx";

export function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSignIn = (e) => {
    signIn(email, password);
    navigate("/chat");
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInScreen;
