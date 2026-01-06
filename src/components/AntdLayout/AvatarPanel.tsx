import { Popover, theme } from "antd"
import styles from "./index.module.css"
import { useConfigState } from "@adminui-dev/layout"
import { ChevronsUpDown, User} from "./SvgPanel"
import React, { useState } from "react"
import type { AvatarPanelProps } from "./typings"
import { LazyImage } from "./ImagePanel"
import { createAvatarPopoverContext, ROLE_AVATAR_POPOVER_CONTENT, useMainContext } from "./MainContext"
import { ToolbarIcon } from "./IconPanel"
const {useToken} = theme

/**
 * Avatar for panel
 * @param props 
 * @returns 
 */
function AvatarPanel(props:AvatarPanelProps){
    const { collapsed,iconSize } = props    
    const {layoutConfig} = useConfigState()
    const {layoutIcons,avatarPopoverContent} = useMainContext()
    const [open,setOpen] = useState<boolean>(false)
    const AvatarPopoverContext = createAvatarPopoverContext()
    const {token} = useToken()
    const logoSize = layoutConfig.compact ? "20px" : "24px"
    let linkStyles:React.CSSProperties = {      
        justifyContent:"flex-start", 
        gap:`${layoutConfig.compact ? 6 : 8 }px`
    }
    let panelStyles:React.CSSProperties = {
        height:`${layoutConfig.headerHeight}px`,   
    }
    let itemStyles:React.CSSProperties = { 
        boxSizing:"border-box", 
        display:"flex",
        flex:"1",
        gap:"6px", 
        width:"100%",
        alignItems:"center"
    }
    if(layoutConfig.flated){
        linkStyles = {
            ...linkStyles,
            paddingInline:token.padding,
            margin:"0px",
            height:"100%"
        }
        panelStyles = {
            ...panelStyles,
            padding:"0px"
        }
    }
    const {userInfo} = layoutConfig    
    
    if(collapsed){        
        linkStyles = {
            ...linkStyles, 
            paddingInline:`calc(50% - calc(${logoSize} / 2))`, 
        }
    } else{
        itemStyles = {
            ...itemStyles, 
            overflow: "hidden",
        }
    }   

    let faceElement:React.ReactNode = <></>
    if(userInfo?.avatar){
        if(typeof userInfo.avatar == "string"){            
            faceElement = <LazyImage style={{ width:logoSize,borderRadius:"999px"}} src={userInfo.avatar} alt={userInfo.uid} />
        }else{
            faceElement = userInfo.avatar
        }
    }

    const moreIcon = layoutIcons?.itemMoreIcon || <ChevronsUpDown />
    const panel = (
        <div className={styles.avatarPanel} style={panelStyles}>
            <a style={linkStyles}>
                <div style={itemStyles}>
                    {faceElement}    
                    <div className={styles.labelBox} style={{opacity:collapsed ? "0" : "1"}}>
                        <h4>{userInfo?.uid}</h4>                    
                        {userInfo?.title ? undefined : <span style={{color:token.colorTextSecondary}}>{userInfo?.title}</span>}
                    </div>
                </div>
                {avatarPopoverContent ? <div style={{opacity:collapsed ? "0" : "1",display:"flex",placeItems:"center"}}>
                    {<ToolbarIcon icon={moreIcon} size={iconSize || 14} />}
                </div> : <></>}                                             
            </a>
        </div>
    )

    return avatarPopoverContent ? <AvatarPopoverContext.Provider value={{close:()=>setOpen(false),record:userInfo}}><Popover open={open} onOpenChange={setOpen} placement="right" content={avatarPopoverContent}>{panel}</Popover></AvatarPopoverContext.Provider> : panel
 
}

/**
 * Avatar for toolbar
 * @param props 
 * @returns 
 */
function AvatarToolbarItem(props:AvatarPanelProps){
    const { iconSize = 14 } = props   
    const {layoutConfig} = useConfigState()
    const {userInfo} = layoutConfig  
    const {avatarPopoverContent} = useMainContext()    
    const [open,setOpen] = useState<boolean>(false)
    const AvatarPopoverContext = createAvatarPopoverContext()
    let faceElement:React.ReactNode = <User />
    const size = iconSize + 4
    const faceStyles:React.CSSProperties = {
        width:`${size}px`,
        height:`${size}px`,
        overflow:"hidden",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",
    }
    
    if(userInfo?.avatar){
        if(typeof userInfo.avatar == "string"){            
            faceElement = <LazyImage style={{ width:size,borderRadius:"999px"}} src={userInfo.avatar} alt={userInfo.uid} />
        }else{
            faceElement = userInfo.avatar
        }
    }    
    const facePanel:React.ReactNode = <div className={styles.toolbarAvatarItem}><div style={faceStyles}>{faceElement}</div><span>{userInfo?.uid}</span></div>
    return avatarPopoverContent ? <AvatarPopoverContext.Provider value={{close:()=>setOpen(false),record:userInfo}}><Popover open={open} onOpenChange={setOpen} placement="left" content={avatarPopoverContent}>{facePanel}</Popover></AvatarPopoverContext.Provider> : <>{facePanel}</>
}

function AvatarPopoverContent(props:React.HTMLAttributes<HTMLDivElement>){
    return(
        <div style={{...props.style}}>            
            {props.children}
        </div>
    )
}

AvatarPopoverContent.displayName = "AvatarPopoverContent"
AvatarPopoverContent.role = ROLE_AVATAR_POPOVER_CONTENT

export {AvatarPanel,AvatarToolbarItem,AvatarPopoverContent}
