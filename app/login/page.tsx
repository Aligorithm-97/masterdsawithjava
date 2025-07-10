"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - you can replace this with your own logic
    if (username === "admin" && password === "admin123") {
      // Set authentication in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("adminUser", username);
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-[#23272f] p-8 rounded-xl shadow-lg border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter your credentials to access the admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Demo credentials: admin / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 