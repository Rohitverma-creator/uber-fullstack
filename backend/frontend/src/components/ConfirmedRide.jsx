import React from "react";

const ConfirmedRide = (props) => {
  const data={
    car:"https://cdn.dribbble.com/userupload/23332133/file/original-d09b32fe42669b5214a29b3227db214a.gif",
    moto:"https://blog.uber-cdn.com/cdn-cgi/image/width=1200,quality=80,onerror=redirect,format=auto/wp-content/uploads/2017/11/uberMOTO_India-Amber_Facebook_1200x600-1024x512.png",
    auto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIzJ6XMaUXqzuH_hHRH7Zs5oU0QOUi_D6dKQ&s"
  }
  return (
    <div className="h-full flex flex-col">
      {/* Back Arrow */}
      <h5
        onClick={() => props.setConfirmedRidePanel(false)}
        className="p-3 text-center absolute top-0 w-full cursor-pointer"
      >
        <i className="text-2xl ri-arrow-down-wide-fill"></i>
      </h5>

      {/* Content (fixed height panel me fit kar diya) */}
      <div className="mt-10 flex flex-col justify-between h-full px-2">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-center">
          Confirm your ride
        </h3>

        {/* Vehicle Image */}
        <img
          className="w-full max-h-20 rounded-full object-contain mt-2 drop-shadow-[0_0_15px_#facc15]"
          src={data[props.vehicleType]}
          alt={props.vehicleType}
        />

        {/* Ride Info */}
        <div className="w-full mt-2">
          {/* Pickup */}
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-5 p-2 border-b-2">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-5 p-2">
            <i className="ri-money-rupee-circle-line"></i>
            <div>
              <h3 className="text-lg font-medium">
               ₹{props.fare?.fares?.[props.vehicleType]}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => {
            props.setVehicleFound(true); // LookingForDriver open
            props.setConfirmedRidePanel(false); // ConfirmedRide close
            props.createRide()
          }}
          className="w-full mt-2 bg-green-600 text-white font-semibold px-2 py-3 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
