const useMembers = () => {

  const getMemberId = async (peerId: string) => {
    const resp = await fetch(`/api/memberId?p=${peerId}`)
    return resp.json();
  }

  return { getMemberId }
}

export { useMembers }