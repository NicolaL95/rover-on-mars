import React from 'react'

export default function Button({click,customClass,label="test"}) {
  return (
    <><button className={customClass} onClick={click}>{label}</button></>
  )
}
