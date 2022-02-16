import { useCallback, useState } from 'react';
import Peer from 'peerjs';
import { constraints } from '../config';

const useConnector = () => {
  const [peer, setPeer] = useState<any>();
  const [isConnected, setConnectedStatus] = useState<boolean>(false);
  const [peerId, setPeerId] = useState<string>('');
  const [recipientPeerId, setRecipientPeerId] = useState<string>('');


  const connectToServer = useCallback(async () => {
      console.log(`Will connect as ${peerId}`);

      const peer = await new Peer(peerId, {
        host: 'jamelio.dev',
        port: 443,
        path: '/peer',
        debug: 1,
      });
      setConnectedStatus(true);

      peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          // Will print 'hi!'
          console.log(data);
        });
      });

      peer.on('close', () => {
        console.log('connection closed')
        setConnectedStatus(false);
      });

      peer.on('disconnected', () => {
        console.log('connection disconnected')
        setConnectedStatus(false);
      });

      peer.on('call', async (call: any) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function (remoteStream: any) {
          const videoRecipient = document.querySelector('video#recipient');
          (videoRecipient as any).srcObject = remoteStream;

          const videoMe = document.querySelector('video#me');
          (videoMe as any).srcObject = stream;

        });

      });

      setPeer(peer);
    }, [peerId],
  )

  const handleSuccess = (stream: any) => {
    const video = document.querySelector('video#recipient');
    (window as any).stream = stream; // make variable available to browser console
    (video as any).srcObject = stream;
  };

  const connectToPeer = useCallback(async (peerId: string) => {
      console.log(`Will try to connect to ${peerId}`)
      const conn = peer.connect(peerId);
      conn.on('open', () => {
        console.log(`connected to ${peerId}`)
        // here you have conn.id
        conn.send('hello');
      });
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const call = peer.call(recipientPeerId, stream);
      call.on('stream', function (remoteStream: any) {
        handleSuccess(remoteStream);
      });

    }, [peer],
  )

  const disconnectFromServer = useCallback(async () => {
      console.log(`Will disconnect`)
      peer.disconnect();
    }, [peer],
  )

  return {
    peer,
    peerId,
    setPeer,
    setPeerId,
    connectToServer,
    disconnectFromServer,
    connectToPeer,
    setRecipientPeerId,
    recipientPeerId,
    isConnected,
  }
}

export { useConnector };
