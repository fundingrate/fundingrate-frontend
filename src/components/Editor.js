import React, { useState, useEffect } from 'react'



import brace from 'brace'
import 'brace/mode/json'
import 'brace/theme/monokai'
import AceEditor from 'react-ace'

import {Text} from '../primitives'

const Editor = ({ onConfirm, children, getFunc }) => {
  const [schema, setSchema] = useState({})
  const [match, setMatch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    if (getFunc) {
      getFunc()
        .then(schema => JSON.stringify(schema, null, 2))
        .then(schema => {
          setSchema(schema)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  return loading ? (
    <Text>Loading</Text>
  ) : (
    <AceEditor
      fontSize={14}
      width={'100%'}
      height={'100%'}
      name="editor"
      mode="json"
      theme="monokai"
      defaultValue={schema}
      value={match}
      onChange={match => setMatch(match)}
      editorProps={{ $blockScrolling: true }}
      tabSize={2}
    />
  )
}

export default Editor
