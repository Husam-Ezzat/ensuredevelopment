import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./services/apiClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);
