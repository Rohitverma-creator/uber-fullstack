import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FinishRide(props) {
  const navigate = useNavigate();
  const rideData = props.ride?.ride;

  async function endRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: rideData?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(
        "Finish ride failed:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div>
      <div>
        <h5
          onClick={() => props.setFinishedRidePanel(false)}
          className="p-1 text-center w-[93%] absolute top-0"
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>

        <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>

        <div className="flex items-center justify-between p-4 bg-yellow-300 rounded-lg mt-4">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://cdn.pixabay.com/photo/2024/04/20/13/28/ai-generated-8708564_1280.png"
              alt="user"
            />
            <h2 className="text-lg font-medium">
              {rideData?.user?.fullname?.firstname}{" "}
              {rideData?.user?.fullname?.lastname}
            </h2>
          </div>
          <h5 className="text-lg font-semibold">2.2 KM</h5>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Pickup</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {rideData?.pickup}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Destination</h3>
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

          <div className="mt-10 w-full">
            <button
              onClick={endRide}
              className="w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
              Finish Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;
