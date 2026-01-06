import { theme,Button, Popover } from "antd"
import styles from "./index.module.css"
import { useConfigState } from "@adminui-dev/layout"
import { ChevronsUpDown } from "./SvgPanel"
import React, { useState } from "react"
import type { BrandPanelProps } from "./typings"
import { LazyImage } from "./ImagePanel"
import { createBrandPopoverContext, ROLE_BRAND_POPOVER_CONTENT, useMainContext } from "./MainContext"
import { ToolbarIcon } from "./IconPanel"
const {useToken} = theme

/**
 * Normal brand panel
 * @param props 
 * @returns 
 */
function BrandPanel(props:BrandPanelProps){
    const { collapsed,iconSize,hideTitle } = props
    const {layoutConfig} = useConfigState()
    const {token} = useToken()
    const {layoutIcons,brandPopoverContent} = useMainContext()
    const [open,setOpen] = useState<boolean>(false)
    const BrandPopoverContext = createBrandPopoverContext()
    const logoSize = layoutConfig.compact ? "16px" : "20px"
    let linkStyles:React.CSSProperties = {      
        justifyContent:"flex-start",
        paddingInline: layoutConfig.compact ? token.paddingXXS : token.paddingXS,        
        height: "40px",
        gap:`${layoutConfig.compact ? 6 : 8 }px`
    }
    let panelStyles:React.CSSProperties = {
        height:`${layoutConfig.headerHeight}px`
    }
    let itemStyles:React.CSSProperties = { 
        boxSizing:"border-box", 
        display:"flex",
        flex:"1",
        gap:"6px", 
        width:"100%",
        textAlign:"left",
        alignItems:"center"
    }
    if(layoutConfig.flated){
        linkStyles = {
            ...linkStyles,
            paddingInline:token.padding,
            height:"100%"
        }
        panelStyles = {
            ...panelStyles,
            padding:"0px"
        }
    }
    const {brandInfo} = layoutConfig    
    
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

    let logoElement:React.ReactNode = <></>
    if(brandInfo?.logo){
        if(typeof brandInfo.logo == "string"){
            logoElement = <LazyImage style={{ width:logoSize}} src={brandInfo.logo} alt={brandInfo.name} />
        }else{
            logoElement = <div className={styles.brandNodeBox} style={{width:logoSize}}>{brandInfo.logo}</div>
        }
    }
    const moreIcon = layoutIcons?.itemMoreIcon || <ChevronsUpDown /> 
    const btnPanel = (<Button type="text" style={linkStyles} iconPlacement="end" icon={ brandPopoverContent ? <ToolbarIcon icon={moreIcon} size={iconSize || 14} style={{opacity:collapsed ? "0" : "1"}} /> : undefined}>
                <div style={itemStyles}>
                    {logoElement}    
                    <div className={styles.labelBox} style={{opacity:collapsed ? "0" : "1"}}>
                        <h4>{brandInfo?.name}</h4>                    
                        {hideTitle ? undefined : <span style={{color:token.colorTextSecondary}}>{brandInfo?.title}</span>}
                    </div>
                </div>
            </Button>)

    return(
        <div className={styles.brandPanel} style={panelStyles}>
            {brandPopoverContent ? <BrandPopoverContext.Provider value={{close:()=>{setOpen(false)},record:brandInfo}}><Popover open={open} onOpenChange={setOpen} placement="rightTop" content={brandPopoverContent}>{btnPanel}</Popover></BrandPopoverContext.Provider> : btnPanel}
        </div>
    )
}

/**
 * Aside brand panel
 * @param props 
 * @returns 
 */
function BrandAsidePanel(props:BrandPanelProps){
    const { collapsed,iconSize,hideTitle } = props
    const {layoutConfig} = useConfigState()
    const {layoutIcons,brandPopoverContent} = useMainContext()
    const {token} = useToken()
    const [open,setOpen] = useState<boolean>(false)
    const BrandPopoverContext = createBrandPopoverContext()
    const logoSize = layoutConfig.compact ? "16px" : "20px"
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
        }
        panelStyles = {
            ...panelStyles,
            padding:"0px"
        }
        
    }
    const {brandInfo} = layoutConfig
    
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

    let logoElement:React.ReactNode = <></>
    if(brandInfo?.logo){
        if(typeof brandInfo.logo == "string"){
            logoElement = <LazyImage style={{ width:logoSize}} src={brandInfo.logo} alt={brandInfo.name} />
        }else{
            logoElement = <div className={styles.brandNodeBox} style={{width:logoSize}}>{brandInfo.logo}</div>
        }
    }

    const moreIcon = layoutIcons?.itemMoreIcon || <ChevronsUpDown />
    const linkProps = brandPopoverContent ? {} : { href:brandInfo?.url}
    const linkPanel = (<a {...linkProps} style={linkStyles}>
                <div style={itemStyles}>
                    {logoElement}    
                    <div className={styles.labelBox} style={{opacity:collapsed ? "0" : "1"}}>
                        <h4 style={{width:"90%"}}>{brandInfo?.name}</h4>                    
                        {hideTitle ? undefined : <span style={{color:token.colorTextSecondary,width:"90%"}}>{brandInfo?.title}</span>}
                    </div>
                </div>
                {brandPopoverContent ? (<div style={{opacity:collapsed ? "0" : "1",display:"flex",placeItems:"center"}}>
                    <ToolbarIcon icon={moreIcon} size={iconSize || 14} />
                </div>) : <></>} 
            </a>)
    return(
        <div className={styles.brandPanel} style={panelStyles}>
            {brandPopoverContent ? <BrandPopoverContext.Provider value={{close:()=>{setOpen(false)},record:brandInfo}}><Popover open={open} onOpenChange={setOpen} placement="rightTop" content={brandPopoverContent}>{linkPanel}</Popover></BrandPopoverContext.Provider> : linkPanel}
        </div>
    )
}

