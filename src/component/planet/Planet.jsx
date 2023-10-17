import React, { useEffect, useState } from 'react'
import Cell from '../cell/Cell'

export default function Planet({ nOfCells }) {

    const [grid, setGrid] = useState([])

    useEffect(() => {
        const tmpState = []

        for (let indexRow = 0; indexRow < 10; indexRow++) {
            tmpState.push([])

            for (let indexCol = 0; indexCol < 10; indexCol++) {
                tmpState[indexRow].push(<Cell tmpContent={`${indexRow} ${indexCol}`} />)

            }
        }
        console.log(tmpState)

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
