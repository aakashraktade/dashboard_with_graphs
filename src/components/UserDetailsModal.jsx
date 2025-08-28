import React from "react";

function UserDetailsModal({ user: currentUser, onClose }) {
  if (!currentUser) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "18px",
          borderRadius: "6px",
          minWidth: 280,
        }}
      >
        <h2>User Info</h2>
        {currentUser.avatar && (
          <img
            src={currentUser.avatar}
            alt="avatar"
            width={90}
            style={{ margin: "10px 0", borderRadius: "50%" }}
          />
        )}

        <p>
          <b>Name:</b> {currentUser.name}
        </p>
        <p>
          <b>Email:</b> {currentUser.email}
        </p>
        <p>
          <b>Created:</b> {new Date(currentUser.createdAt).toLocaleString()}
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: 15,
            padding: "7px 14px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default UserDetailsModal;
