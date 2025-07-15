import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState("");
  const [writeVisible, setWriteVisible] = useState(false);
  const hideWhenVisible = { display: writeVisible ? "none" : "" };
  const showWhenVisible = { display: writeVisible ? "" : "none" };

  useEffect(() => {
    blogService.getAll().then((response) => {
      setBlogs(response);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  function logOut() {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser("");
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotifications({
        message: "wrong username or password",
        kind: "error",
      });
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1 className="flex justify-center">My blog</h1>
      <Notification notification={notifications} />
      <BlogList blogs={blogs} />
      {user ? (
        <div>
          <div className="flex justify-center">
            connected user : {user.username}
            <button onClick={logOut}>log out</button>
          </div>
          <div className="md:flex md:justify-center">
            <div style={hideWhenVisible}>
              <button onClick={() => setWriteVisible(true)}>write blog</button>
            </div>
            <div style={showWhenVisible}>
              <button onClick={() => setWriteVisible(false)}>cancel</button>
              <BlogForm
                className="md:flex md:flex-col px-12 w-1s00"
                showWhenVisible={showWhenVisible}
                setWriteVisible={setWriteVisible}
                user={user}
                notifications={notifications}
                setNotifications={setNotifications}
                createBlog={async (blogObject) => {
                  const returnedBlog = await blogService.create(blogObject);
                  setBlogs(blogs.concat(returnedBlog));
                  return returnedBlog;
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      )}
    </div>
  );
};

export default App;
