import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createContext } from "react";

export const Context = createContext();

function AppWraper() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Context.Provider value={{ isAuth, setIsAuth }}>
      <Toaster />
      <App />
    </Context.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWraper />
  </StrictMode>
);
