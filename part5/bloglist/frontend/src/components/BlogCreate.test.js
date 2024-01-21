import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogCreate from "./BlogCreate";

let mockCreateBlog;
let container;

beforeEach(() => {
  mockCreateBlog = jest.fn();

  container = render(<BlogCreate handleCreate={mockCreateBlog} />).container;
});

test("blog creation", async () => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };

  const user = userEvent.setup();

  const title = screen.getByPlaceholderText("title");
  await user.type(title, blog.title);

  const author = screen.getByPlaceholderText("author");
  await user.type(author, blog.author);

  const url = screen.getByPlaceholderText("url");
  await user.type(url, blog.url);

  const create = screen.getByText("create");
  await user.click(create);

  expect(mockCreateBlog.mock.calls).toHaveLength(1);
  expect(mockCreateBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(mockCreateBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(mockCreateBlog.mock.calls[0][0].url).toBe(blog.url);
});
