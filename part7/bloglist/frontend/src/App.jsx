import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import { useLoginValue, useLoginDispatch } from "./LoginContext";
import Container from "react-bootstrap/Container";

const App = () => {
  const dispatchLogin = useLoginDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem("user"));

    if (loggedUser) {
      dispatchLogin({ type: "LOGIN", payload: loggedUser });
      blogService.setToken(loggedUser.token);
    }
    setIsLoading(false);
  }, []);

  const login = useLoginValue();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Notification />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            login !== null ? <Blogs /> : <Navigate replace to="/login" />
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/users"
          element={login ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Container>
  );
};

export default App;
