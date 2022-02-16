import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MainContainer, NicknameInput, SubmitButton, VideoContainer } from './Viewport.styles';
import { usePeerConnector } from '@/hooks/usePeerConnector';
import { useMembers } from '@/hooks/useMembers';
import { useToken } from '@/hooks/useToken';

const Viewport = () => {
  const meVideoRef = useRef<HTMLVideoElement>(null);

  const onStreamStarted = (remoteStream: MediaStream) => {
    meVideoRef.current!.srcObject = remoteStream;

    // const videoMe = document.querySelector('video#me');
    // (videoMe as any).srcObject = stream;
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
    connectToNextPeer,
    isConnected,
    isInCall,
  } = usePeerConnector(onStreamStarted);

  const { getMemberId } = useMembers();
  const { getToken } = useToken();

  const [token, setToken] = useState<string>('');

  const connectionStatusButtonLabel = isConnected ? 'Connected' : 'Connect to server'

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    });
    if ((params as any).peerId) {
      setPeerId((params as any).peerId || '')
    }
  }, [setPeerId])

  const populateToken = useCallback(async () => {
      const token = await getToken();
      setToken(token);
    },
    [getToken])

  useEffect(() => {
    populateToken()
  }, [])

  return (
    <MainContainer>
      <SubmitButton onClick={() => {
        navigator.clipboard.writeText(token);
      }}>Copy Token to Clipboard</SubmitButton>

      <SubmitButton onClick={() => {
        const blob = new Blob([token], { type: 'text/csv' });
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = 'token_key.txt';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);

      }}>Download Token</SubmitButton>

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
        <video ref={meVideoRef} id="me" autoPlay playsInline />

        <p>Guest</p>
        <video id="recipient" autoPlay playsInline />
      </VideoContainer>
    </MainContainer>
  )

}

export { Viewport }
