import React, { useState } from 'react'
import { FileInput, Label, LabelSuccess, MainContainer } from './KeyUploaderBox.styles'

const KeyUploaderBox = () => {

  const [keyStatus, setKeyStatus] = useState<boolean>(false)
  const upload = (file: File) => {
    const formData = new FormData()
    formData.append('accesskey', file)

    return fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // 'content-type': 'multipart/form-data',
      },
    })
  }

  const onFileChanged = async (e: any) => {
    const result = await upload(e.target.files[0])
    if (result.status === 200) {
      setKeyStatus(true)
    }
  }
  return <MainContainer>
    {keyStatus
      ?
      <LabelSuccess>Access key loaded!</LabelSuccess>
      :
      <>
        <FileInput onChange={onFileChanged} type="file" accept=".txt" />
        <Label>Upload access key</Label>
      </>
    }
  </MainContainer>
}

export { KeyUploaderBox }
