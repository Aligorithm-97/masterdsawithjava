"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginRequest {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(null);

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage("Valid email is required.");
      setIsSuccess(false);
      return;
    }
    if (!form.password || form.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiBaseUrl}auth/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Login successful. Redirecting...");
        router.replace("/admin");
      } else {
        const data = await response.json().catch(() => null);
        setIsSuccess(false);
        setMessage(
          data?.message || data?.error || "Invalid email or password.",
        );
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#18181b] pt-24 px-4">
      <div className="max-w-md mx-auto bg-[#23272f] border border-gray-700 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-1">Login</h1>
        <p className="text-gray-400 mb-6">
          Enter your credentials to continue.
        </p>

        {message && (
          <div
            className={`mb-4 text-sm font-medium ${
              isSuccess ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-sm text-gray-400 mt-4">
          Don\'t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
