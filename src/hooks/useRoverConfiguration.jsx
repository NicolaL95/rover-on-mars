import { useMemo, useState } from "react";
import { publish } from "../utils/event";
export const useRoverConfiguration = (nOfCells, obstacles) => {

    const configureRoverInfoAndCommands = useMemo(() => {

        let orientation = Math.floor(Math.random() * 4)
        const orientationList = ["N", "E", "S", "O"]
        let x = 0
        let y = 0
        let tmpY = 0
        let tmpX = 0

        //update temporary rover x and y position
        const updateRoverPosition = (command) => {

            const handleDecreaseValue = (value) => { return value === 0 ? nOfCells - 1 : value - 1; }
            const handleIncreaseValue = (value) => { return value === nOfCells - 1 ? 0 : value + 1; }

            switch (orientationList[orientation]) {
                case "N":
                    tmpY = command === "FORWARD" ? handleDecreaseValue(tmpY) : handleIncreaseValue(tmpY)
                    break;
                case "E":
                    tmpX = command === "FORWARD" ? handleIncreaseValue(tmpX) : handleDecreaseValue(tmpX)
                    break;
                case "S":
                    tmpY = command === "FORWARD" ? handleIncreaseValue(tmpY) : handleDecreaseValue(tmpY)
                    break;
                case "O":
                    tmpX = command === "FORWARD" ? handleDecreaseValue(tmpX) : handleIncreaseValue(tmpX)
                    break;
                default:
                    break;
            }
        }
        //change rover orientation
        const updateRoverOrientation = (command) => {
            orientation = command === "RIGHT" ?
                orientation === orientationList.length - 1 ? 0 : orientation + 1
                :
                orientation === 0 ? orientationList.length - 1 : orientation - 1
        }
        // get starting rover position
        const getRoverInitialPosition = (() => {
            let gettingPosition = true

            while (gettingPosition) {
                x = Math.floor(Math.random() * nOfCells)
                y = Math.floor(Math.random() * nOfCells)


                if (!obstacles.some(obstacle => obstacle.x === x && obstacle.y === y)) gettingPosition = false

            }

            return { x, y, z: orientationList[orientation] }

        })
        //hook to simulate API
        const useRoverApi = () => {
            const [data, setData] = useState({ x, y, z: orientationList[orientation] });
       
                publish("currentOrientation", orientationList[orientation])


            const shiftRover = (commandList) => {
                setTimeout(() => {
                    let pastTrack = [{ x, y, z: orientationList[orientation] }];
                    for (const iterator of commandList) {
                        tmpY = y
                        tmpX = x
                        switch (iterator) {
                            case "F":
                                updateRoverPosition("FORWARD");
                                break;
                            case "B":
                                updateRoverPosition("BACK");
                                break;
                            case "R":
                                updateRoverOrientation("RIGHT")
                                break;
                            case "L":
                                updateRoverOrientation("LEFT")
                                break;
                            default:
                                break;
                        }
                        //if the rover find an obstacle exit from the loop and thow an error  
                        if (obstacles.some(element => element?.x === tmpX && element?.y === tmpY)) {
                            console.error(`obstacle reached at X: ${tmpX} Y:${tmpY}`);
                            break
                        }
                        //else the position is updated
                        else {
                            x = tmpX
                            y = tmpY
                            const isRoverRotate = pastTrack.findIndex(element => element.x === x && element.y === y)
                            if (isRoverRotate === -1) pastTrack.push({ x, y, z: orientationList[orientation] })
                            else pastTrack[isRoverRotate].z = orientationList[orientation]

                        }
                    }

                    setData({ x, y, z: orientationList[orientation], pastTrack })
                    publish("currentOrientation", orientationList[orientation])
                    pastTrack = []
                }, 500)
            }

            return [data, shiftRover]

        }

        return { useRoverApi, roverInfo: getRoverInitialPosition() }

    }, [])

    return configureRoverInfoAndCommands;
}