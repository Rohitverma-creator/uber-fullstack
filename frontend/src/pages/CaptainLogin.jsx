import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captain = { email, password }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-5 sm:p-7 h-screen flex flex-col justify-between max-w-md mx-auto">
      <div>
        <img
          className="w-16 sm:w-20 mb-3 mx-auto sm:mx-0"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Driver"
        />

        <form onSubmit={submitHandler} className="w-full">
          <h3 className="text-base sm:text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 sm:mb-7 rounded-lg px-3 sm:px-4 py-2 border w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-base sm:text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 sm:mb-7 rounded-lg px-3 sm:px-4 py-2 border w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
            type="password"
            placeholder="password"
          />

          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-3 sm:px-4 py-2 w-full text-base sm:text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm sm:text-base">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-4 sm:mb-5 rounded-lg px-3 sm:px-4 py-2 w-full text-base sm:text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin
