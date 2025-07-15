import { useEffect, useRef, useReducer, createContext } from "react";
import { initializeApp, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore, collection, setDoc, doc, addDoc, getDoc, where, arrayUnion} from "firebase/firestore"; 

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
    username: null,
}

export const AuthContext = createContext(authObject)

export function AuthContextProvider({ children }) {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, loggedInUser: action.payload };
      case "SET_USERNAME":
        return { ...state, username: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(authReducer, authObject);
  const app = useRef(null);
  useEffect(() => {
    // Initialize Firebase app
    app.current = initializeApp(firebaseConfig);
    // Get the authentication instance

  }, []);



  const setUsername = (username) => {
    setUsernameFor(state.loggedInUser, username);
  };

  const setUsernameFor = (uid, username) => {
    const db = getFirestore(getApp());
    console.log("Setting username for:", uid);
    console.log("Setting username to:", username);

    setDoc(doc(db, "usernames", uid),
    {
      name: username
    }).then(() => {
      dispatch({
        type: "SET_USERNAME",
        payload: username
      });
    });

  };


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
          payload: user.uid,
        });

        setUsernameFor(user.uid, user.displayName || user.email);
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

  const googleSignin = (onSuccess, onFailure) => {
    const auth = getAuth(getApp());
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Google user signed in:", user);

        dispatch({
          type: "LOGIN",
          payload: user.uid,
        });

      const db = getFirestore(getApp());
      getDoc(doc(db, "usernames", user.uid)).then((docSnap) => {
       if (!docSnap.exists())
       {
        setUsernameFor(user.uid, user.displayName || user.email);
       }
      });
    });
  }



  return (
    <AuthContext.Provider value={{ state, dispatch, signIn, googleSignin, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
}
