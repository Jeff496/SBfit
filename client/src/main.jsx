import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AllWorkoutsContextProvider } from "./context/allWorkoutsContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AllWorkoutsContextProvider>
        <App />
      </AllWorkoutsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
