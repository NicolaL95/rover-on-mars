import React, { useState } from 'react'
import Button from '../../component/button/Button'
import RoverHub from '../roverHub/RoverHub'
import './Homepage.css'

export default function Homepage() {

  const [connected, setConnected] = useState(false)

  return (
    <div className='homepage-container'>
      {connected ?
        <RoverHub />
        :
        <>
        <h1 className='homepage-title'>Mars Rover Status</h1>
        <Button customClass="homepage-button" label="Start Connection:" click={() => { setConnected(true) }} />
         </>
      }

    </div>


  )
}
