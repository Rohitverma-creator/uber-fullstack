import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token"); // clear token
          setCaptain(null);                 // clear context
          navigate("/captain-login");       // redirect to login
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        setCaptain(null);
        navigate("/captain-login");
      });
  }, [navigate, setCaptain]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
