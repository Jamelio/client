import React, { FC, useContext } from 'react'
import { LinkButton, MainContainer } from '@/Components/Common/Common.styles'
import { VideoBox } from '@/Components/Chat/Viewport/Viewport.styles'
import { SessionContext } from '@/Context/SessionContext'

const Viewport: FC = () => {
  const [context] = useContext(SessionContext)

  return (
    <MainContainer>
      <p>{context.nickname}</p>
      <VideoBox />
      <LinkButton href="/topup">Top up</LinkButton>
    </MainContainer>
  )

}

export { Viewport }
