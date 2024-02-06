import { useState } from "react";
import { createBlog } from "../services/blogs";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();

  const dispatchNotification = useNotificationDispatch();

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const previousBlogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], previousBlogs.concat(newBlog));
      dispatchNotification({
        type: "SHOW",
        payload: {
          type: "success",
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        },
      });
      setTitle("");
      setAuthor("");
      setUrl("");
    },
    onError: (error) => {
      dispatchNotification({
        type: "SHOW",
        payload: {
          type: "danger",
          message: error.message,
        },
      });
    },
  });

  const onSubmitCreate = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    createBlogMutation.mutate(newBlog);
  };

  return (
    <>
      <h4>Create new</h4>
      <Form onSubmit={onSubmitCreate}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="URL"
          />
        </Form.Group>

        <Button variant="success" id="create" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
};

export default BlogCreate;
