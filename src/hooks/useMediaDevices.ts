import { constraints } from '@/config'
import { useCallback } from 'react'

export const useMediaDevices = () => {
  const getUserMedia = useCallback(async () =>
    navigator.mediaDevices.getUserMedia(constraints), [],
  )

  return { getUserMedia }
}