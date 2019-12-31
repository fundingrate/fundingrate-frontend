import React, { useEffect, useState } from 'react'
import { Button, Input } from '../primitives'
import copy from 'clipboard-copy'

Input.Copy = ({ value, ...p }) => {
  const [state, setState] = useState(false)

  const CopyValue = p => {
    setState(true)
    copy(value)
    setTimeout(() => setState(false), 1000)
  }

  return (
    <Input {...p} disabled value={value}>
      <Button onClick={e => CopyValue(value)} type="simple">
        {state ? 'Copied!' : 'Copy'}
      </Button>
    </Input>
  )
}

export default Input
