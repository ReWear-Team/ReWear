import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://rewear-z7yj.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } else {
      alert(data.msg || "Login failed");
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-gray-50 flex justify-center px-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#d46b4a] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#d46b4a] outline-none"
          />

          <button
            type="submit"
            className="w-full bg-[#d46b4a] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#bf5839] transition shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#d46b4a] font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
