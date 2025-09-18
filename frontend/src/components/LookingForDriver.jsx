import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => props.setLookingForDriverPanel(false)}
        className="p-3 text-center position-absolute top-0 w-full"
      >
        <i className=" text-2xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl mb-5 font-semibold">Looking for a driver...</h3>
      <div className="flex justify-between items-center flex-col gap-2 mt-5">
        <img
          className="w-35 drop-shadow-[0_0_15px_#facc15]"
          src="https://img.freepik.com/premium-vector/friends-drive-ride-car-together-driver-looking-road-holds-steering-wheel-passenger-navigates-by-digital-map-search-route-smartphone-people-inside-automobile-flat-vector-illustration_633472-2844.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Searching driver"
        />
        <div className="w-full">
          <div className="flex items-center gap-5 p-3  border-b-2">
            <i className=" text-lg  ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  border-b-2">
            <i className=" text-lg  ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3  ">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                   ₹{props.fare?.fares?.[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
