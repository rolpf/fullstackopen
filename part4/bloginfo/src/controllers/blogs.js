import express from "express";
const blogsRouter = express.Router();
import Blog from "../models/blog.js";
import User from "../models/user.js";

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(body.userId);
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  const { likes } = request.body;

  Blog.findById(request.params.id).then((blog) => {
    if (!blog) {
      return response.status(404).end();
    }
    blog.likes = likes;

    return blog
      .save()
      .then((updatedBlog) => {
        response.json(updatedBlog);
      })
      .catch((error) => next(error));
  });
});

blogsRouter.delete("/:id", async (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

export default blogsRouter;
