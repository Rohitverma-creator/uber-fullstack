const axios = require("axios");
const captainModel = require("../models/captain.model");

const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;

// ------------------- Utility: Convert Address → Coordinates -------------------
async function getAddressCoordinates(address) {
  if (!address) throw new Error("Address is required");

  try {
    const response = await axios.get("https://us1.locationiq.com/v1/search.php", {
      params: { key: LOCATIONIQ_API_KEY, q: address, format: "json", limit: 1 },
    });

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
    }
    throw new Error("No coordinates found for this address");
  } catch (err) {
    console.error("Error fetching coordinates:", err.message);
    throw new Error("Failed to fetch coordinates from LocationIQ");
  }
}

// ------------------- Utility: Haversine Formula (meters) -------------------
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371000; // Earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // meters
}

// ------------------- Distance & Time -------------------
async function getDistanceTime(origin, destination) {
  if (!origin || !destination) throw new Error("Origin and Destination are required");

  const originCoords = await getAddressCoordinates(origin);
  const destCoords = await getAddressCoordinates(destination);

  const url = `https://us1.locationiq.com/v1/directions/driving/${originCoords.lng},${originCoords.lat};${destCoords.lng},${destCoords.lat}`;
  const response = await axios.get(url, { params: { key: LOCATIONIQ_API_KEY } });

  if (response.data?.routes?.length > 0) {
    const route = response.data.routes[0];
    return {
      origin: originCoords,
      destination: destCoords,
      distance_meters: route.distance,
      duration_seconds: route.duration,
      distance_km: (route.distance / 1000).toFixed(2),
      duration_minutes: (route.duration / 60).toFixed(2),
    };
  }
  throw new Error("No route found");
}

// ------------------- Autocomplete Suggestions -------------------
async function getAutoCompleteSuggestions(input) {
  if (!input) throw new Error("Input is required for autocomplete");

  try {
    const response = await axios.get("https://us1.locationiq.com/v1/autocomplete.php", {
      params: { key: LOCATIONIQ_API_KEY, q: input, limit: 5 },
    });

    return response.data?.length
      ? response.data.map((place) => ({
          name: place.display_name,
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        }))
      : [];
  } catch (err) {
    console.error(" Error fetching autocomplete:", err.message);
    if (err.response) console.error(" LocationIQ Response:", err.response.data);
    throw new Error("Failed to fetch autocomplete suggestions");
  }
}

// ------------------- Captains in Radius (Nearest fallback) -------------------
async function getCaptainInTheRadius(lat, lng, radiusMeters) {
  try {
    if (!lat || !lng) throw new Error("Invalid coordinates");

    // Fetch active captains with valid location
    const captains = await captainModel.find({
      status: "active",
      "location.lat": { $ne: null },
      "location.lng": { $ne: null },
    });

    if (!captains.length) return [];

    // Filter by radius
    let nearbyCaptains = captains.filter((c) => {
      const distance = calculateDistance(lat, lng, c.location.lat, c.location.lng);
   
      return distance <= radiusMeters;
    });

    // Fallback: nearest captain if radius empty
    if (!nearbyCaptains.length) {
      let minDistance = Infinity;
      let nearestCaptain = null;
      captains.forEach((c) => {
        const distance = calculateDistance(lat, lng, c.location.lat, c.location.lng);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCaptain = c;
        }
      });
      if (nearestCaptain) nearbyCaptains = [nearestCaptain];
    }

    // Enrich with straight + driving distance
    const enriched = await Promise.all(
      nearbyCaptains.map(async (c) => {
        const straightDistance = calculateDistance(lat, lng, c.location.lat, c.location.lng);

        try {
          const url = `https://us1.locationiq.com/v1/directions/driving/${lng},${lat};${c.location.lng},${c.location.lat}`;
          const res = await axios.get(url, { params: { key: LOCATIONIQ_API_KEY } });
          const drivingDistance = res.data.routes?.[0]?.distance || null;
          return { ...c.toObject(), straightDistance, drivingDistance };
        } catch (e) {
          console.error("LocationIQ error:", e.message);
          return { ...c.toObject(), straightDistance, drivingDistance: null };
        }
      })
    );

    // Sort by straight distance
    enriched.sort((a, b) => a.straightDistance - b.straightDistance);

    return enriched;
  } catch (err) {
    console.error("getCaptainInTheRadius error:", err.message);
    throw err;
  }
}

module.exports = {
  getAddressCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
  getCaptainInTheRadius,
};
