import { useState } from "react";

const BlogForm = ({
  user,
  notifications,
  setNotifications,
  createBlog,
  showWhenVisible,
  setWriteVisible,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const returnedBlog = await createBlog(blogObject);
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotifications({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        kind: "newBlog",
      });
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setNotifications({
        message: "invalid blog post",
        kind: "error",
      });
      setTimeout(() => {
        setNotifications(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h3>Write a new blog</h3>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button
            className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            id="create-button"
            type="submit"
            onClick={() => setWriteVisible(false)}
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
