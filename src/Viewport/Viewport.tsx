import React, { useEffect, useRef } from 'react'
import { MainContainer, NicknameInput, SubmitButton, VideoContainer } from './Viewport.styles'
import { usePeerConnector } from '@/hooks/usePeerConnector'
import { useMembers } from '@/hooks/useMembers'

const Viewport = () => {
  const meVideoRef = useRef<HTMLVideoElement>(null)

  const onStreamStarted = (remoteStream: MediaStream) => {
    meVideoRef.current!.srcObject = remoteStream

    // const videoMe = document.querySelector('video#me');
    // (videoMe as any).srcObject = stream;
  }

  const onRecipientDisconnected = () => {
    console.log('onRecipientDisconnected')
  }

  const onConnectedToServer = () => {
    console.log('onConnectedToServer')
  }
  const onDisconnectedFromServer = () => {
    console.log('onDisconnectedFromServer')
  }
  const onConnectedToPeer = () => {
    console.log('onConnectedToPeer')
  }
  const onDisconnectedFromPeer = () => {
    console.log('onDisconnectedFromPeer')
  }

  const {
    peerId,
    setPeerId,
    connectToServer,
    disconnectFromServer,
    setRecipientPeerId,
    recipientPeerId,
    connectToPeer,
    disconnectFromPeer,
    getRandomPeer,
    isConnectedToServer,
    isInCall,
  } = usePeerConnector({
    onStreamStarted,
    onRecipientDisconnected,
    onConnectedToServer,
    onDisconnectedFromServer,
    onConnectedToPeer,
    onDisconnectedFromPeer,
  })

  const { getMemberId } = useMembers()
  const connectionStatusButtonLabel = isConnectedToServer ? 'Connected' : 'Connect to server'

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    })
    if ((params as any).peerId) {
      setPeerId((params as any).peerId || '')
    }
  }, [setPeerId])

  return (
    <MainContainer>
      <NicknameInput
        disabled={isConnectedToServer}
        placeholder="Your nickname"
        value={peerId}
        type="text" onChange={(e) => {
        setPeerId(e.currentTarget.value || '')
      }} />
      {isConnectedToServer ? <SubmitButton
          onClick={() => {
            disconnectFromServer().catch(console.log)
          }}>Disconnect
        </SubmitButton>
        :
        <SubmitButton
          disabled={!peerId}
          onClick={async () => {
            await connectToServer().catch(console.log)
            const { id: memberId } = await getMemberId(peerId).catch(console.log)
            setRecipientPeerId(memberId || '')
          }}>{connectionStatusButtonLabel}
        </SubmitButton>
      }
      <br />
      <br />
      <br />
      <br />

      <NicknameInput
        disabled={isInCall || !isConnectedToServer}
        placeholder="Recipient nickname"
        value={recipientPeerId}
        type="text" onChange={(e) => {
        setRecipientPeerId(e.currentTarget.value || '')
      }} />

      {
        isInCall ?
          <SubmitButton onClick={() => {
            disconnectFromPeer(recipientPeerId).catch(console.log)
          }}>Disconnect from peer
          </SubmitButton>
          : null
      }

      <SubmitButton
        disabled={!isConnectedToServer || isInCall}
        onClick={() => {
          getRandomPeer().catch(console.log)
        }}>Find someone
      </SubmitButton>

      <SubmitButton disabled={!recipientPeerId || !isConnectedToServer || isInCall} onClick={() => {
        connectToPeer(recipientPeerId).catch(console.log)
      }}>Connect to peer
      </SubmitButton>

      <VideoContainer>
        <p>Me</p>
        <video ref={meVideoRef} id="me" autoPlay playsInline />

        <p>Guest</p>
        <video id="recipient" autoPlay playsInline />
      </VideoContainer>
    </MainContainer>
  )

}

export { Viewport }
