import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AllWorkoutsContextProvider } from "./context/allWorkoutsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AllWorkoutsContextProvider>
      <App />
    </AllWorkoutsContextProvider>
  </StrictMode>
);
