// // src/pages/UsersPage.jsx
// import { useEffect, useState } from "react";
// import { getUsers, deleteUser, updateUser } from "../services/api";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch users on mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await getUsers();
//         setUsers(data);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         alert("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Delete a user
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await deleteUser(id);
//       setUsers(users.filter((u) => u.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete user");
//     }
//   };

//   // Update user example (toggle isAdmin)
//   const handleToggleAdmin = async (user) => {
//     try {
//       const updated = await updateUser(user.id, { isAdmin: !user.isAdmin });
//       setUsers(users.map((u) => (u.id === user.id ? updated : u)));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update user");
//     }
//   };

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1 style={{ marginBottom: "1rem" }}>Users</h1>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               padding: "0.5rem 1rem",
//               marginBottom: "0.5rem",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               backgroundColor: "#f9f9f9",
//             }}
//           >
//             <span>
//               {user.username} ({user.email}) {user.isAdmin ? "[Admin]" : ""}
//             </span>
//             <div>
//               <button
//                 onClick={() => handleToggleAdmin(user)}
//                 style={{
//                   marginRight: "8px",
//                   padding: "6px 10px",
//                   borderRadius: "4px",
//                   border: "none",
//                   backgroundColor: "#28a745",
//                   color: "#fff",
//                   cursor: "pointer",
//                 }}
//               >
//                 Toggle Admin
//               </button>
//               <button
//                 onClick={() => handleDelete(user.id)}
//                 style={{
//                   padding: "6px 10px",
//                   borderRadius: "4px",
//                   border: "none",
//                   backgroundColor: "#dc3545",
//                   color: "#fff",
//                   cursor: "pointer",
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
