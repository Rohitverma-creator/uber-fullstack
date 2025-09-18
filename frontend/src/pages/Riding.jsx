import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });

    return () => {
      socket.off("ride-ended");
    };
  }, [socket, navigate, ride, captain]);

  // Prefer captain from context, fallback to ride.captain
  const activeCaptain = captain || ride?.captain;

  return (
    <div className="h-screen">
      {/* Home button */}
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      {/* Map / LiveTracking placeholder */}
      <div className="h-1/2">
        {/* Yahan LiveTracking component ya map aa sakta hai */}
      </div>

      {/* Ride & Captain Details */}
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          {/* Vehicle image fixed */}
          <img
            className="h-12 rounded-md"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="vehicle"
          />
          <div className="text-right">
            {activeCaptain ? (
              <>
                <h2 className="text-lg font-medium capitalize">
                  {activeCaptain?.fullname?.firstname}{" "}
                  {activeCaptain?.fullname?.lastname}
                </h2>
                <h4 className="text-xl font-semibold -mt-1 -mb-1">
                  {activeCaptain?.vehicle?.plate}
                </h4>
                <p className="text-sm text-gray-600">
                  {activeCaptain?.vehicle?.vehicleType} -{" "}
                  {activeCaptain?.vehicle?.color}
                </p>
              </>
            ) : (
              <h2 className="text-lg font-medium text-red-500">
                Loading Captain...
              </h2>
            )}
          </div>
        </div>

        {/* Ride Fare & Destination */}
        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Drop Location</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment button */}
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment(onlyCash)
        </button>
      </div>
    </div>
  );
};

export default Riding;
