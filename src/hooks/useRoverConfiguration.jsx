import { useMemo, useState } from "react";

export const useRoverConfiguration = (nOfCells, obstacles) => {

    const configureRoverInfoAndCommands = useMemo(() => {

        let orientation = Math.floor(Math.random() * 4)
        const orientationList = ["n", "e", "s", "o"]
        let x = 0
        let y = 0
        let tmpY = 0
        let tmpX = 0

        const handleSpherePlanet = (value, ACTION) => {
            switch (orientationList[orientation]) {
                case "n":
                    if (ACTION === "INCREMENT") value = value === 0 ? nOfCells - 1 : value - 1;
                    else value = value === nOfCells - 1 ? 0 : value + 1;
                    break;
                case "s":
                    if (ACTION === "INCREMENT")   value = value === 0 ? nOfCells - 1 : value - 1;
                    else   value = value === nOfCells - 1 ? 0 : value + 1;
                    break;
                case "e":
                    if (ACTION === "INCREMENT") value = value === nOfCells - 1 ? 0 : value + 1;
                    else value = value === 0 ? nOfCells - 1 : value - 1;
                    break;
                case "o":
                    if (ACTION === "INCREMENT") value = value === 0 ? nOfCells - 1 : value - 1;
                    else value = value === nOfCells - 1 ? 0 : value + 1;
                    break;
            }
            return value
        }

        const updateRoverPosition = (command) => {
            switch (orientationList[orientation]) {
                case "n":
                    tmpY = command === "forward" ? handleSpherePlanet(tmpY, "INCREMENT") : handleSpherePlanet(tmpY, "DECREMENT")
                    break;
                case "s":
                    tmpY = command === "forward" ? handleSpherePlanet(tmpY, "DECREMENT") : handleSpherePlanet(tmpY, "INCREMENT")
                    break;
                case "e":
                    tmpX = command === "forward" ? handleSpherePlanet(tmpX, "INCREMENT") : handleSpherePlanet(tmpX, "DECREMENT")
                    break;
                case "o":
                    tmpX = command === "forward" ? handleSpherePlanet(tmpX, "INCREMENT") : handleSpherePlanet(tmpX, "DECREMENT")
                    break;
            }
        }

        const updateRoverOrientation = (command) => {
            orientation = command === "right" ?
                orientation === orientationList.length - 1 ? 0 : orientation + 1
                :
                orientation === 0 ? orientationList.length - 1 : orientation - 1
        }

        const getRoverInitialPosition = (() => {
            let gettingPosition = true

            while (gettingPosition) {
                x = Math.floor(Math.random() * nOfCells)
                y = Math.floor(Math.random() * nOfCells)


                if (!obstacles.some(obstacle => obstacle.x === x && obstacle.y === y)) gettingPosition = false

            }

            return { x, y, z: orientationList[orientation] }

        })

        const useRoverApi = () => {
            const [data, setData] = useState({x,y,z:orientationList[orientation]});

            const shiftRover = (commandList) => {
                for (const iterator of commandList) {
                    tmpY = y
                    tmpX = x
                    switch (iterator.toLowerCase()) {
                        case "f":
                            updateRoverPosition("forward");
                            break;
                        case "b":
                            updateRoverPosition("back");
                            break;
                        case "r":
                            updateRoverOrientation("right")
                            break;
                        case "l":
                            updateRoverOrientation("left")
                            break;
                        default:
                            break;
                    }
                    if(obstacles.some(element => element?.x === tmpX && element?.y === tmpY)) {console.log('block')
                     break} 
                    else{
                        x = tmpX
                        y = tmpY
                    }
                }
                setData({ x, y, z: orientationList[orientation] })
            }

            return [data, shiftRover]

        }

        return { useRoverApi, roverInfo: getRoverInitialPosition() }

    }, [])

    return configureRoverInfoAndCommands;
}