import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import UserDetailsModal from "../components/UserDetailsModal";
import UserFormModal from "../components/UserFormModal";

const API_URL = "https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("nameAsc");
  const [selected, setSelected] = useState(null);
  const [editingUser, setEditingUser] = useState(undefined);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => setUsers(data || []))
      .finally(() => setLoading(false));
  }, []);

  const saveUser = async (user) => {
    if (user.id) {
      await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      user = await res.json();
    }
    const updated = await fetchUsers();
    setUsers(updated);
    setEditingUser(undefined);
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if ((page - 1) * perPage >= filtered.length && page > 1) {
      setPage(1);
    }
  }, [filtered, page]);

  const sortedUsers = [...filtered].sort((a, b) => {
    if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
    if (sortBy === "nameDesc") return b.name.localeCompare(a.name);
    if (sortBy === "newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest")
      return new Date(a.createdAt) - new Date(b.createdAt);
    return 0;
  });

  const pageUsers = sortedUsers.slice((page - 1) * perPage, page * perPage);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div
          style={{
            border: "6px solid rgba(0,0,0,0.2)",
            borderTop: "6px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            margin: "auto",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      <h1>Users List</h1>

      <div style={{ marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{ marginRight: "8px", padding: "6px" }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginRight: "8px", padding: "6px" }}
        >
          <option value="nameAsc">Name (A–Z)</option>
          <option value="nameDesc">Name (Z–A)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <button
          style={{
            padding: "6px 12px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={() => setEditingUser(null)}
        >
          ➕ Add User
        </button>
      </div>

      <table
        border="1"
        width="100%"
        style={{
          borderCollapse: "collapse",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(240,240,240,0.3))",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "rgba(200,200,200,0.5)" }}>
          <tr>
            <th style={{ padding: "10px", color: "black" }}>Name</th>
            <th style={{ padding: "10px", color: "black" }}>Email</th>
            <th style={{ padding: "10px", color: "black" }}>Created At</th>
            <th style={{ padding: "10px", color: "black" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageUsers.length > 0 ? (
            pageUsers.map((u) => (
              <tr key={u.id}>
                <td
                  onClick={() => setSelected(u)}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    padding: "8px",
                    fontWeight: "500",
                  }}
                >
                  {u.name}
                </td>
                <td style={{ padding: "8px", color: "black" }}>{u.email}</td>
                <td style={{ padding: "8px", color: "black" }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "8px" }}>
                  <button
                    style={{
                      background: "orange",
                      color: "black",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => setEditingUser(u)}
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        {Array.from({ length: Math.ceil(sortedUsers.length / perPage) }).map(
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                margin: "2px",
                padding: "6px 10px",
                background: page === i + 1 ? "blue" : "lightgray",
                color: page === i + 1 ? "white" : "black",
                border: "1px solid gray",
                borderRadius: "4px",
              }}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {selected && (
        <UserDetailsModal user={selected} onClose={() => setSelected(null)} />
      )}
      {editingUser !== undefined && (
        <UserFormModal
          user={editingUser}
          onClose={() => setEditingUser(undefined)}
          onSave={saveUser}
        />
      )}
    </div>
  );
}

export default UsersPage;
