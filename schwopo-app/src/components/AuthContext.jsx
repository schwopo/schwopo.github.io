import { useEffect, useRef, useReducer, createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9TnvJ1q4kPrKmQDhJlebYQS5bqzhgg_U",
  authDomain: "schwopoapp.firebaseapp.com",
  projectId: "schwopoapp",
  storageBucket: "schwopoapp.firebasestorage.app",
  messagingSenderId: "1099486094427",
  appId: "1:1099486094427:web:13cb3d2e53306578b74b7e",
};

export const AuthContext = createContext({
  loggedInUser: null,
});

export function AuthContextProvider({ children }) {
  const app = useRef(null);
  useEffect(() => {
    // Initialize Firebase app
    app.current = initializeApp(firebaseConfig);
    // Get the authentication instance

  }, []);


  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, loggedInUser: action.payload };
      default:
        return state;
    }
  };

  const signIn = (email, password) => {
    const auth = getAuth(app);
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
  }


  const [state, dispatch] = useReducer(authReducer, AuthContext);

  return (
    <AuthContext.Provider value={{ AuthContext, state, dispatch, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
