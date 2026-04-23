import { ROLE_SLOT_CONTENT} from "./MainContext"
interface SlotPanelProps {
  children?: React.ReactNode
}
/**
 * Slot - layout
 * @param props 
 * @returns 
 */
function SlotPanel({ children }: SlotPanelProps){
    return(
        <>
        {children}
        </>
    )
}
SlotPanel.displayName = "SlotContent"
SlotPanel.role = ROLE_SLOT_CONTENT

export {SlotPanel}