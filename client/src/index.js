import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/style.css";
// import AuthProvider from './components/AuthProvider';
const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <Router>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Router>
  </UserContextProvider>
);
