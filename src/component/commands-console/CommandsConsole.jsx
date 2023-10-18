import React, { useEffect, useRef, useState } from 'react'
import Button from '../button/Button'
import { publish } from '../../utils/event';
export default function CommandsConsole() {

    const [commandList, setCommandList] = useState([])
    const acceptedCommands = ["f","b","l","r"]
    const inputuRef = useRef(null);

    const handleInputClick = (event) => {
        if (event.key === "Enter" && acceptedCommands.includes(inputuRef.current.value)) {
            setCommandList(prevCommandList => [...prevCommandList, inputuRef.current.value])
        }
    }

    useEffect(() => {
      inputuRef.current.value = ""
    }, [commandList])
    

    const onSendCommands = () =>{
        setCommandList([])
        publish("sendCommands",commandList)
    }

    return (
        <div>
            <div>
                <input ref={inputuRef} onKeyDown={handleInputClick} type="text" name="command-prompt" />
                <Button label="add to query" click={() => { handleInputClick({ key: "Enter" }) }} />
                <Button label="clear query" click={()=>{setCommandList([])}}/>
            </div>
            <Button label="send commands" click={onSendCommands}/>
            <div style={{display:"flex"}}>
                {commandList.map((command, index) => {
                    return(
                       
                        <div style={{paddingRight: '2px',color:"white"}}>{command}</div>
                    )
                })}
            </div>
        </div>
    )
}
