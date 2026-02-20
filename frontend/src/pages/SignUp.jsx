import React, { useContext, useRef, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { serverUrl } = useContext(dataContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Profile Image State
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const file = useRef(null);

  const handleSignUP = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !userName || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await axios.post(
        serverUrl + "/api/signup",
        formData,
        { withCredentials: true }
      );

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed ❌");
    }
  };

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfileImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gradient-to-b from-teal-900 to-green-900 p-8 rounded-lg w-96 shadow-lg">

        <h2 className="text-white text-center text-xl font-semibold mb-4">
          Sign Up
        </h2>

        {/* Profile Circle */}
        <div
          className="flex justify-center mb-4"
          onClick={() => file.current.click()}
        >
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-10 h-10 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0H3z" />
              </svg>
            )}
          </div>
        </div>

        <form onSubmit={handleSignUP} className="space-y-4">

          {/* Hidden File Input */}
          <input
            type="file"
            hidden
            ref={file}
            accept="image/*"
            onChange={handleImage}
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 px-3 py-2 rounded bg-gray-200"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-1/2 px-3 py-2 rounded bg-gray-200"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 rounded bg-gray-200"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded bg-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded bg-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
