import React, { useEffect, useState } from 'react'
import { Button, Input } from '../primitives'
import copy from 'clipboard-copy'
import Utils from './Utils'

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

Input.Search = ({ onSearch = x => x, ...p }) => {
  const [search, setSearch] = useState('')

  const debouncedSearchTerm = Utils.useDebounce(search, 500)
  useEffect(() => {
    onSearch(search)
  }, [debouncedSearchTerm])

  return (
    <Input
      placeholder="Search..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  )
}

export default Input
