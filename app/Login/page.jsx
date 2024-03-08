// pages/Login.js

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await signIn("credentials", {
        email,
        company,
        password,
        redirect: false,
      });

      console.log(response);

      if (response?.error) {
        setError("Invalid credentials");
        console.log(error);
        return;
      }

      router.push("/Home");
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            id="company"
            placeholder="Enter your company name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          {error && <div className="text-red-500">{error}</div>}
          <p className="text-center">
            Don't have an account?{" "}
            <Link href="/Register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
