import { use, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export function LandingScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = true; // Replace with actual authentication check

    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <></>;
}

export default LandingScreen;
