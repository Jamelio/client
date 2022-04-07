import styled from 'styled-components'
import { Link } from 'wouter'

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: bold;
`

export const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`
