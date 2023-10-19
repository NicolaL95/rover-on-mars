import React from 'react'
import "./Cell.css"
import rover from "../../assets/images/rover.png"
import rock from '../../assets/images/rock.png'
import track from "../../assets/images/track.png"
export default function Cell({hasRover, haveObstacle, coordinates, roverPosition,pastTrack }) {

  return (
    <div className={`cell-terrain ${coordinates.x === 0 && coordinates.y === 0 ? 'cell-angle-top-left' : coordinates.x === 9 && coordinates.y === 0 ? "cell-angle-top-right" : coordinates.x === 0 && coordinates.y === 9 ? "cell-angle-bottom-left" : coordinates.x === 9 && coordinates.y === 9 ? "cell-angle-bottom-right" : ""}`}
      style={{ position: "relative", border: "1px solid black", width: "50px", height: "50px", backgroundColor: hasRover ? "red" : haveObstacle ? "yellow" : "white" }}>

      {pastTrack !== undefined && !hasRover &&
        <img className={`${pastTrack === "E" ? "rover-orientation-east" : pastTrack === "S" ? "rover-orientation-sud" : pastTrack === "O" ? "rover-orientation-weast" : ""}`} src={track} alt="rock" />}

      {hasRover &&
        <img className={`${roverPosition === "E" ? "rover-orientation-east" : roverPosition === "S" ? "rover-orientation-sud" : roverPosition === "O" ? "rover-orientation-weast" : ""}`} src={rover} alt="rover" />
      }
      {haveObstacle &&
        <img src={rock} alt="rock" />}
    </div>
  )
}
