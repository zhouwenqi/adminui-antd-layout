import { ROLE_SOLT_CONTENT} from "./MainContext"
interface SlotPanelProps {
  children?: React.ReactNode
}
/**
 * Solt - layout
 * @param props 
 * @returns 
 */
function SoltPanel({ children }: SlotPanelProps){
    return(
        <>
        {children}
        </>
    )
}
SoltPanel.displayName = "SoltContent"
SoltPanel.role = ROLE_SOLT_CONTENT

export {SoltPanel}