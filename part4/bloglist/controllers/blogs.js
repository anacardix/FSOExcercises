const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require('../utils/middleware');

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  const user = await User.findById(request.user.id);

  blog.likes = blog.likes ? blog.likes : 0;

  blog.user = user.id;

  const result = await blog.save();

  user.blogs = user.blogs.concat(result.id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    runValidators: true,
  });
  response.status(201).json(result);
});

blogRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (request.user.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: "unauthorized" });
  }

  const result = await Blog.findByIdAndDelete(request.params.id);
  response.status(204).json(result);
});

module.exports = blogRouter;
