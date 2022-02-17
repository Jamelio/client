import { useCallback, useState } from 'react'
import Peer, { DataConnection } from 'peerjs'
import { useMembers } from '@/hooks/useMembers'
import { peerConfig } from '@/config/peerConfig'
import { useMediaDevices } from '@/hooks/useMediaDevices'

interface IPeerConnectorConfig {
  onConnectedToServer: () => void
  onDisconnectedFromServer: () => void

  onConnectedToPeer: () => void
  onDisconnectedFromPeer: () => void

  onStreamStarted: (stream: MediaStream) => void
  onRecipientDisconnected: () => void
}


const usePeerConnector = (config: IPeerConnectorConfig) => {
  const { onStreamStarted, onRecipientDisconnected, onConnectedToServer, onDisconnectedFromServer } = config

  const [peer, setPeer] = useState<Peer>()
  const [peerId, setPeerId] = useState<string>('')
  const [recipientPeerId, setRecipientPeerId] = useState<string>('')

  const [peerConnection, setPeerConnection] = useState<DataConnection>()

  const { getMemberId } = useMembers()
  const { getUserMedia } = useMediaDevices()

  const connectToServer = useCallback(async () => {
      const peer = await new Peer(peerId, peerConfig)

      // Happens when the user connects to the server
      peer.on('open', (peerId: string) => {
        setPeer(peer)
        onConnectedToServer()
      })


      // Happens when some other user connects to me
      peer.on('connection', (conn) => {
        setPeerConnection(conn)
        console.log(`Incoming connection from ${conn.peer}`)
        setRecipientPeerId(conn.peer)
        conn.on('data', (data) => {
          // Will print 'hi!'
          console.log(data)
        })
      })

      peer.on('close', () => {
        console.log('connection closed')
        setPeerConnection(undefined)
        onDisconnectedFromServer()
      })

      peer.on('disconnected', () => {
        setPeer(undefined)
        onDisconnectedFromServer()
      })

      // Happens when some other user calls me
      peer.on('call', async (call) => {
        const stream = await getUserMedia()
        call.answer(stream)
        call.on('stream', onStreamStarted)

      })

    }, [getUserMedia, onConnectedToServer, onDisconnectedFromServer, onStreamStarted, peerId],
  )

  /*
    const handleSuccess = (stream: MediaStream, videoQuery: string) => {
      const video = document.querySelector(videoQuery);
      (video as any).srcObject = stream;
    };
  */

  const connectToPeer = useCallback(async (peerId: string) => {
      console.log(`Will try to connect to ${peerId}`)
      const conn = peer?.connect(peerId)
      conn?.on('open', () => {
        console.log(`connected to ${peerId}`)
        conn.send(`Hello, ${peerId}!`)
        setPeerConnection(conn)
      })

      conn?.on('close', () => {
        // console.log(`disconnected from ${peerId}`)
        // const videoRecipient = document.querySelector('video#recipient');
        // (videoRecipient as any).srcObject = null
        setPeerConnection(undefined)
        onRecipientDisconnected()
      })

      conn?.on('error', () => {
        console.log('connection error')
      })

      const stream = await getUserMedia()

      // handleSuccess(stream, 'video#me')
      console.log(recipientPeerId)

      const call = peer?.call(recipientPeerId, stream)
      call?.on('stream', (remoteStream) => {
        console.log('stream started')
        // handleSuccess(remoteStream, 'video#recipient')
        onStreamStarted(remoteStream)
      })

    }, [getUserMedia, onRecipientDisconnected, onStreamStarted, peer, recipientPeerId],
  )

  const getRandomPeer = useCallback(async () => {
    const result = await getMemberId(peerId)
    setRecipientPeerId(result.id)
  }, [getMemberId, peerId])

  const disconnectFromPeer = useCallback(async (peerId: string) => {
      console.log(`Will disconnect from ${peerId}`)
      peerConnection?.close()

      // const videoRecipient = document.querySelector('video#recipient');
      // (videoRecipient as any).srcObject = null
      setPeerConnection(undefined)
      setPeer(undefined)
    }, [peerConnection],
  )

  const disconnectFromServer = useCallback(async () => {
      peer?.disconnect()
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
    getRandomPeer,
    setRecipientPeerId,
    recipientPeerId,
    isConnectedToServer: Boolean(peer),
    isInCall: Boolean(peerConnection),
  }
}

export { usePeerConnector }
