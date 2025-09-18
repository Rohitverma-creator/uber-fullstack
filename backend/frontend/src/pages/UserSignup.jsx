import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: { firstname, lastname },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-7">
      {/* Logo */}
      <div>
        <img
          className="w-16 mb-8 sm:mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="logo"
        />

        <form onSubmit={submitHandler} className="w-full max-w-lg">
          <h3 className="text-base sm:text-lg font-medium mb-2">
            What's your name
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-7">
            <input
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
            <input
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>

          <h3 className="text-base sm:text-lg font-medium mb-2">
            What's your email
          </h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-base sm:text-lg font-medium mb-2">
            Enter Password
          </h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-base sm:text-lg">
            Create account
          </button>
        </form>

        <p className="text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      {/* Footer text */}
      <div>
        <p className="text-[9px] sm:text-[10px] leading-tight text-center sm:text-left">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
