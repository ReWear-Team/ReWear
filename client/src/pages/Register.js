import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(data.msg || "Registration failed");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
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
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#d46b4a] outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-lg font-semibold transition shadow-md
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#d46b4a] hover:bg-[#bf5839] text-white"
              }`}
          >
            {loading ? "Creating account..." : "Register"}
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
