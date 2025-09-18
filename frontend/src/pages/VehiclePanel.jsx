import React from "react";

const VehiclePanel = (props) => {
  const fares = props.fare?.fares || {}; 

  return (
    <div>
      <h5
        onClick={() => props.setVehiclePanel(false)}
        className="p-3 text-center position-absolute top-0 w-full"
      >
        <i className=" text-2xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl mb-5 font-semibold">Choose a vehicle</h3>

      {/* Uber Go */}
      <div
        onClick={() => {
          props.setVehicleType("car");          
          props.setConfirmedRidePanel(true);
          props.createRide("car");           
        }}
        className="border mb-2 border-black rounded-xl flex items-center w-full justify-between p-3"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png"
          alt="uber-go"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">
            Uber Go <span><i className="ri-user-line"></i></span>4
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-medium font-semibold">₹ {fares.car}</h2>
      </div>

      {/* Moto */}
      <div
        onClick={() => {
          props.setVehicleType("moto");         
          props.setConfirmedRidePanel(true);
          props.createRide("moto");             // ✅ direct pass
        }}
        className="border mb-2 border-black rounded-xl flex items-center w-full justify-between p-3"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_956,w_638/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="moto"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">
            Moto <span><i className="ri-user-line"></i></span>1
          </h4>
          <h5 className="font-medium text-sm">3 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motor rides
          </p>
        </div>
        <h2 className="text-medium font-semibold">₹ {fares.moto}</h2>
      </div>

      {/* Uber Auto */}
      <div
        onClick={() => {
          props.setVehicleType("auto");         
          props.setConfirmedRidePanel(true);
          props.createRide("auto");             // ✅ direct pass
        }}
        className="border mb-2 border-black rounded-xl flex items-center w-full justify-between p-3"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="auto"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">
            Uber Auto <span><i className="ri-user-line"></i></span>3
          </h4>
          <h5 className="font-medium text-sm">2 min away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-medium font-semibold">₹ {fares.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
