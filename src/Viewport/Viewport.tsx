import React, { useEffect } from 'react';
import { ButtonsRow, MainContainer, NicknameInput, SubmitButton, VideoContainer } from './Viewport.styles';
import { usePeerConnector } from '../hooks/usePeerConnector';
import { useMembers } from '../hooks/useMembers';

const Viewport = () => {
  const {
    peerId,
    setPeerId,
    connectToServer,
    disconnectFromServer,
    setRecipientPeerId,
    recipientPeerId,
    connectToPeer,
    disconnectFromPeer,
    connectToNextPeer,
    isConnected,
    isInCall,
  } = usePeerConnector();

  const { getMemberId } = useMembers();

  const connectionStatusButtonLabel = isConnected ? 'Connected' : 'Connect to server'

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    });
    if ((params as any).peerId) {
      setPeerId((params as any).peerId || '')
    }
  }, [setPeerId])

  return (
    <MainContainer>
      <NicknameInput
        disabled={isConnected}
        placeholder="Your nickname"
        value={peerId}
        type="text" onChange={(e) => {
        setPeerId(e.currentTarget.value || '')
      }} />
      {isConnected ? <SubmitButton
          onClick={() => {
            disconnectFromServer().catch(console.log)
          }}>Disconnect
        </SubmitButton>
        :
        <SubmitButton
          disabled={!peerId}
          onClick={async () => {
            connectToServer().catch(console.log)
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
        disabled={isInCall}
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
          :
          <SubmitButton disabled={!recipientPeerId} onClick={() => {
            connectToPeer(recipientPeerId).catch(console.log)
          }}>Connect to peer
          </SubmitButton>
      }

      <SubmitButton onClick={() => {
        connectToNextPeer().catch(console.log)
      }}>Next peer
      </SubmitButton>

      <VideoContainer>
        <p>Me</p>
        <video id="me" autoPlay playsInline />

        <p>Guest</p>
        <video id="recipient" autoPlay playsInline />
      </VideoContainer>
    </MainContainer>
  )

}

export { Viewport }
