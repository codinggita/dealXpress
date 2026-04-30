import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const socketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: (process.env.FRONTEND_URL || 'http://localhost:5173').endsWith('/') 
        ? (process.env.FRONTEND_URL || 'http://localhost:5173').slice(0, -1) 
        : (process.env.FRONTEND_URL || 'http://localhost:5173'),
      methods: ['GET', 'POST'],
    },
  });

  // Authentication Middleware for Sockets
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.id})`);

    // Join a room for a specific negotiation
    socket.on('join_negotiation', (negotiationId) => {
      socket.join(negotiationId);
      console.log(`User ${socket.user.name} joined room: ${negotiationId}`);
    });

    // Handle typing status
    socket.on('typing', ({ negotiationId, isTyping }) => {
      socket.to(negotiationId).emit('typing_status', { userId: socket.user._id, isTyping });
    });

    // Join personal room for notifications
    socket.join(socket.user._id.toString());

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.name}`);
    });
  });

  return io;
};

export default socketIO;
