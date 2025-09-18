import React from 'react'
import { Link } from 'react-router-dom'

const Start= () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c5310f182519763.652f3606b64b0.jpg')",
      }}
    >
      
      <div className="absolute inset-0 bg-black/30"></div>

     
      <div className="relative z-10 flex flex-col justify-between h-full pt-5">
        {/* Logo */}
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        {/* White Card */}
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Start
