import { use, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

export function LandingScreen() {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = state.loggedInUser !== null;

    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <></>;
}

export default LandingScreen;
