import styled from 'styled-components'
import { Link } from 'wouter'

export const LinkButton = styled(Link)`
  background-color: #1C6DD0;
  padding: 0 30px;
  color: #fff;
  border-radius: 15px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`

export const MainContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 50px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`
