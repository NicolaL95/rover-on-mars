import React, { useEffect, useState } from 'react'
import Cell from '../cell/Cell'
import { useRoverConfiguration } from '../../hooks/useRoverConfiguration'
import { generateObstale } from '../../utils/generateObstacle'

export default function Planet({ nOfCells }) {

    const [grid, setGrid] = useState([])
    const obstacles = generateObstale(nOfCells)
    const {useRoverApi , roverInfo} = useRoverConfiguration(nOfCells,obstacles);

    useEffect(() => {
        const tmpState = []
        

        console.log(roverInfo,obstacles)

        for (let indexRow = 0; indexRow < 10; indexRow++) {
            tmpState.push([])

            for (let indexCol = 0; indexCol < 10; indexCol++) {
                tmpState[indexRow].push(<Cell hasRover={indexRow === roverInfo.x && indexCol === roverInfo.y} tmpContent={`${indexRow} ${indexCol}`} />)

            }
        }
        setGrid(tmpState)


    }, [])

    


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
