"use client";

import { useState } from "react";
import { RegistrationRequest } from "../../lib/types";

export default function RegisterPage() {
  const [form, setForm] = useState<RegistrationRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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

    // Basic client-side checks to match @NotEmpty/@NotBlank/@Email/@Size(min=8)
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setMessage("First and last name are required.");
      setIsSuccess(false);
      return;
    }
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
      const response = await fetch(`${apiBaseUrl}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.status === 202 || response.ok) {
        setIsSuccess(true);
        setMessage(
          "Registration successful. Please check your email to verify your account."
        );
        setForm({ firstName: "", lastName: "", email: "", password: "" });
      } else {
        const data = await response.json().catch(() => null);
        setIsSuccess(false);
        setMessage(
          data?.message ||
            data?.error ||
            "Registration failed. Please try again."
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
        <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
        <p className="text-gray-400 mb-6">Register to access the platform.</p>

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
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 font-semibold">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
            />
          </div>
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
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters.</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
