import React from 'react'

import { ButtonsRow } from '@/Viewport/Viewport.styles'
import { LinkButton, MainContainer } from '@/Components/Common/Common.styles'
import { Header } from '@/Components/Header/Header'
import { VideoBox } from '@/Components/Chat/Viewport/Viewport.styles'

const Viewport = () => {
  return <MainContainer>
    <VideoBox/>
  </MainContainer>
}

export { Viewport }
