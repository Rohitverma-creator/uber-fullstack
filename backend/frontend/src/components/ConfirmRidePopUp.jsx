import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ConfirmRidePopUp(props) {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()
  const rideData = props.ride?.ride

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: rideData?._id || props.ride?._id, // must be valid MongoId
            otp: otp || "0000",
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false)
        props.setRidePopupPanel(false)
        navigate('/captain-riding', { state: { ride: props.ride } })
      }
    } catch (error) {
      console.error("Ride start failed:", error)
      alert("Ride could not be started")
    }
  }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false)
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://cdn.pixabay.com/photo/2024/04/20/13/28/ai-generated-8708564_1280.png"
            alt="user"
          />
          <h2 className="text-lg font-medium capitalize">
            {rideData?.user?.fullname?.firstname}{" "}
            {rideData?.user?.fullname?.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      {/* Ride Details */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup Point</h3>
              <p className="text-sm -mt-1 text-gray-600">{rideData?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Drop Location</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {rideData?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* OTP Input */}
        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              maxLength="4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP "
              className="w-full border px-3 py-3 rounded-lg text-center text-lg outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
