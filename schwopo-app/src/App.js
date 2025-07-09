import {use, useState} from "react"
import './App.css';
import {Chat, Messaging} from "./api/Messaging.js"
import { MessagingProvider } from "./components/MessagingContext";
import ChatScreen from "./components/ChatScreen";
import SignInScreen from "./components/SignInScreen";
import LandingScreen from "./components/LandingScreen";
import { BrowserRouter, Routes, Route} from "react-router";
import Routing from "./components/Routing";

function App() {
  return (
    <>
      <MessagingProvider>
        <Routing/>
      </MessagingProvider>
    </>
  );
}

export default App;
