import React from 'react'

import { ButtonsRow } from '@/Viewport/Viewport.styles'
import { LinkButton, MainContainer } from '@/Components/Common/Common.styles'
import { Header } from '@/Components/Header/Header'

const Intro = () => {
  return <MainContainer>
    <Header />
    <p>1-on-1 video chat with strangers</p>
    <p>Earn by talking!</p>

    <ButtonsRow>
      <LinkButton href="/personal">
        Start
      </LinkButton>

    </ButtonsRow>

  </MainContainer>
}

export { Intro }
