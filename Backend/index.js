import http from 'http';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import socketIO from './src/config/socket.js';

const port = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.io
const io = socketIO(server);

// Make io accessible in request object
app.set('io', io);

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
});
