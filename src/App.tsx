import React from 'react'
import { GlobalStyle } from './GlobalStyle'

import { Intro } from '@/Components/Onboarding/Intro/Intro'
import { PersonalInfo } from '@/Components/Onboarding/PersonalInfo/PersonalInfo'
import { EarnInfo } from '@/Components/Onboarding/EarnInfo/EarnInfo'

import { Viewport } from '@/Components/Chat/Viewport/Viewport'

import { Route } from 'wouter'

export const App = () => {

  return <>
    <GlobalStyle />
    <Route path="/" component={Intro} />
    <Route path="/personal" component={PersonalInfo} />
    <Route path="/earn" component={EarnInfo} />
    <Route path="/chat" component={Viewport} />
  </>
}
