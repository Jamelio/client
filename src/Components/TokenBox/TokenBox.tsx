import { MainContainer } from './TokenBox.styles'
import React, { useCallback, useEffect, useState } from 'react'
import { useToken } from '@/hooks/useToken'
import { ButtonsRow, SubmitButton } from '@/Viewport/Viewport.styles'

const TokenBox = () => {
  const { getToken } = useToken()

  const [token, setToken] = useState<string>('')


  const populateToken = useCallback(async () => {
      const token = await getToken()
      setToken(token)
    },
    [getToken])

  useEffect(() => {
    populateToken()
  }, [])


  return <MainContainer>
    <ButtonsRow>
      <SubmitButton onClick={() => {
        navigator.clipboard.writeText(token)
      }}>Copy Token to Clipboard</SubmitButton>

      <SubmitButton onClick={() => {
        const blob = new Blob([token], { type: 'text/csv' })
        const elem = window.document.createElement('a')
        elem.href = window.URL.createObjectURL(blob)
        elem.download = 'token_key.txt'
        document.body.appendChild(elem)
        elem.click()
        document.body.removeChild(elem)

      }}>Download Token</SubmitButton>
    </ButtonsRow>

  </MainContainer>
}

export { TokenBox }