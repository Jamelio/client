import { useCallback, useState } from 'react';
import Peer from 'peerjs';
import { constraints } from '../config';

const useConnector = () => {
  const [peer, setPeer] = useState<any>();
  const [peerId, setPeerId] = useState<string>('');
  const [recipientPeerId, setRecipientPeerId] = useState<string>('');

  const connectToServer = useCallback(async () => {
      console.log(`Will connect as ${peerId}`);

      const peer = await new Peer(peerId, {
        host: 'jamelio.dev',
        port: 443,
        path: '/jamelio',
        debug: 1,
      });

      peer.on('connection', (conn) => {
        conn.on('data', (data) => {
          // Will print 'hi!'
          console.log(data);
        });
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

      console.log(peer)
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

  return { peer, peerId, setPeer, setPeerId, connectToServer, connectToPeer, setRecipientPeerId, recipientPeerId }
}

export { useConnector };