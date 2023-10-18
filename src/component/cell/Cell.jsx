import React from 'react'
import "./Cell.css"
import rover from "../../assets/images/rover.png"
import rock from '../../assets/images/rock.png'
export default function Cell({tmpContent,hasRover,haveObstacle,coordinates,roverPosition}) {
  return (
    <div className={`cell-terrain ${coordinates.x === 0 && coordinates.y === 0 ? 'cell-angle-top-left' : coordinates.x === 9 && coordinates.y === 0 ? "cell-angle-top-right" : coordinates.x === 0 && coordinates.y === 9 ? "cell-angle-bottom-left" : coordinates.x === 9 && coordinates.y === 9 ? "cell-angle-bottom-right" : "" }`} 
    style={{position:"relative",border: "1px solid black",width: "75px",height: "75px", backgroundColor: hasRover ? "red" : haveObstacle ? "yellow" :"white"}}>
      {hasRover &&
       <img className={`${roverPosition === "e" ? "rover-orientation-east" : roverPosition === "s" ? "rover-orientation-sud" :roverPosition === "o" ? "rover-orientation-weast" : ""}`} src={rover} alt="rover" />
       }
      {haveObstacle &&
      <img src={rock} alt="rock"/>}
    </div>
  )
}
