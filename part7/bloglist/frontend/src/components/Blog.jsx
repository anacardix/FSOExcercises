import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { updateBlog, deleteBlog, addComment } from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { useLoginValue } from "../LoginContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

const Blog = () => {
  const { id } = useParams();

  const login = useLoginValue();
  const dispatchNotification = useNotificationDispatch();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs", id], updatedBlog);
      dispatchNotification({
        type: "SHOW",
        payload: {
          type: "success",
          message: `updated blog ${updatedBlog.title} by ${updatedBlog.author}`,
        },
      });
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

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => deleteBlog(blog),
    onSuccess: (data, variables) => {
      dispatchNotification({
        type: "SHOW",
        payload: {
          type: "success",
          message: `deleted blog ${variables.title} by ${variables.author}`,
        },
      });
      navigate("/");
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

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs", id], updatedBlog);
      dispatchNotification({
        type: "SHOW",
        payload: {
          type: "success",
          message: `added comment ${updatedBlog.comment} to blog`,
        },
      });
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

  const fetchBlogById = async (blogId) => {
    const response = await fetch(`/api/blogs/${blogId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const blog = useQuery({
    queryKey: ["blogs", id],
    queryFn: () => fetchBlogById(id),
    enabled: !!id,
  });

  if (blog.isLoading) {
    return <div>Loading blog data...</div>;
  }

  if (blog.isError || !blog) {
    return <div>Error loading blog or blog not found</div>;
  }

  const onHandleUpdate = async (blogObject) => {
    updateBlogMutation.mutate({
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    });
  };

  const onHandleDelete = async (blogObject) => {
    if (
      !window.confirm(
        `Delete blog ${blogObject.title} by ${blogObject.author}?`
      )
    )
      return;

    deleteBlogMutation.mutate(blogObject);
  };

  const onHandleAddComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    const blogId = blog.data.id;
    addCommentMutation.mutate({ blogId, comment });
  };

  return (
    <>
      <h3>{blog.data.title}</h3>
      <p>
        <a href={blog.data.url}>{blog.data.url}</a>
      </p>
      <span id="likes">{blog.data.likes} likes </span>
      <Button
        variant="success"
        id="like"
        onClick={() => onHandleUpdate(blog.data)}
      >
        like
      </Button>
      <p>added by {blog.data.user.name}</p>
      {blog.data.user.username === login.username && (
        <Button variant="danger" onClick={() => onHandleDelete(blog.data)}>
          remove
        </Button>
      )}
      <h4>comments</h4>
      <Form onSubmit={onHandleAddComment}>
        <Form.Group>
          <Form.Control className="mb-3" type="text" name="comment" />
          <Button variant="primary" type="submit">
            Add comment
          </Button>
        </Form.Group>
      </Form>
      <br />
      <ListGroup>
        {blog.data.comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Blog;
