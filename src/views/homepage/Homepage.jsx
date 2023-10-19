import React, { useState } from 'react'
import Button from '../../component/button/Button'
import RoverHub from '../roverHub/RoverHub'
import './Homepage.css'
import Loader from '../../component/loader/Loader'

export default function Homepage() {

  const [connected, setConnected] = useState(false)
  const [loader,setLoader] = useState(true);

  const handleLoadingFinished = () => {
    setLoader(false);
};

  return (
    <div className='homepage-container'>
      {connected ?
        <>
        {loader ? 
        <Loader onFinished={handleLoadingFinished}/>
        :
        <RoverHub />
      }
        </>
        :
        <>
        <h1 className='homepage-title'>Mars Rover Status</h1>
        <Button customClass="homepage-button" label="Start Connection:" click={() => { setConnected(true) }} />
         </>
      }

    </div>


  )
}
