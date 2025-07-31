const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const socketHandler = require('./sockets/socket');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const server = http.createServer(app);

// Set up socket.io
const io = new Server(server, {
  cors: { origin: '*' }
});
socketHandler(io); // Auth-based socket handling

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
