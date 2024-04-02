import {useCallback, useEffect, useRef, useState} from 'react';
import {Socket} from 'socket.io-client';
import {socketInit, getSocket, socketDisconnect} from '../utils/socket';

export const useSocket = () => {
  const socket = useRef<Socket | null>();
  const textRef = useRef<string>('');

  const [messages, setMessages] = useState<Array<string>>([]);

  const onPressSubmit = useCallback(() => {
    if (socket.current) {
      console.log('submit pressed', socket.current.id);
      socket?.current.emit('event: message', {
        message: textRef.current,
      });
    }
  }, []);

  const onMessageReceived = useCallback((data: string) => {
    console.log('message received on client', data);
    setMessages(prevState => [...prevState, data]);
  }, []);

  const onChangeText = useCallback(
    (text: string) => (textRef.current = text),
    [],
  );

  useEffect(() => {
    socketInit(onMessageReceived);
    socket.current = getSocket();

    return () => {
      socketDisconnect(onMessageReceived);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {onPressSubmit, onChangeText, messages};
};
