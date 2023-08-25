import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/useAuthContext.jsx";
import { FilterContextProvider } from "./contexts/useFilterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FilterContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </FilterContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
