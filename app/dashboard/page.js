'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedUser = localStorage.getItem("userName");
    if (!loggedUser) {
      router.push("/login");
    } else {
      setUser(loggedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user}!</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
