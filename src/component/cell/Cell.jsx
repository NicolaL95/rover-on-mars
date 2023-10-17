import React from 'react'

export default function Cell({tmpContent,hasRover}) {
  return (
    <div style={{border: "1px solid black", color: hasRover ? "black" : "white"}}>{tmpContent}</div>
  )
}
