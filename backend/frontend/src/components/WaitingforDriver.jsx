import React from "react";

const WaitingForDriver = (props) => {
  const { ride, setWaitingForDriver, rideAssigned } = props;

  if (!rideAssigned || !ride) return null;

  // Prefer confirmed captain, fallback to first captain in radius
  const captain = ride?.captain || ride?.captainInRadius?.[0];

  return (
    <div>
      {/* Close Button */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => setWaitingForDriver(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Captain Info */}
      <div className="flex items-center justify-between mt-10">
        <img
          className="h-12 rounded-md"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Driver"
        />
        <div className="text-right">
          {captain ? (
            <>
              <h2 className="text-lg font-medium capitalize">
                {captain?.fullname?.firstname} {captain?.fullname?.lastname}
              </h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">
                {captain?.vehicle?.plate}
              </h4>
              <p className="text-sm text-gray-600">
                {captain?.vehicle?.vehicleType} - {captain?.vehicle?.color}
              </p>
              {/* OTP bhi show kar dena */}
              <h1 className="text-lg font-semibold">{ride?.otp}</h1>
            </>
          ) : (
            <h2 className="text-lg font-medium text-red-500">
              Waiting for captain...
            </h2>
          )}
        </div>
      </div>

      {/* Pickup, Destination, Fare */}
      <div className="flex gap-2 justify-between flex-col items-center mt-5">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
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
    </div>
  );
};

export default WaitingForDriver;
