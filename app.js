const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const sequelize = require('./config');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
require('dotenv').config();


app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database and tables created!');
});

// Initialize Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log('Server is running on port 3000');
});