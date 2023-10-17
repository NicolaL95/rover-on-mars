import { useMemo, useState } from "react";

export const useRoverConfiguration = (nOfCells,obstacles) =>{

    const configureRoverInfoAndCommands = useMemo(()=>{
        
        const orientation =  Math.floor(Math.random() * 4)
        const orientationList = ["n","e","s","o"]
        let x = 0
        let y = 0
        
        const getRoverInitialPosition = () =>{
            let gettingPosition = true
           
            while(gettingPosition){
                 x = Math.floor(Math.random() * nOfCells)
                 y = Math.floor(Math.random() * nOfCells)
                
        
                if(!obstacles.some(obstacle=>obstacle.x === x && obstacle.y === y)) gettingPosition = false
        
            }
        
            return {x,y,z: orientationList[orientation]}
                
        }
        
        const useRoverApi = ({commandList}) =>{
         const [data,setData] = useState(null);

        }
        
        return {useRoverApi , roverInfo : getRoverInitialPosition()}
        
    },[])

    return configureRoverInfoAndCommands;
}