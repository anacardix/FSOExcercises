import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogCreate from "./components/BlogCreate";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });
  const blogCreateVisibility = useRef();

  const onSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedUser = await loginService.login({
        username,
        password,
      });

      if (loggedUser) {
        window.localStorage.setItem("user", JSON.stringify(loggedUser));
        blogService.setToken(loggedUser.token);
        setUser(loggedUser);
        setUsername("");
        setPassword("");
      }
    } catch (exception) {
      setNotification({
        type: "error",
        message: "wrong credentials",
      });
      resetNotification();
    }
  };

  const onSubmitCreate = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);

      if (createdBlog) {
        blogCreateVisibility.current.toggleVisibility();
        setBlogs(blogs.concat(createdBlog));
        setNotification({
          type: "success",
          message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        });
        resetNotification();
      }
    } catch (exception) {
      setNotification({
        type: "error",
        message: exception.message,
      });
      resetNotification();
    }
  };

  const onClickLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);

      if (updatedBlog) {
        setBlogs(
          blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        );
        setNotification({
          type: "success",
          message: `updated blog ${updatedBlog.title} by ${updatedBlog.author}`,
        });
        resetNotification();
      }
    } catch (exception) {
      setNotification({
        type: "error",
        message: exception.message,
      });
      resetNotification();
    }
  };

  const removeBlog = async (blogObject) => {
    if (
      !window.confirm(
        `Delete blog ${blogObject.title} by ${blogObject.author}?`
      )
    )
      return;

    try {
      const response = await blogService.remove(blogObject);

      if (response.status === 204) {
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        setNotification({
          type: "success",
          message: `deleted blog ${blogObject.title} by ${blogObject.author}`,
        });
        resetNotification();
      } else {
        setNotification({
          type: "error",
          message: "Failed to delete the blog",
        });
        resetNotification();
      }
    } catch (exception) {
      setNotification({
        type: "error",
        message: exception.message,
      });
      resetNotification();
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedUser = JSON.parse(window.localStorage.getItem("user"));

    if (loggedUser) {
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  function resetNotification() {
    setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 5000);
  }

  return (
    <>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm
          handleLogin={onSubmitLogin}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      ) : (
        <>
          <Togglable buttonLabel="create new blog" ref={blogCreateVisibility}>
            <BlogCreate handleCreate={onSubmitCreate} />
          </Togglable>
          <Blog
            user={user}
            handleLogout={onClickLogout}
            blogs={blogs}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        </>
      )}
    </>
  );
};

export default App;
