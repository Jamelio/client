import { useState } from 'react'

const useSession = () => {
  const [accessKey, setAccessKey] = useState<string>()
  const [sessionData, setSessionData] = useState<any>()
  const createSession = async (nickname: string) => {
    try {
      const macaroonResponse = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
      })
      const resp = await macaroonResponse.json()
      setAccessKey(resp.macaroon)

      document.cookie = `macaroon=${resp.macaroon}`
      setSessionData({ nickname: resp.nickname })

    } catch (err) {
      console.error(err)
    }
  }

  return { accessKey, createSession, sessionData }
}

export { useSession }
