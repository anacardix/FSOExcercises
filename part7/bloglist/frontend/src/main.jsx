import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./NotificationContext";
import { LoginContextProvider } from "./LoginContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={new QueryClient()}>
      <LoginContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </LoginContextProvider>
    </QueryClientProvider>
  </Router>
);
