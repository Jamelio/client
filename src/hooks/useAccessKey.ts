import { useEffect, useState } from 'react'

const useAccessKey = () => {
  const [uniqueId, setUniqueId] = useState<string>()
  const populateUniqueId = async () => {
    const resp = await fetch('/api/getkey')
    setUniqueId(await resp.text())
  }

  useEffect(() => {
    populateUniqueId()
  }, [])

  return { uniqueId }
}

export { useAccessKey }
