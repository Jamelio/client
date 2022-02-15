import React from 'react';
import { MainContainer } from './Viewport.styles';
import { useConnector } from '../PeerConnector/useConnector';

const Viewport = () => {
  const { peerId, setPeerId, connectToServer, setRecipientPeerId, recipientPeerId, connectToPeer } = useConnector();

  return (
    <MainContainer>
      <input placeholder="Your nickname"
             value={peerId}
             type="text" onChange={(e) => {
        setPeerId(e.currentTarget.value)
      }} />
      <button onClick={() => {
        connectToServer().catch(console.log)
      }}>Connect to server
      </button>
      <br />
      <br />
      <br />
      <br />

      <input placeholder="Recipient nickname"
             value={recipientPeerId}
             type="text" onChange={(e) => {
        setRecipientPeerId(e.currentTarget.value)
      }} />
      <button onClick={() => {
        connectToPeer(recipientPeerId).catch(console.log)
      }}>Connect to peer
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />

      <p>Me</p>
      <video id="me" autoPlay playsInline />

      <p>Guest</p>
      <video id="recipient" autoPlay playsInline />

    </MainContainer>
  )

}
export { Viewport }