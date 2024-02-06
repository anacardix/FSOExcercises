import { getAllUsers } from "../services/users";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const Users = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (usersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const users = usersQuery.data;

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
