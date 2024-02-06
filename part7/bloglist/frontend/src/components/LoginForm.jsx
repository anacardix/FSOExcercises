import { useState } from "react";
import { useLoginDispatch } from "../LoginContext";
import { useNotificationDispatch } from "../NotificationContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/login";
import blogService from "../services/blogs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatchLogin = useLoginDispatch();
  const dispatchNotification = useNotificationDispatch();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (loggedUser) => {
      window.localStorage.setItem("user", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      dispatchLogin({ type: "LOGIN", payload: loggedUser });
      setUsername("");
      setPassword("");
      navigate("/");
    },
    onError: () => {
      dispatchNotification({
        type: "SHOW",
        payload: { type: "danger", message: "wrong credentials" },
      });
    },
  });

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <Form onSubmit={onSubmitLogin}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="success" className="mt-4" type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
