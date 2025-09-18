const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // 1. Get distance & time from mapService
  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const distanceKm = distanceTime.distance_meters / 1000;
  const durationMin = distanceTime.duration_seconds / 60;

  // 2. Define fare rates
  const fareRates = {
    auto: { perKm: 10, perMin: 2, baseFare: 30 },
    car: { perKm: 15, perMin: 3, baseFare: 50 },
    moto: { perKm: 8, perMin: 1.5, baseFare: 20 },
  };

  // 3. Calculate fares for each type
  const fares = {};
  for (let type in fareRates) {
    const rate = fareRates[type];
    fares[type] = Math.round(
      rate.baseFare + rate.perKm * distanceKm + rate.perMin * durationMin
    );
  }

  // 4. Return structured response
  return {
    pickup: distanceTime.origin,
    destination: distanceTime.destination,
    distance_km: distanceKm.toFixed(2),
    duration_min: durationMin.toFixed(2),
    fares,
  };
}

module.exports = {
  getFare,
};

function getOtp(num) {
  const otp = parseInt(crypto.randomBytes(num).toString("hex"), 16)
    .toString()
    .slice(0, num); // ensure length = num
  return otp.padStart(num, "0"); // leading zeros handle
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  console.log(fare);
  const ride = new rideModel({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare.fares[vehicleType],
    vehicleType,
  });
  await ride.save();
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId || !captain) throw new Error("All fields are required");

  const ride = await rideModel.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captain._id },
    { new: true }
  ).populate("user").populate("captain").select('+otp');



  if (!ride) throw new Error("Ride not found");

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}
module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}