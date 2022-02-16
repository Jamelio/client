const useToken = () => {
  const getToken = async () => {
    const resp = await fetch('/api/token')
    const data = await resp.json();
    return data.token
  }

  return { getToken }
}

export { useToken }