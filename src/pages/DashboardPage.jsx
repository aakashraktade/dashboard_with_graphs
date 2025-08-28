import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
        <div
          style={{
            border: "6px solid rgba(255,255,255,0.3)",
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

  const totalUsers = users.length;

  const usersPerDay = (() => {
    const last30 = Array.from({ length: 30 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return { date: date.toLocaleDateString("en-GB"), count: 0 };
    });
    users.forEach((u) => {
      const d = new Date(u.createdAt).toLocaleDateString("en-GB");
      const found = last30.find((x) => x.date === d);
      if (found) found.count++;
    });
    return last30;
  })();

  const avatarDist = [
    { name: "With Avatar", value: users.filter((u) => u.avatar).length },
    { name: "Without Avatar", value: users.filter((u) => !u.avatar).length }
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const signupTimeDist = (() => {
    let counts = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };
    users.forEach((u) => {
      const hour = new Date(u.createdAt).getHours();
      if (hour >= 6 && hour < 12) counts.Morning++;
      else if (hour >= 12 && hour < 18) counts.Afternoon++;
      else if (hour >= 18 && hour < 24) counts.Evening++;
      else counts.Night++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  })();

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div
      style={{
        color: "white",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      <h1>📊 Dashboard</h1>

      <div style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        background: "rgba(100,100,100,0.5)",
        padding: "12px",
        borderRadius: "10px",
        textAlign: "center"
      }}>
        Total Users: {totalUsers}
      </div>

      <h3>Users Created Per Day (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={usersPerDay}>
          <CartesianGrid stroke="rgba(255,255,255,0.3)" />
          <XAxis dataKey="date" stroke="white" tick={{ fill: "white", fontSize: 10 }} />
          <YAxis stroke="white" tick={{ fill: "white", fontSize: 10 }} />
          <Tooltip contentStyle={{ backgroundColor: "#1a2a4a", color: "white" }} itemStyle={{ color: "white" }} />
          <Bar dataKey="count" fill="#FF5C5C" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Avatar Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={avatarDist}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={{ fill: "white", fontSize: 12 }}
          >
            {avatarDist.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend wrapperStyle={{ color: "white", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>

      <h3>Signup Time of Day Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={signupTimeDist}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={{ fill: "white", fontSize: 12 }}
          >
            {signupTimeDist.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend wrapperStyle={{ color: "white", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>

      <h3>Recently Joined Users</h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {recentUsers.map((u) => (
          <div
            key={u.id}
            style={{
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "rgba(100,100,100,0.4)",
              minWidth: "120px",
              textAlign: "center"
            }}
          >
            {u.avatar && <img src={u.avatar} alt="avatar" width="50" style={{ borderRadius: "50%" }} />}
            <p>{u.name}</p>
            <small>{new Date(u.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
