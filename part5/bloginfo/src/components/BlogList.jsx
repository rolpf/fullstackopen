import Blog from "./Blog";

const BlogList = ({ blogs, updateLikes, deleteBlog, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default BlogList;
