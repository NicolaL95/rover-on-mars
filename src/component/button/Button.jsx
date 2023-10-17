import React from 'react'

export default function Button({click,label="test"}) {
  return (
    <><button onClick={click}>{label}</button></>
  )
}
