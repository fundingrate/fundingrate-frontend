import React from 'react'
import Utils from '../components/Utils'
import Editor from '../components/Editor'

export default ({actions}) => {
  return (
    <Editor getFunc={async () => {
      return actions.getTicker()
    }}/>
  )
}