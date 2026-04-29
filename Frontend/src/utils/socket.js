import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

let socket;

export const initiateSocketConnection = (userId) => {
	socket = io(SOCKET_URL, {
		transports: ['websocket'],
	});
	console.log(`Connecting socket...`);
	if (socket && userId) socket.emit('register_user', userId);
};

export const disconnectSocket = () => {
	console.log('Disconnecting socket...');
	if (socket) socket.disconnect();
};

export const joinNegotiationRoom = (negotiationId) => {
	if (socket && negotiationId) socket.emit('join_negotiation', negotiationId);
};

export const sendMessage = (data) => {
	if (socket) socket.emit('send_message', data);
};

export const subscribeToMessages = (cb) => {
	if (!socket) return (true);
	socket.on('receive_message', msg => {
		console.log('Websocket event received!');
		return cb(null, msg);
	});
};

export const subscribeToOffers = (cb) => {
	if (!socket) return (true);
	socket.on('new_offer', data => cb(null, data));
	socket.on('offer_updated', data => cb(null, data));
};

export const subscribeToTyping = (cb) => {
	if (!socket) return;
	socket.on('user_typing', data => cb(null, data));
};

export const emitTyping = (negotiationId, userId) => {
	if (socket) socket.emit('typing', { negotiationId, userId });
};

export const getSocket = () => socket;
