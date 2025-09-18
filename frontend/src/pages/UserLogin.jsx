import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Uber Logo at Top */}
      <div className="p-4 sm:p-6">
        <img
          className="w-16 sm:w-20 md:w-24"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
      </div>

      {/* Form Centered */}
      <div className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            What's your email
          </h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-5 text-sm sm:text-base"
          />

          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
            Enter Password
          </h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-5 text-sm sm:text-base"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-black text-white py-2 sm:py-3 rounded-lg w-full hover:bg-gray-900 transition duration-300 text-sm sm:text-base"
          >
            Login
          </button>

          {/* New Account Link */}
          <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
            New here?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Create New Account
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-5 sm:my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 sm:px-3 text-gray-500 text-xs sm:text-sm">
              OR
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Captain Button */}
          <Link
            to="/captain-login"
            className="flex items-center justify-center bg-[#1046b1] text-white py-2 sm:py-3 rounded-lg w-full hover:bg-blue-900 transition duration-300 text-sm sm:text-base"
          >
            Sign in as Captain
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
