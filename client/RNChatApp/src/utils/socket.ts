import {Socket, io} from 'socket.io-client';

const URL = 'http://192.168.1.7:8000';

let socket: Socket | null = null;

type onMessageReceivedType = (data: string) => void;

export const socketInit = (onMessageReceived: onMessageReceivedType) => {
  console.log('socket init');
  socket = io(URL, {transports: ['websocket']});

  socket.on('connect', () => {
    console.log('client connected');
  });

  socket.on('disconnect', (reason, details) => {
    console.log('client disconnected', reason, details);
  });

  socket.on('connect_error', error => {
    console.error(error);
  });

  socket.on('message', data => {
    onMessageReceived(data);
  });
};

export const socketDisconnect = (onMessageReceived: onMessageReceivedType) => {
  socket?.disconnect();
  socket?.off('message', onMessageReceived);
};

export const getSocket = () => {
  return socket;
};
