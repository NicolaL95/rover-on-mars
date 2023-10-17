import React, { useState } from 'react'
import Button from '../../component/button/Button'
import RoverHub from '../roverHub/RoverHub'

export default function Homepage() {

    const [connected,setConnected] = useState(false)

  return (
    <>
    {connected ? 
    <RoverHub/>
    : 
    <Button click={()=>{setConnected(true)}}/> }

    </>
    
    
  )
}
