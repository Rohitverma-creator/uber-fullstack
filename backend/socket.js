const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: [
      "http://localhost:5173",
      "https://uber-fullstack-git-main-rohitverma-creators-projects.vercel.app"
    ],
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // 🔹 Join event
    socket.on('join', async (data) => {
      const { userId, userType } = data;

      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
    
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { 
          socketId: socket.id, 
          status: 'active' // ✅ driver now active on join
        });
       
      }
    });

    // 🔹 Update location
    socket.on('update-location-captain', async (data) => {
      const { captainId, lat, lng } = data;

      if (!lat || !lng) {
        return socket.emit('error', { message: 'Invalid location data' });
      }

      await captainModel.findByIdAndUpdate(captainId, {
        location: { lat, lng }
      });
    });

    // 🔹 Disconnect
    socket.on('disconnect', async () => {
      
      // Set captain inactive if socket matches
      await captainModel.findOneAndUpdate(
        { socketId: socket.id },
        { status: 'inactive' }
      );
    });
  });
}

// 🔹 Send message utility
const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io not initialized.');
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
