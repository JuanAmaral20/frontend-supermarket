import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserContextProvider } from "./contexts/user-context.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
      <App />
  </UserContextProvider>
);
