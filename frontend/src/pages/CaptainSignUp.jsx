import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    )

    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    // Reset form
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className="py-5 px-4 sm:px-6 h-screen flex flex-col justify-between max-w-2xl mx-auto">
      <div>
        <img
          className="w-16 sm:w-20 mb-3 mx-auto sm:mx-0"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Driver"
        />

        <form onSubmit={submitHandler}>
          {/* Name */}
          <h3 className="text-base sm:text-lg font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-7">
            <input
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-3 sm:px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-3 sm:px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <h3 className="text-base sm:text-lg font-medium mb-2">
            What's our Captain's email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 sm:mb-7 rounded-lg px-3 sm:px-4 py-2 border w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          {/* Password */}
          <h3 className="text-base sm:text-lg font-medium mb-2">
            Enter Password
          </h3>
          <input
            required
            className="bg-[#eeeeee] mb-6 sm:mb-7 rounded-lg px-3 sm:px-4 py-2 border w-full text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Vehicle Info */}
          <h3 className="text-base sm:text-lg font-medium mb-2">
            Vehicle Information
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-7">
            <input
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-3 sm:px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-3 sm:px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-7">
            <input
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-3 sm:px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] flex-1 rounded-lg px-3 sm:px-4 py-2 border text-base sm:text-lg placeholder:text-sm sm:placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          {/* Submit */}
          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-3 sm:px-4 py-2 w-full text-base sm:text-lg">
            Create Captain Account
          </button>
        </form>

        <p className="text-center text-sm sm:text-base">
          Already have an account?{' '}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div>
        <p className="text-[10px] sm:text-xs mt-6 leading-tight text-center sm:text-left">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
