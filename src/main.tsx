import React from "react";
import ReactDOM from "react-dom/client";
import AuthContextProvider from "./context/AuthContext.jsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
  </React.StrictMode>
);
