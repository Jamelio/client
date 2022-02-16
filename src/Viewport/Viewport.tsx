import React from 'react';
import { MainContainer, NicknameInput, SubmitButton } from './Viewport.styles';
import { useConnector } from '../PeerConnector/useConnector';

const Viewport = () => {
  const {
    peerId,
    setPeerId,
    connectToServer,
    disconnectFromServer,
    setRecipientPeerId,
    recipientPeerId,
    connectToPeer,
    isConnected,
  } = useConnector();

  const connectionStatusButtonLabel = isConnected ? 'Connected' : 'Connect to server'

  return (
    <MainContainer>
      <NicknameInput
        disabled={isConnected}
        placeholder="Your nickname"
        value={peerId}
        type="text" onChange={(e) => {
        setPeerId(e.currentTarget.value)
      }} />
      {isConnected ? <SubmitButton
          onClick={() => {
            disconnectFromServer().catch(console.log)
          }}>Disconnect
        </SubmitButton>
        :
        <SubmitButton
          onClick={() => {
            connectToServer().catch(console.log)
          }}>{connectionStatusButtonLabel}
        </SubmitButton>
      }
      <br />
      <br />
      <br />
      <br />

      <NicknameInput placeholder="Recipient nickname"
                     value={recipientPeerId}
                     type="text" onChange={(e) => {
        setRecipientPeerId(e.currentTarget.value)
      }} />
      <SubmitButton onClick={() => {
        connectToPeer(recipientPeerId).catch(console.log)
      }}>Connect to peer
      </SubmitButton>

      <p>Me</p>
      <video id="me" autoPlay playsInline />

      <p>Guest</p>
      <video id="recipient" autoPlay playsInline />

    </MainContainer>
  )

}
export { Viewport }