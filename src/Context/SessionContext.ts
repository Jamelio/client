import { createContext } from 'react'

export interface ISessionContext {
  nickname: string

}

const defaultValue: ISessionContext = {
  nickname: 'default value',
}

export const SessionContext = createContext<any>(defaultValue)
