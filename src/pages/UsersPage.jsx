import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../services/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching users");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setFormData({ username: user.username, email: user.email });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUser(editingUser, formData);
      setUsers(users.map((u) => (u.id === editingUser ? updated : u)));
      setEditingUser(null);
      setFormData({ username: "", email: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editingUser === user.id ? (
              <form onSubmit={handleUpdate}>
                <input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Username"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  required
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {user.username} ({user.email}){" "}
                <button onClick={() => handleEditClick(user)}>Edit</button>{" "}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
