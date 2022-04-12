import React from 'react'

import { ButtonsRow } from '@/Viewport/Viewport.styles'
import { MainContainer } from '@/Components/Common/Common.styles'

const TopupDetails = () => {
  return <MainContainer>
    <p>We use Lightning network to provide you with instant and anonymous payments</p>
    <p>All unspent funds will be returned to your wallet. You only spend what you use.</p>


    <ButtonsRow>
      <button>$1</button>
      <button>$3</button>
      <button>$5</button>
      <button>$10</button>
    </ButtonsRow>

    <a href="lightning:lnbcrt1578940n1p39q8lupp5fa6z6mlznj0x88yypj7p7l9aujzfsf68cte9ppj3a358k26mgcdsdqqcqzpgsp5z58ez78phx5kxw8xxwfqjy3m40t888x4t3ygs7dxymlurrhe5fnq9qyyssq5zy5ga96f2e4lckxaaxpj6w0mew3tt4khj0295d3wqleuwpg00d5e9pw7pkm2a0ckh6yke2a5dtlwt20asj7dmchw0m33kdv2z3l06spmrvfjw">
      Pay from my wallet app
    </a>

  </MainContainer>
}

export { TopupDetails }
