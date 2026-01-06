import { ROLE_SOLT_CONTENT} from "./MainContext"

/**
 * Solt - layout
 * @param props 
 * @returns 
 */
function SoltPanel(props:React.HTMLAttributes<HTMLDivElement>){
    return(
        <>
        {props.children}
        </>
    )
}
SoltPanel.displayName = "SoltContent"
SoltPanel.role = ROLE_SOLT_CONTENT

export {SoltPanel}