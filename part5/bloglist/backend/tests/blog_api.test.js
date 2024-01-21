const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("GET", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const blogs = await api.get("/api/blogs");

    expect(blogs.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const blogs = await api.get("/api/blogs");

    const titles = blogs.body.map((r) => r.title);
    expect(titles).toContain("React patterns");
  });
});

describe("POST", () => {
  let tokenizedUser;

  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    await User.deleteMany({});

    const adminUser = {
      username: "admin",
      password: "admin",
      name: "admin",
    };

    await api.post("/api/users").send(adminUser).expect(201);

    tokenizedUser = await api.post("/api/login").send(adminUser).expect(200);
  });

  test("id to be defined", async () => {
    const firstBlog = helper.initialBlogs[0];

    const blog = await api.get(`/api/blogs/${firstBlog._id}`);
    expect(blog.body.id).toBeDefined();
  });

  test("blogs correctly added", async () => {
    const newBlog = {
      title: "React pattern",
      author: "Michael Chan",
      url: "http://blog.cleancoder.com",
      likes: 8,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${tokenizedUser.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const title = blogsAtEnd.map((blog) => blog.title);
    expect(title).toContain("React pattern");
  });

  test("blog with no likes, expected 0", async () => {
    const newBlog = {
      title: "Jest is better",
      author: "Michael Chan",
      url: "http://blog.cleancoder.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${tokenizedUser.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const title = blogsAtEnd.map((blog) => blog.title);
    expect(title).toContain("Jest is better");

    const likes = blogsAtEnd.find(
      (blog) => blog.title == "Jest is better"
    ).likes;
    expect(likes).toBe(0);
  });

  test("blog with no title, expected no insert", async () => {
    const newBlog = {
      author: "Michael Chan",
      url: "http://blog.cleancoder.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${tokenizedUser.body.token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const title = blogsAtEnd.map((blog) => blog.title);
    expect(title).not.toContain("");
  });
});

describe("DEL/PUT", () => {
  let tokenizedUser;
  let createdBlog;

  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);

    await User.deleteMany({});

    const adminUser = {
      username: "admin",
      password: "admin",
      name: "admin",
    };

    await api.post("/api/users").send(adminUser).expect(201);

    tokenizedUser = await api.post("/api/login").send(adminUser).expect(200);

    const newBlog = {
      title: "React pattern",
      author: "Michael Chan",
      url: "http://blog.cleancoder.com",
      likes: 8,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${tokenizedUser.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    createdBlog = response.body;
  });

  test("blog deletion", async () => {
    await api
      .delete(`/api/blogs/${createdBlog.id}`)
      .set("Authorization", `Bearer ${tokenizedUser.body.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const title = blogsAtEnd.map((blog) => blog.title);
    expect(title).not.toContain(createdBlog.title);
  });

  test("blog update", async () => {
    createdBlog.likes = createdBlog.likes + 1;

    await api
      .put(`/api/blogs/${createdBlog.id}`)
      .set("Authorization", `Bearer ${tokenizedUser.body.token}`)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const title = blogsAtEnd.map((blog) => blog.title);
    expect(title).toContain(createdBlog.title);
  });
})

afterAll(async () => {
  await mongoose.connection.close();
});
