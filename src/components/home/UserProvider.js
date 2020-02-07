import React, { useState } from "react";
import { getCookie } from "../../utilities/Utilities";
import UserContext from "./UserContext";

export default ({ children }) => {
  const [username, setUsername] = useState(getCookie("Watchist-Username"));

  return (
    <UserContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
      }}>
      {children}
    </UserContext.Provider>
  );
};
