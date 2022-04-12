import React, { useContext } from 'react'
import { MainContainer } from '@/Components/Common/Common.styles'
import { Header } from '@/Components/Header/Header'
import { useSession } from '@/hooks/useSession'
import { useNickname } from '@/hooks/useNickname'
import { ButtonsRow } from '@/Viewport/Viewport.styles'
import { AccessKeyField } from './EarnInfo.styles'
import { download } from '@/utils/download'
import { SessionContext } from '@/Context/SessionContext'
import { useLocation } from 'wouter'

const EarnInfo = () => {
  const [location, setLocation] = useLocation()

  const { accessKey, createSession } = useSession()
  const { nickname, generateNickname } = useNickname()

  const copyToClipboard = async () => {
    if (!accessKey) {
      return
    }

    await navigator.clipboard.writeText(accessKey)
  }

  const [context, setContext] = useContext(SessionContext)

  return <SessionContext.Consumer>
    {(value) => (
      <MainContainer>
        <Header />
        {value.nickname}
        <p>Whilst chatting with strangers, You may receive donations if your counterpart likes and feels like rewarding
          you for a nice talk.</p>

        <p>If this happens, we want you to be able to receive your tips instantly right to your BTC wallet of your
          choice.</p>

        <h3>Nickname</h3>
        <p>{nickname}</p>
        <button onClick={() => {
          generateNickname()
        }}>Generate new nickname
        </button>
        <label>Your Access Key</label>
        <AccessKeyField readOnly value={accessKey} />

        <button disabled={!accessKey} onClick={copyToClipboard}>Copy to clipboard</button>

        <button
          disabled={!accessKey}
          onClick={() => {
            if (!accessKey) {
              return
            }
            download(`jamelio_${nickname}_access_key.txt`.replace(' ', '_').toLowerCase(), accessKey)
          }}>Download as file
        </button>

        <p>Save it to claim your earnings</p>

        <ButtonsRow>
          <button onClick={async () => {
            if (nickname) {
              await createSession(nickname)
              setContext({ nickname })
              setLocation('/chat')
            }
          }
          }>
            Next
          </button>

        </ButtonsRow>

      </MainContainer>
    )}
  </SessionContext.Consumer>
}

export { EarnInfo }
