/* importing react packages and auth from firebase
*/
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};
//exporting the other modules and variables into this file since they are used here.
export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState("empty");
  const [connecting, setConnecting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
//if the user is not new then user will land on home page
//else- when the user is new, he/she will have to sign up/login into account 
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAppState("home");
        setCurrentUser(user);
        console.log(user);
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);

  const value = {
    appState,
    currentUser,
    connecting,
    setConnecting,
    snackbarOpen,
    setSnackbarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
