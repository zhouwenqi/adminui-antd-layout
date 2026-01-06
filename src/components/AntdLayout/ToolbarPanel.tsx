import { Button, Divider, theme } from "antd"
import styles from "./index.module.css"
import {Maximize,Minimize} from "./SvgPanel"
import { FullScreenButton } from "@adminui-dev/layout"
import type {LayoutProps} from  "@adminui-dev/layout"
import { ToolbarIcon } from "./IconPanel"
import { ROLE_TOOLBAR_EXTRA_ITEMS, useMainContext } from "./MainContext"
import { AvatarToolbarItem } from "./AvatarPanel";

const {useToken} = theme

/**
 * Toolbar for header
 * @author zhouwenqi
 * @param props 
 * @returns 
 */
function HeaderToolbar(props:LayoutProps&{showAvatar?:boolean}){
    const {token} = useToken()
    const { layoutIcons,toolbarExtraItems } = useMainContext()
    const iconSize = token.Menu?.iconSize || 16

    const [expandIcon, compressIcon] = layoutIcons?.fullScreenIcons?.slice(0, 2) || [
        <Maximize />,
        <Minimize />
    ]   
    const barExpandIcon = <ToolbarIcon icon = {expandIcon} size={iconSize} />
    const barCompressIcon = <ToolbarIcon icon = {compressIcon} size={iconSize} />

    return(
        <div className={styles.toolbarPanel}>
            {props.showAvatar ? (
            <div className={styles.toolbarItem}>
                <AvatarToolbarItem iconSize={iconSize + 4} />
                <Divider data-adminui-role="desk-toolbar" orientation="vertical" />
            </div>) : <></>}
            {toolbarExtraItems}
            <div className={styles.toolbarItem} data-adminui-role="desk-toolbar">                             
                <FullScreenButton buttons={[<Button key="minimize" icon={barCompressIcon} type="text"></Button>,<Button key="maximize" icon={barExpandIcon} type="text"></Button>]} />
            </div>
        </div>
    )
}

/**
 * Toolbar extra items
 * @param props 
 * @returns 
 */
function ToolbarExtraItems(props:React.HTMLAttributes<HTMLDivElement>){
    const panel = (
        <div className={styles.toolbarItem} data-adminui-role="desk-toolbar">
            {props.children}
        </div>
    )
    return props ? <>{panel}</> : <></>
    
}
ToolbarExtraItems.displayName = "ToolbarExtraItems"
ToolbarExtraItems.role = ROLE_TOOLBAR_EXTRA_ITEMS

export { HeaderToolbar,ToolbarExtraItems }