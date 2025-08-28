import React, { useState, useEffect } from "react";

function UserFormModal({ user, onClose, onSave }) {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [avatar, setAvatar] = useState(user ? user.avatar : "");
  const [preview, setPreview] = useState(user ? user.avatar : "");

  useEffect(() => {
    if (avatar && avatar.startsWith("http")) {
      setPreview(avatar);
    }
  }, [avatar]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = {
      id: user?.id,
      name,
      email,
      avatar: preview,
      createdAt: user?.createdAt || new Date().toISOString(),
    };
    onSave(savedUser);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>{user ? "Edit User" : "Create User"}</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label>Name:</label>
            <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "6px", marginTop: "4px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Avatar:</label>
            <br />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>

          {preview && (
            <div style={{ marginTop: "10px" }}>
              <p>Avatar Preview:</p>
              <img
                src={preview}
                alt="avatar preview"
                width="90"
                style={{ borderRadius: "50%" }}
              />
            </div>
          )}

          <div style={{ marginTop: "16px" }}>
            <button
              type="submit"
              style={{
                padding: "8px 14px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                marginLeft: "10px",
                padding: "8px 14px",
                background: "lightgray",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal;
