import { useLoginValue, useLoginDispatch } from "../LoginContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const Header = () => {
  const login = useLoginValue();

  const dispatchLogin = useLoginDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    window.localStorage.removeItem("user");
    dispatchLogin({ type: "LOGOUT" });
    navigate("/login");
  };

  if (!login) {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Blog app</Navbar.Brand>
        </Navbar>
      </>
    );
  }

  const padding = {
    padding: 5,
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Blog app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <span>{login.name} logged in</span>
          <Button variant="danger" onClick={onClickLogout}>logout</Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
