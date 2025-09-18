const rideService = require('../services/ride.services');
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    // 1️⃣ Create ride entry
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // 2️⃣ Get coordinates of pickup and destination
    let pickupCoordinates, destinationCoordinates;
    try {
      pickupCoordinates = await mapService.getAddressCoordinates(pickup);
      console.log(" Pickup:", pickupCoordinates);
    } catch (err) {
      console.warn("Pickup coordinates fetch failed, using fallback:", err.message);
      pickupCoordinates = { lat: 0, lng: 0 };
    }

    try {
      destinationCoordinates = await mapService.getAddressCoordinates(destination);
      console.log(" Destination:", destinationCoordinates);
    } catch (err) {
      console.warn("Destination coordinates fetch failed, using fallback:", err.message);
      destinationCoordinates = { lat: 0, lng: 0 };
    }

    // 3️⃣ Find nearby captains
    const captainInRadius = await mapService.getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      5000 // 5 km radius
    );

  

    if (!captainInRadius.length) {
      return res.status(404).json({ message: "No captains available nearby" });
    }

    // ✅ Pick first captain (or choose nearest based on straightDistance)
    const captain = captainInRadius[0];
    ride.otp = ""; // otp can be set here or in service

    const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')


    //  Send ride details to captain via socket
    sendMessageToSocketId(captain.socketId, {
      event: "new-ride",
      data: {
        ride :rideWithUser,
        pickupCoordinates,
        destinationCoordinates,

      },
    });

    //  Send response to client
    return res.status(201).json({
      ride,
      pickupCoordinates,
      destinationCoordinates,
      captainInRadius,
    });
  } catch (err) {
    console.error("Ride creation error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json({ fare });
  } catch (err) {
    console.error("Get fare error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, { event: "ride-confirmed", data: ride });

    return res.status(200).json({ ride });
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: err.message }] });
  }
};

module.exports.startRide=async(req,res)=>{
  const {rideId,otp}=req.query;

  try{
    const ride=await rideService.startRide({rideId,otp,captain:req.captain});

    sendMessageToSocketId(ride.user.socketId,{event:"ride-started",data:ride});
    return res.status(200).json({ride});
    
}
catch(err){
  return res.status(500).json({errors:[{msg:err.message}]});
}
}
module.exports.endRide = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}
