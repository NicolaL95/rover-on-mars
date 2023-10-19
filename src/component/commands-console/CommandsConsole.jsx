import React, { useEffect, useRef, useState } from 'react'
import Button from '../button/Button'
import { publish } from '../../utils/event';
import "./CommandsConsole.css"
import { subscribe } from '../../utils/event';
import { useRoverConfiguration } from '../../hooks/useRoverConfiguration';

export default function CommandsConsole() {

    const [commandList, setCommandList] = useState([])
    const [orientation, setOrientation] = useState()
    useEffect(() => {
        
        subscribe("currentOrientation",(event)=>{
            setOrientation(event.detail) 
        })
    
    }, [])
    

    const removeLastElementFromCommandQuery = () => {
        if (commandList.length > 0) {
            const tmpstate = [...commandList]
            tmpstate.pop();
            setCommandList(tmpstate)
        }
    }

    const cancelQuery = () => {
        setCommandList([])
    }

    const injectCommandToConsole = (command) => {
        setCommandList(prevCommandList => [...prevCommandList, command])
    }

    const onSendCommands = () => {
        if (commandList.length > 0) {
            setCommandList([])
            publish("sendCommands", commandList)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "300px", width: "700px", backgroundColor: "#fffff8", marginTop: "20px", borderRadius: "15px", padding: "10px" }}>

            <div style={{ display: "flex", width: '100%', paddingBottom: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "50%", gap: "35px",justifyContent:"center" }}>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Button click={() => (injectCommandToConsole("F"))} customClass={"button-movment"} label='FORWARD' />
                        <Button click={() => (injectCommandToConsole("B"))} customClass={"button-movment"} label='BACK' />
                        <Button click={removeLastElementFromCommandQuery} customClass={"button-movment"} label='CANCEL' />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", }}>
                        <Button click={onSendCommands} customClass={"button-query-handle"} label='SEND QUERY' />
                        <Button click={cancelQuery} customClass={"button-query-handle"} label='CLEAR QUERY' />
                    </div>
                </div>
                <div style={{ display: "flex", width: "50%",flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
                    
                    <div style={{ display: "flex", flexDirection: "column", width: "75%", alignItems: "center", gap: "10px" }}>
                        <div>
                            <Button   customClass={`button-orientation-info ${orientation === "N" ? "button-orientation-info-current" : ""}`} label='NORD' />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Button   customClass={`button-orientation-info ${orientation === "O" ? "button-orientation-info-current" : ""}`} label='WEAST' />
                            <Button  customClass={`button-orientation-info ${orientation === "E" ? "button-orientation-info-current" : ""}`} label='EAST' />
                        </div>
                        <div>
                            <Button   customClass={`button-orientation-info ${orientation === "S" ? "button-orientation-info-current" : ""}`} label='SUD' />
                        </div>

                    </div>
                    <div style={{ height: "50%", width: "100%", display: "flex", justifyContent: "space-around",paddingTop:"20px" }}>
                        <Button click={() => (injectCommandToConsole("L"))} customClass={"button-orientation"} label='LEFT' />
                        <Button click={() => (injectCommandToConsole("R"))} customClass={"button-orientation"} label='RIGHT' />
                    </div>

                </div>
            </div>
            <div style={{ display: "flex", height: "300px", gap: "10px" }}>
                <div style={{ width: "100%", maxWidth: "100%", height: "100%",overflowX:"scroll", backgroundColor: "black",paddingLeft:"10px"}}>{commandList.map((element,index)=><span key={index} style={{paddingRight:"10px",fontSize:"1.5rem",color:"white"}}>{element}</span>)}</div>
            </div>




        </div>
    )
}
