import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../../util/useLocalStorage";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useLocalStorage("", "jwt");
  return (
    <UserContext.Provider value={{ jwtToken, setJwtToken }}>
      {children}
    </UserContext.Provider>
  );
};

const useJwt = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useJwt must be used within a UserProvider");
    }
    return context;
};

export { UserProvider, useJwt };