/**
 * Mobile brand panel
 * @param props 
 * @returns 
 */
function BrandMobilePanel(props:BrandPanelProps){
    const {layoutConfig} = useConfigState()    
    const {brandPopoverContent} = useMainContext()
    const [open,setOpen] = useState<boolean>(false)
    const BrandPopoverContext = createBrandPopoverContext()
    const logoSize = layoutConfig.compact ? "16px" : "20px"
    const {brandInfo} = layoutConfig

    let logoElement:React.ReactNode = <></>
    if(brandInfo?.logo){
        if(typeof brandInfo.logo == "string"){
            logoElement = <LazyImage style={{ width:logoSize}} src={brandInfo.logo} alt={brandInfo.name} />
        }else{
            logoElement = <div className={styles.brandNodeBox} style={{width:logoSize}}>{brandInfo.logo}</div>
        }
    }

    let navElement = brandPopoverContent ? <BrandPopoverContext.Provider value={{close:()=>{setOpen(false)},record:brandInfo}}><Popover open={open} onOpenChange={setOpen} content={brandPopoverContent} placement="rightTop"><a>{logoElement}</a></Popover></BrandPopoverContext.Provider> : (<a href={brandInfo?.url}>{logoElement}</a>)

    return(
        <div className={styles.brandMobilePanel} style={props.style}>
            {navElement}
            <div className={styles.headerTitle}>
                {props.children}
            </div>
        </div>
    )
}

/**
 * Large brand panel
 * @param props 
 * @returns 
 */
function LargeBrandPanel(props:BrandPanelProps){
    const {collapsed} = props
    const {brandPopoverContent} = useMainContext()
    const {layoutConfig} = useConfigState()    
    const [open,setOpen] = useState<boolean>(false)
    const BrandPopoverContext = createBrandPopoverContext()
    const logoSize = collapsed ? (layoutConfig.compact ? "16px" : "20px") : (layoutConfig.compact ? "56px" : "64px")
    const {brandInfo} = layoutConfig
    
    const textBoxStyles:React.CSSProperties = {
        opacity: collapsed ? "0" : "1",
        height: collapsed ? "0px" : "auto",
    }
  
    let logoElement:React.ReactNode = <></>
    if(!brandInfo){
        return<></>
    }
    let boxClasss=[styles.largeBrandPanel]
    if(collapsed){        
        boxClasss.push(styles.largeBrandCollPanel)
        
    }
    if(brandInfo?.logo){
        if(typeof brandInfo.logo == "string"){
            logoElement = <LazyImage style={{ width:logoSize}} src={brandInfo.logo} alt={brandInfo.name} />
        }else{
            logoElement = <div className={styles.brandNodeBox} style={{width:logoSize}}>{brandInfo.logo}</div>
        }
    } 

    let navElement = brandPopoverContent ? <BrandPopoverContext.Provider value={{close:()=>{setOpen(false)},record:brandInfo}}><Popover open={open} onOpenChange={setOpen} content={brandPopoverContent} placement="rightTop"><a>{logoElement}</a></Popover></BrandPopoverContext.Provider> : (<a href={brandInfo?.url}>{logoElement}</a>)

    return(
        <div className={boxClasss.join(" ")} >
            {navElement}
            <div style={textBoxStyles}>
                <span>{brandInfo?.name}</span>
                {brandInfo.title ?<span className={styles.title}>{brandInfo?.title}</span> : <></>}
            </div>            
        </div>
    )
}

function BrandPopoverContent(props:React.HTMLAttributes<HTMLDivElement>){
    return(
        <div style={{...props.style}}>
            {props.children}
        </div>
    )
}
BrandPopoverContent.displayName = "BrandPopoverContent"
BrandPopoverContent.role = ROLE_BRAND_POPOVER_CONTENT

export {BrandPanel,BrandAsidePanel,BrandMobilePanel,LargeBrandPanel,BrandPopoverContent}