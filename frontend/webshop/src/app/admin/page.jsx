"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

const AdminIndex = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedCredentials = JSON.parse(localStorage.getItem("adminCredentials"));
    if (storedCredentials && storedCredentials.username === "admin" && storedCredentials.password === "admin") {
      setIsAuthenticated(true);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  );
};

export default AdminIndex;
