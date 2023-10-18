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

    useEffect(() => {
        const tmpState = []
        
        subscribe("sendCommands",(event)=>{
            setRoverData(event.detail)
        })
        

        for (let indexCol = 0; indexCol < 10; indexCol++) {
            tmpState.push([])

            for (let indexRow = 0; indexRow < 10; indexRow++) {
                tmpState[indexCol].push(<Cell roverPosition={roverInfo.z} coordinates={{x:indexRow,y:indexCol}} haveObstacle={obstacles.some(element => element?.x === indexRow && element?.y === indexCol)} hasRover={indexRow === roverInfo.x && indexCol === roverInfo.y} tmpContent={`y = ${indexCol} x = ${indexRow}`} />)

            }
        }
        setGrid(tmpState)


    }, [])

    useEffect(() => {

        const tmpState = []

        for (let indexCol = 0; indexCol < 10; indexCol++) {
            tmpState.push([])

            for (let indexRow = 0; indexRow < 10; indexRow++) {
                tmpState[indexCol].push(<Cell roverPosition={roverData.z} coordinates={{x:indexRow,y:indexCol}} haveObstacle={obstacles.some(element => element?.x === indexRow && element?.y === indexCol)} hasRover={indexRow === roverData.x && indexCol === roverData.y} tmpContent={`y = ${indexCol} x = ${indexRow}`} />)

            }
        }
        setGrid(tmpState)


    console.log(roverData)
    }, [roverData])
    

    


    const generateGrid = () =>{
        return(
        <div style={{display: "flex", flexDirection:"column"}}>
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
