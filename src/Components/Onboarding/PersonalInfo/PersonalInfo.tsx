import React from 'react'

import { ButtonsRow } from '@/Viewport/Viewport.styles'
import { LinkButton, MainContainer } from '@/Components/Common/Common.styles'
import { Header } from '@/Components/Header/Header'
import { KeyUploaderBox } from '@/Components/KeyUploaderBox/KeyUploaderBox'

const PersonalInfo = () => {
  return <MainContainer>
    <Header />
    <p>To offer you the best experience, we ask you for some details about yourself and your preferences.</p>

    <ButtonsRow>
      <LinkButton href="/earn">
        Next
      </LinkButton>

    </ButtonsRow>

    <KeyUploaderBox />

  </MainContainer>
}

export { PersonalInfo }
