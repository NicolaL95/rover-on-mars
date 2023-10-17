import React from 'react'

export default function Cell({tmpContent,hasRover,haveObstacle}) {
  return (
    <div style={{border: "1px solid black",width: "75px",height: "75px", backgroundColor: hasRover ? "red" : haveObstacle ? "yellow" :"white"}}>{tmpContent}</div>
  )
}
