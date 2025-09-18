import React,{useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
   const {captain} = useContext(CaptainDataContext)
  return (
    <div className='mt-8'>
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover border"
              src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/ai_face_generator/ai_face_generator/webp/thumb_image/004.webp"
              alt="Driver"
            />
           <h4 className="text-lg font-medium capitalize">
        {captain?.fullname?.firstname || ""} {captain?.fullname?.lastname || ""}
      </h4>
          </div>

          <div className="text-right">
            <h4 className="text-xl font-semibold">₹193.20</h4>
            <p className="text-sm text-gray-500">Earned Today</p>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="flex justify-around items-center">
          <div className="text-center">
            <i className="text-2xl text-gray-700 ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>

          <div className="text-center">
            <i className="text-2xl text-gray-700 ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">18</h5>
            <p className="text-sm text-gray-600">Rides Completed</p>
          </div>

          <div className="text-center">
            <i className="text-2xl text-gray-700 ri-booklet-line"></i>
            <h5 className="text-lg font-medium">4.9</h5>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
        </div>
    </div>
    
  )
}

export default CaptainDetails
