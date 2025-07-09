import {useContext} from "react";
import {BrowserRouter, Routes, Route} from "react-router";
import ChatScreen from "./ChatScreen";
import SignInScreen from "./SignInScreen";
import LandingScreen from "./LandingScreen";
import {AuthContext} from "./AuthContext";

export function Routing() {
  const { state } = useContext(AuthContext);
  const isAuthenticated = state.loggedInUser !== null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="chat" element={isAuthenticated ? <ChatScreen /> : <SignInScreen />} />
        <Route path="login" element={<SignInScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
