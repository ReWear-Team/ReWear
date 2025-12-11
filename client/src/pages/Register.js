import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("https://rewear-z7yj.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created successfully!");
      navigate("/login");
    } else {
      alert(data.msg || "Registration failed");
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-gray-50 flex justify-center px-4">
      <div className="bg-white w-full max-w-lg p-10 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Create Account ✨
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Join Re-Wear community
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#d46b4a] outline-none"
          />

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
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#d46b4a] font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
