// src/sockets/socket.js
let ioInstance;

function socketHandler(io) {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('subscribeProductStock', (productId) => {
      socket.join(`product_${productId}`);
      console.log(`Socket ${socket.id} subscribed to product_${productId}`);
    });

    socket.on('subscribeAdminDashboard', () => {
      socket.join('admin_dashboard');
      console.log(`Socket ${socket.id} subscribed to admin_dashboard`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function emitStockUpdate(productId, newStock) {
  if (!ioInstance) return;
  ioInstance.to(`product_${productId}`).emit('stockUpdate', { productId, stock: newStock });
}

function emitAdminAnalytics(data) {
  if (!ioInstance) return;
  ioInstance.to('admin_dashboard').emit('adminAnalytics', data);
}

module.exports = socketHandler;
module.exports.emitStockUpdate = emitStockUpdate;
module.exports.emitAdminAnalytics = emitAdminAnalytics;
