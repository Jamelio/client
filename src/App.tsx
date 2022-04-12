import React, { useState } from 'react'
import { Route } from 'wouter'

import { GlobalStyle } from './GlobalStyle'

import { Intro } from '@/Components/Onboarding/Intro/Intro'
import { PersonalInfo } from '@/Components/Onboarding/PersonalInfo/PersonalInfo'
import { EarnInfo } from '@/Components/Onboarding/EarnInfo/EarnInfo'

import { Viewport } from '@/Components/Chat/Viewport/Viewport'
import { TopupDetails } from '@/Components/Chat/TopupDetails/TopupDetails'


import { ISessionContext, SessionContext } from './Context/SessionContext'


export const App = () => {
  const [context, setContext] = useState<ISessionContext>({ nickname: '' })

  return <>
    <SessionContext.Provider value={[context, setContext]}>
      <GlobalStyle />
      <Route path="/" component={Intro} />
      <Route path="/personal" component={PersonalInfo} />
      <Route path="/earn" component={EarnInfo} />
      <Route path="/chat" component={Viewport} />
      <Route path="/topup" component={TopupDetails} />
    </SessionContext.Provider>

  </>
}
