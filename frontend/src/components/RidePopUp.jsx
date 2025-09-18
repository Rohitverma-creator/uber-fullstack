import React from "react";

const RidePopUp = (props) => {
  // yaha se correct ride object nikalo
  const rideData = props.ride?.ride;
  const pickupCoordinates = props.ride?.pickupCoordinates;
  const destinationCoordinates = props.ride?.destinationCoordinates;

  return (
    <div className="relative p-4">
      {/* Close button */}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => props.setRidePopupPanel(false)}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mt-3 mb-5">New Ride Available!</h3>

      {/* Ride Info */}
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="User"
          />
          <div>
            <h2 className="text-lg font-medium capitalize">
              {rideData?.user?.fullname?.firstname}{" "}
              {rideData?.user?.fullname?.lastname}
            </h2>
           
          </div>
        </div>
        <h5 className="text-lg font-semibold">~2.2 KM</h5>
      </div>

      {/* Pickup, Destination, Fare */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          {/* Pickup */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {rideData?.pickup} 
              
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {rideData?.destination} 
                
              </p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">₹{rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 w-full flex flex-col gap-2">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className="bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={() => 
            props.setRidePopupPanel(false)
         
            }
            className="bg-gray-300 w-full text-gray-700 font-semibold p-2 px-10 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
