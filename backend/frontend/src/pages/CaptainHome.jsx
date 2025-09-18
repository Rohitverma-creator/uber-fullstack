import React, { useRef, useState, useEffect, useContext } from "react";
import CaptainDetails from "../components/CaptainDetails";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain || !captain._id) return;

    // Captain join karega
    socket.emit("join", { userId: captain._id, userType: "captain" });

    // Location update function
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;

            socket.emit("update-location-captain", {
              captainId: captain._id,
              lat: latitude,
              lng: longitude,
            });
          },
          (err) => console.error(" Geolocation error:", err.message)
        );
      }
    };

    updateLocation();

    const intervalId = setInterval(updateLocation, 10000);

    return () => clearInterval(intervalId);
  }, [captain]);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });
  async function confirmRide() {
    // Correct path to rideId
    const rideId = ride?.ride?._id || ride?._id;

    if (!rideId) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
      navigate(`/riding/${rideId}`);
    } catch (err) {
      console.error(
        "Error confirming ride:",
        err.response?.data || err.message
      );
    }
  }

  // GSAP animations
  useGSAP(() => {
    if (ridePopupPanelRef.current)
      gsap.to(ridePopupPanelRef.current, {
        y: ridePopupPanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanelRef.current)
      gsap.to(confirmRidePopupPanelRef.current, {
        y: confirmRidePopupPanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      {/* Map Section */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
        />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* Ride Popup */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
