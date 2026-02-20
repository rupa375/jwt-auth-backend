import React, { useContext, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { serverUrl } = useContext(dataContext);
  const navigate = useNavigate(); // ✅ Added

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post(
        serverUrl + "/api/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login Success:", data);

      // ✅ Redirect after login (example: dashboard)
      navigate("/dashboard");

      // Clear fields
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient-to-b from-teal-900 to-green-900 p-8 rounded-lg w-96 shadow-lg">

        <h2 className="text-white text-center text-xl font-semibold mb-4">
          Login
        </h2>

        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z" />
            </svg>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded bg-gray-200 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded bg-gray-200 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md transition duration-200"
          >
            Login
          </button>

        </form>

        {/* ✅ Navigate instead of Link */}
        <p className="text-center text-gray-300 mt-4">
          Create new account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
