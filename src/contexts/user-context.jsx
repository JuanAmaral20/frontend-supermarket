import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(null);

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserContext.Provider>
  );
};
