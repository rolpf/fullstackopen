import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState("");
  const [writeVisible, setWriteVisible] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((response) => {
      setBlogs(sortBlogs(response));
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

  const deleteBlog = async ({ id, title, author }) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      setNotifications({
        message: "unable to remove blog " + id,
        kind: "error",
      });
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    }
  };

  const updateLikes = async (blog) => {
    const { id, title, author, url, likes } = blog;
    try {
      const updatedBlog = await blogService.update({
        id,
        title,
        author,
        url,
        likes: likes + 1,
      });
      setBlogs(
        sortBlogs(
          blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        )
      );
    } catch (error) {
      setNotifications({
        message: "unable to update blog " + blog.id,
        kind: "error",
      });
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    }
  };

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  return (
    <div>
      <h1 className="flex justify-center">My blog</h1>
      <Notification notification={notifications} />
      {user ? (
        <div>
          <div className="flex justify-center">
            connected user : {user.username}
            <button onClick={logOut}>log out</button>
          </div>
          <div className="md:flex md:justify-center">
            <Togglable buttonLabel="write blog" ref={blogFormRef}>
              <BlogForm
                className="md:flex md:flex-col px-12 w-1s00"
                setWriteVisible={setWriteVisible}
                user={user}
                notifications={notifications}
                setNotifications={setNotifications}
                createBlog={async (blogObject) => {
                  console.log(blogFormRef);
                  blogFormRef.current.toggleVisibility();
                  const returnedBlog = await blogService.create(blogObject);
                  setBlogs(blogs.concat(returnedBlog));
                  return returnedBlog;
                }}
              />
            </Togglable>
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
      <BlogList
        blogs={blogs}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
      />
    </div>
  );
};

export default App;
