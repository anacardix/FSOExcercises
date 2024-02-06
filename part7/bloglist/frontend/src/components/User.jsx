import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ListGroup from "react-bootstrap/ListGroup";

const User = () => {
  const { id } = useParams();

  const fetchUserById = async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const user = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

  if (user.isLoading) {
    return <div>Loading user data...</div>;
  }

  if (user.isError || !user) {
    return <div>Error loading user or user not found</div>;
  }

  return (
    <div>
      <h2>{user.data.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.data.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
