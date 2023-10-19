import React from 'react'
import CommandsConsole from '../../component/commands-console/CommandsConsole'
import Planet from '../../component/planet/Planet'
function RoverHub() {
  return (
    <div style={{display:'flex',flexDirection:"column-reverse"}}>
      <div>
        <CommandsConsole />
      </div>
      <div>
        <Planet nOfCells={10} />
      </div>
    </div>
  )
}

export default RoverHub