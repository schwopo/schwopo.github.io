import {use, useState} from "react"
import './App.css';
import {Chat, Messaging} from "./api/Messaging.js"
import { MessagingProvider } from "./components/MessagingContext";
import ChatScreen from "./components/ChatScreen";
import SignInScreen from "./components/SignInScreen";
import LandingScreen from "./components/LandingScreen";
import { BrowserRouter, Routes, Route} from "react-router";

function App() {
  return (
    <>
      <MessagingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="chat" element={<ChatScreen />} />
            <Route path="login" element={<SignInScreen />} />
          </Routes>
        </BrowserRouter>
      </MessagingProvider>
    </>
  );
}

export default App;
