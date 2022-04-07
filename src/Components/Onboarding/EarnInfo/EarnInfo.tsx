import React from 'react'

import { ButtonsRow } from '@/Viewport/Viewport.styles'
import { LinkButton, MainContainer } from '@/Components/Common/Common.styles'
import { Header } from '@/Components/Header/Header'

const EarnInfo = () => {
  return <MainContainer>
    <Header />
    <p>Whilst chatting with strangers, You may receive donations if your counterpart likes and feels like rewarding you
      for a nice talk.</p>

    <p>If this happens, we want you to be able to receive your tips instantly right to your BTC wallet of your
      choice.</p>

    <label htmlFor="">Your Unique ID</label>
    <input type="text" value="1BvBMSEYstWetqTFn5" />
    <p>Save it to claim your earnings</p>

    <ButtonsRow>
      <LinkButton href="/chat">
        Next
      </LinkButton>

    </ButtonsRow>

  </MainContainer>
}

export { EarnInfo }
