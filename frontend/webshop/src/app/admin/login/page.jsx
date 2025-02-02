"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("adminCredentials", JSON.stringify({ username, password }));
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md border border-gray-200 text-center">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full py-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
