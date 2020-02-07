import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home/Home";
import UserProvider from "./components/home/UserProvider";

function App() {
  return (
    <UserProvider>
      <Home></Home>
    </UserProvider>
  );
}

export default App;
