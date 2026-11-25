import type React from "react"

const boxStyles:React.CSSProperties = {
    display:"flex",
    flexFlow:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    padding:"1rem",
    flex:1
}
const titleStyles:React.CSSProperties = {
    margin:"2px",
    padding:"2px"
}

/**
 * This is just a casual demo
 * @returns 
 */
export default function(){    
    return(
        <div style={boxStyles}>
            <h1 style={titleStyles}>Welcome to adminui.dev💖</h1>
            <h4 style={titleStyles}>This is a simple demonstration project built using "Vite" and "Antd-layout"</h4>
            <article>
                This page does not use container components and can be freely formatted. Wishing you a smooth journey in your development tasks🎉🎉🎉
            </article>
        </div>
    )
}