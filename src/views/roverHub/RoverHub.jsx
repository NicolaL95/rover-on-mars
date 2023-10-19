import React from 'react'
import CommandsConsole from '../../component/commands-console/CommandsConsole'
import Planet from '../../component/planet/Planet'
function RoverHub() {
  return (
    <div>
        <Planet nOfCells={10}/>
        <CommandsConsole />
    </div>
  )
}

export default RoverHub