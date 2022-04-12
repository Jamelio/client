import styled from 'styled-components'

export const MainContainer = styled.div`
  width: 100%;
  height: 63px;
  background-color: #d1f4ff;
  border-radius: 8px;
  border: 1px solid #9ebcc5;
  margin: 20px 0 0 0;
  position: relative;

  &:active {
    border-color: #8cc2d2;
  }
`

export const FileInput = styled.input`
  background-color: #d1f4ff;
  margin: 0;
  opacity: 0;
  padding: 20px;
`

export const Label = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #3d5d65;
  font-size: 18px;
  line-height: 18px;
  pointer-events: none;
`

export const LabelSuccess = styled(Label)`
  color: green
`
