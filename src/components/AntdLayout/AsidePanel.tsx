
import { useConfigState } from "@adminui-dev/layout"
import styles from "./index.module.css"
import { ROLE_ASIDE_CONTENT_ITEM, ROLE_ASIDE_CONTENT_ITEMS, ROLE_ASIDE_FOOTER, ROLE_ASIDE_HEADER, useMainCollapsed } from "./MainContext"

function AsideContentItem(props:React.HTMLAttributes<HTMLDivElement> & {icon?:React.ReactNode}){
    const collapsed = useMainCollapsed()    
    const {layoutConfig} = useConfigState()
    const logoSize = layoutConfig.compact ? "16px" : "20px"
    let boxStyles:React.CSSProperties = {      
        justifyContent:"flex-start",
        paddingInline: layoutConfig.compact ? "14px" : "16px",
        marginInline: "4px",
        marginBlock: "4px",
        gap:`${layoutConfig.compact ? 6 : 8 }px`
    }
    if(collapsed){        
        boxStyles = {
            ...boxStyles,    
            paddingInline:`calc(50% - calc(${logoSize} / 2))`,            
        }
    }
    if (!props.icon &&  collapsed){
        return <></>
    }
    return(       
        <div className={styles.siderContentItem} style={boxStyles}><div>{props.icon}</div><div style={{opacity: collapsed ? "0" : "1"}}>{props.children}</div></div>
    )
}
function AsideContentItems(props:React.HTMLAttributes<HTMLDivElement>){
    return(
        <>{props.children}</>
    )
}
function AsideFooter(props:React.HTMLAttributes<HTMLDivElement>){
    return(
        <div className={styles.siderContentBox}>{props.children}</div>
    )
}
function AsideHeader(props:React.HTMLAttributes<HTMLDivElement>){
    return(
        <div className={styles.siderContentBox}>{props.children}</div>
    )
}
AsideContentItems.displayName = "AsideContentItems"
AsideContentItem.displayName = "AsideContentItem"

AsideHeader.displayName = "AsideHeaderContent"
AsideHeader.Items = AsideContentItems
AsideHeader.Item = AsideContentItem

AsideFooter.displayName = "AsideFooterContent"
AsideFooter.Items = AsideContentItems
AsideFooter.Item = AsideContentItem

AsideFooter.role = ROLE_ASIDE_FOOTER
AsideHeader.role = ROLE_ASIDE_HEADER
AsideContentItems.role = ROLE_ASIDE_CONTENT_ITEMS
AsideContentItem.role = ROLE_ASIDE_CONTENT_ITEM

export { AsideContentItem,AsideContentItems,AsideHeader,AsideFooter}