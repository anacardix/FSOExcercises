const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.user.id);
  body.likes = body.likes ? body.likes : 0;
  body.user = user.id;

  const blog = new Blog(body);
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  const result = await Blog.findById(savedBlog.id).populate(
    "user",
    "username name"
  );

  response.status(201).json(result);
});

blogRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    runValidators: true,
    new: true,
  }).populate("user", "username name");

  response.status(201).json(result);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (request.user.id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: "unauthorized" });
    }

    const result = await Blog.findByIdAndDelete(request.params.id);
    response.status(204).json(result);
  }
);

blogRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  
  const body = request.body;
  blog.comments = blog.comments.concat(body.comment);
  
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogRouter;
