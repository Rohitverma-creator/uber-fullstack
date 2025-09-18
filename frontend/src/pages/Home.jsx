import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "./VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingforDriver from "../components/WaitingforDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  // Debounced values
  const debouncedPickup = useDebounce(pickup, 500);
  const debouncedDestination = useDebounce(destination, 500);

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const confirmedRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [ride, setRide] = useState(null);
  const waitingForDriverRef = useRef(null);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    const actualUser = user?.user; // nested user nikal lo

    if (actualUser && actualUser._id) {
      socket.emit("join", { userType: "user", userId: actualUser._id });
    
    } else {
      console.warn(" User not ready yet, skipping join event");
    }
  }, [user, socket]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate('/riding',{state:{ride}});

  });




  // 🔹 Fetch suggestions from backend
  const fetchSuggestions = async (value, field) => {
    if (!value || value.length < 3) {
      if (field === "pickup") setPickupSuggestions([]);
      if (field === "destination") setDestinationSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        { params: { input: value } }
      );

      const data = res.data;
      if (Array.isArray(data)) {
        if (field === "pickup") {
          setPickupSuggestions(data);
        } else {
          setDestinationSuggestions(data);
        }
      }
    } catch (err) {
      console.error(
        "Error fetching suggestions:",
        err.response?.data || err.message
      );
      if (field === "pickup") setPickupSuggestions([]);
      if (field === "destination") setDestinationSuggestions([]);
    }
  };

  // 🔹 Trigger suggestions only on debounced values
  useEffect(() => {
    if (debouncedPickup) fetchSuggestions(debouncedPickup, "pickup");
  }, [debouncedPickup]);

  useEffect(() => {
    if (debouncedDestination)
      fetchSuggestions(debouncedDestination, "destination");
  }, [debouncedDestination]);

  const submitHandler = (e) => e.preventDefault();

  // 🔹 GSAP Animations
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      opacity: panelOpen ? 1 : 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmedRidePanelRef.current, {
      transform: confirmedRidePanel ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [confirmedRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [waitingForDriver]);

  // 🔹 Trip / Ride handlers
  async function findTrip() {
    try {
      setVehiclePanel(true);
      setPanelOpen(false);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination }, // sirf pickup & destination bhejna hai
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFare(res.data.fare);
    } catch (err) {
      console.error("Error fetching fare:", err.response?.data || err.message);
    }
  }

  async function createRide(selectedType) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType: selectedType || vehicleType, // ✅ param ya state
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

    } catch (err) {
      console.error(
        " Error creating ride:",
        err.response?.data || err.message
      );
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Home Icon"
      />

      {/* Background */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map background"
        />
      </div>

      {/* Bottom Form */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[35%] p-5 bg-white relative">
          <h5
            onClick={() => setPanelOpen(!panelOpen)}
            className={`absolute top-6 right-6 text-2xl transition-opacity duration-300 ${
              panelOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a trip</h4>

          <form onSubmit={submitHandler} className="relative mt-5">
            <div className="absolute left-5 top-3 bottom-3 w-[2px] bg-gray-900"></div>

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#f3f3f3] px-8 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pickup location"
            />

            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#f3f3f3] px-8 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          <button
            onClick={findTrip}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 w-full mt-3 mb-3"
          >
            Find Trip
          </button>
        </div>

        {/* Search Suggestions Panel */}
        <div
          ref={panelRef}
          className="h-[20%] bg-white opacity-0 overflow-auto"
        >
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            setPanelOpen={setPanelOpen}
            activeField={activeField}
            setSuggestions={
              activeField === "pickup"
                ? setPickupSuggestions
                : setDestinationSuggestions
            }
          />
        </div>
      </div>

      {/* Panels */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full"
      >
        <VehiclePanel
          fare={fare}
          createRide={createRide}
          selectVehicle={setVehicleType}
          setVehiclePanel={setVehiclePanel}
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehicleType={setVehicleType}
        />
      </div>

      <div
        ref={confirmedRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full"
      >
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full"
      >
        <LookingForDriver
          setLookingForDriverPanel={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full"
      >
        <WaitingforDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          rideAssigned={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
