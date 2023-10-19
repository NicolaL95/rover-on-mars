import React, { useEffect, useMemo, useState } from 'react'
import Cell from '../cell/Cell'
import { useRoverConfiguration } from '../../hooks/useRoverConfiguration'
import { generateObstale } from '../../utils/generateObstacle'
import { subscribe } from '../../utils/event'

export default function Planet({ nOfCells }) {

    const [grid, setGrid] = useState([])
    let obstacles =useMemo(()=>{return generateObstale(nOfCells)},[]) 
    const {useRoverApi , roverInfo} = useRoverConfiguration(nOfCells,obstacles);
    const [roverData,setRoverData] = useRoverApi([]);

   const getElementPastTrack = (rover,x,y) =>{
       return rover.pastTrack?.find(element => element?.x === x && element?.y === y && element)?.z
    }

    useEffect(() => {
        const tmpState = []
        
        subscribe("sendCommands",(event)=>{
            setRoverData(event.detail)
        })
        

        for (let indexCol = 0; indexCol < nOfCells; indexCol++) {
            tmpState.push([])

            for (let indexRow = 0; indexRow < nOfCells; indexRow++) {
                tmpState[indexCol].push(<Cell pastTrack={getElementPastTrack(roverInfo,indexRow,indexCol)} roverPosition={roverInfo.z} coordinates={{x:indexRow,y:indexCol}} haveObstacle={obstacles.some(element => element?.x === indexRow && element?.y === indexCol)} hasRover={indexRow === roverInfo.x && indexCol === roverInfo.y} tmpContent={`y = ${indexCol} x = ${indexRow}`} />)

            }
        }
        setGrid(tmpState)


    }, [])

    useEffect(() => {

        const tmpState = []

        for (let indexCol = 0; indexCol < nOfCells; indexCol++) {
            tmpState.push([])

            for (let indexRow = 0; indexRow < nOfCells; indexRow++) {
                tmpState[indexCol].push(<Cell pastTrack={getElementPastTrack(roverData,indexRow,indexCol)} roverPosition={roverData.z} coordinates={{x:indexRow,y:indexCol}} haveObstacle={obstacles.some(element => element?.x === indexRow && element?.y === indexCol)} hasRover={indexRow === roverData.x && indexCol === roverData.y} tmpContent={`y = ${indexCol} x = ${indexRow}`} />)

            }
        }
        setGrid(tmpState)


    console.log(roverData)
    }, [roverData])
    

    


    const generateGrid = () =>{
        return(
        <div style={{display: "flex", flexDirection:"column",alignItems:"center",marginTop:"20px"}}>
                {grid.map((element, _) => {
                    return (<div style={{ display: 'flex' }} className='row'>
                       {element}
                    </div>)
                })}
            </div>
            )
    }

    return (
        <>
            {generateGrid()}
        </>
    )
}
