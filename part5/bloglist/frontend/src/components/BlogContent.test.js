import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogContent from "./BlogContent";

let mockUpdateBlog;
let container;

beforeEach(() => {
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      name: null,
    },
  };

  const user = {
    name: null,
  };

  mockUpdateBlog = jest.fn();
  const mockRemoveBlog = jest.fn();

  container = render(
    <BlogContent
      blog={blog}
      updateBlog={mockUpdateBlog}
      removeBlog={mockRemoveBlog}
      user={user}
    />
  ).container;
});

test("renders only shown content", () => {
  const blogInfo = container.querySelector(".blogInfo");
  expect(blogInfo).not.toHaveStyle("display: none");

  const blogDetails = container.querySelector(".blogDetails");
  expect(blogDetails).toHaveStyle("display: none");
});

test("renders hidden content on click", async () => {
  const user = userEvent.setup();
  const view = screen.getByText("view");
  await user.click(view);

  const blogDetails = container.querySelector(".blogDetails");
  expect(blogDetails).not.toHaveStyle("display: none");
});

test("like button clicked twice", async () => {
  const user = userEvent.setup();

  const view = screen.getByText("view");
  await user.click(view);

  const like = screen.getByText("like");
  await user.click(like);
  await user.click(like);

  expect(mockUpdateBlog.mock.calls).toHaveLength(2);
});
