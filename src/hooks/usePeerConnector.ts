import { useCallback, useState } from 'react';
import Peer, { DataConnection } from 'peerjs';
import { constraints } from '@/config';
import { useMembers } from '@/hooks/useMembers';
import { peerConfig } from '@/config/peerConfig';

const usePeerConnector = (onStreamStarted: any) => {
  const [peer, setPeer] = useState<Peer>();
  const [peerId, setPeerId] = useState<string>('');
  const [recipientPeerId, setRecipientPeerId] = useState<string>('');

  const [connection, setConnection] = useState<DataConnection>();
  const { getMemberId } = useMembers();

  const connectToServer = useCallback(async () => {
      console.log(`Will connect as ${peerId}`);

      const peer = await new Peer(peerId, peerConfig);

      // Happens when the user connects to the server
      peer.on('open', (peerId: string) => {
        console.log(`Connected as ${peerId}`)
      });


      // Happens when some other user connects to me
      peer.on('connection', (conn) => {
        setConnection(conn);
        console.log(`Incoming connection from ${conn.peer}`)
        console.log(conn)
        setRecipientPeerId(conn.peer)
        conn.on('data', (data) => {
          // Will print 'hi!'
          console.log(data);
        });
      });

      peer.on('close', () => {
        console.log('connection closed')
        setConnection(undefined)
      });

      peer.on('disconnected', () => {
        console.log('connection disconnected')
        setConnection(undefined)
      });

      // Happens when some other user calls me
      peer.on('call', async (call) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
          onStreamStarted(remoteStream);
        });

      });

      setPeer(peer);
    }, [onStreamStarted, peerId],
  )

  const handleSuccess = (stream: MediaStream, videoQuery: string) => {
    const video = document.querySelector(videoQuery);
    (video as any).srcObject = stream;
  };

  const connectToPeer = useCallback(async (peerId: string) => {
      console.log(`Will try to connect to ${peerId}`)
      const conn = peer?.connect(peerId);
      conn?.on('open', () => {
        console.log(`connected to ${peerId}`)
        conn.send(`Hello, ${peerId}!`);
        setConnection(conn)
      });

      conn?.on('close', () => {
        console.log(`disconnected from ${peerId}`)
        const videoRecipient = document.querySelector('video#recipient');
        (videoRecipient as any).srcObject = null;
        setConnection(undefined)
      });

      conn?.on('error', () => {
        console.log('connection error')
      })

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      handleSuccess(stream, 'video#me');
      console.log(recipientPeerId)

      const call = peer?.call(recipientPeerId, stream);
      call?.on('stream', (remoteStream) => {
        console.log('stream started')
        handleSuccess(remoteStream, 'video#recipient');
      });

    }, [peer, recipientPeerId],
  )

  const connectToNextPeer = useCallback(async () => {
    const result = await getMemberId(peerId);
    setRecipientPeerId(result.id)
  }, [getMemberId, peerId])

  const disconnectFromPeer = useCallback(async (peerId: string) => {
      console.log(`Will disconnect from ${peerId}`)
      // console.log(peer?.destroy())
      console.log(connection?.close())

      const videoRecipient = document.querySelector('video#recipient');
      (videoRecipient as any).srcObject = null;
      setConnection(undefined)
    }, [connection],
  )

  const disconnectFromServer = useCallback(async () => {
      console.log(`Will disconnect`)
      peer?.disconnect();
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
    disconnectFromPeer,
    connectToNextPeer,
    setRecipientPeerId,
    recipientPeerId,
    isConnected: Boolean(peer),
    isInCall: Boolean(connection),
  }
}

export { usePeerConnector };
