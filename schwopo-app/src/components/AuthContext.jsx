import { useEffect, useRef, useReducer, createContext } from "react";
import { initializeApp, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9TnvJ1q4kPrKmQDhJlebYQS5bqzhgg_U",
  authDomain: "schwopoapp.firebaseapp.com",
  projectId: "schwopoapp",
  storageBucket: "schwopoapp.firebasestorage.app",
  messagingSenderId: "1099486094427",
  appId: "1:1099486094427:web:13cb3d2e53306578b74b7e",
};

const authObject =  {
	  loggedInUser: null,
}

export const AuthContext = createContext(authObject)

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

  const [state, dispatch] = useReducer(authReducer, authObject);

  const signIn = (email, password, onSuccess, onFailure) => {
    console.log("Signing in with email:", email);
    const auth = getAuth(getApp());
    console.log(auth);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully!
        const user = userCredential.user;
        console.log("User signed in:", user);

        dispatch({
	  type: "LOGIN",
	  payload: email
        });
	onSuccess();

      })
      .catch((error) => {
        // Handle errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
        // Display error message to the user (e.g., "Invalid credentials", "User not found")
	onFailure(errorMessage);
      }) ;
  }



  return (
    <AuthContext.Provider value={{ state, dispatch, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
