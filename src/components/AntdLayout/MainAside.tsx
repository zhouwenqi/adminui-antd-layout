import { useNavigate,useMatches } from "react-router"
import React, { useState, useRef } from 'react'
import type {ReactNode} from 'react'
import type { MenuProps,SubMenuProps } from 'antd'
import { Menu, Layout,theme,Grid } from 'antd'
import { hexToRgbaString, useConfigState } from "@adminui-dev/layout"
import styles from "./index.module.css"
import type { AsideLayoutProps } from "./typings"
import { BrandAsidePanel, LargeBrandPanel } from "./BrandPanel"
import { useMainContext } from "./MainContext"
import { CollapsedMenu, CollapsedTrack } from "./CollapsedPanel"
import { AvatarPanel } from "./AvatarPanel"

const {Sider} = Layout
const {useToken} = theme;
const { useBreakpoint } = Grid

/**
 * AsideBar
 * 
 * Side sliding surface version, usually on the left side, with the parent container based on grid layout
 * @returns 
 */
export default function(props:AsideLayoutProps){
    const defaultOpenKeysRef = useRef<string[]>([]);
    defaultOpenKeysRef.current = props.openerKeys || [];
    const [openKeys, setOpenKeys] = useState(props.openerKeys);
    const {layoutConfig} = useConfigState()  

    const {asideWidth} = layoutConfig
    const asideCollapsedWidth = props.headerHeight
    const {collapsed,setCollapsed} = useMainContext()
    const { token } = useToken()
    const navigate = useNavigate()  
    const breakpoint = useBreakpoint()

    const collaspedWidth = breakpoint.xs ? 0 : asideCollapsedWidth   

    // border style
    const borderColor = layoutConfig.headerTransparent || layoutConfig.headerBlur ? hexToRgbaString(token.colorBorderSecondary,0.6) : token.colorBorderSecondary
    const borderRight = layoutConfig.hideBorder || (collaspedWidth == 0 && collapsed) ? "0px" : "1px solid " + borderColor

    // sider size
    const siderTop = layoutConfig.layoutType=="headMenu" ? props.headerHeight : 0
    const siderHeight = layoutConfig.layoutType == "headMenu" ? "calc(100% - " + props.headerHeight + "px)" : "100%"
    let siderStyles:React.CSSProperties = {            
        width: `${layoutConfig.asideWidth}px`,    
        height: `${siderHeight}`,  
        insetBlockStart: siderTop + "px",
        maxWidth: `${layoutConfig.asideWidth}px`,
        minWidth: `${layoutConfig.asideWidth}px`,
        borderRight: borderRight,
        position: "fixed",
        transition:'width 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    }

    // menu style
    let menuStyle:React.CSSProperties = {
      border:"0",
      background:"transparent",
      position: "relative",
      minHeight: "100%"
    }

    let menuBoxStyle:React.CSSProperties= {
      overflow: "auto",
      flex:1  
    }
  
    const iconSize = token.Menu?.iconSize

    // theme
    const menuTheme = layoutConfig.theme == "dark" ? "dark" : "light"    
    const siderTheme = menuTheme

    // collapsed button
    let collapsedBtnTop = 0
    let brandPanel = <></>
    if(layoutConfig.layoutType=="leftMenu"){
      collapsedBtnTop = layoutConfig.headerHeight || 0           
      brandPanel = layoutConfig.largeBrand ? <LargeBrandPanel collapsed={collapsed} iconSize={iconSize} /> : <BrandAsidePanel collapsed={collapsed} iconSize={iconSize} hideTitle />
    }
    const menuBgColor = layoutConfig.asideTransparent ? "transparent" : ( layoutConfig.asideBlur ? hexToRgbaString(token.colorBgContainer,0.6) : token.colorBgContainer )
    // sider transparent or blur
    siderStyles = {
      ...siderStyles,      
      backgroundColor: menuBgColor
    }
    if(layoutConfig.asideBlur){
      siderStyles = {
        ...siderStyles,
        transform: "translateZ(0)",
        backdropFilter: "blur(8px)"
      }
    }

    if(collapsed){
      menuBoxStyle = {
        ...menuBoxStyle,
        overflow:"hidden"
      }
    }

    // menu navigate event
    const onClick: MenuProps['onClick'] = (e) => {
      navigate(e.key)
    }

    let siderClassNames = [styles.siderBaseStyle]
    siderClassNames.push(styles.layoutBlur) 

    // collapsed button
    let collapsedMenu = <></>
    switch(layoutConfig.collapsedPosition){
      case "bottom":
        collapsedMenu = <CollapsedMenu iconSize={iconSize} style={{backgroundColor:menuBgColor,width:`${asideCollapsedWidth}px`,borderRight:borderRight}}  />
        break
      case "center":
      case "top":
        collapsedMenu = <CollapsedTrack iconSize={12} top={layoutConfig.collapsedPosition=="top"} flated={layoutConfig.flated} offset={collapsedBtnTop} style={{backgroundColor:menuBgColor}} />
        break
        default:
    }

    // menu group
    let menuData = props.menuData || []
    if(layoutConfig.asideMenuGroup){
      menuData.forEach((item)=>{
        if(item.children){
          item.type="group"
        }
      })
    }

    return(
        <>
            <div
              style={{
              width: collapsed ? asideCollapsedWidth : asideWidth,
              flex: `0 0 ${collapsed ? asideCollapsedWidth : asideWidth}px`,
              maxWidth: collapsed ? asideCollapsedWidth : asideWidth,
              minWidth: collapsed ? asideCollapsedWidth : asideWidth,
              transition:
                'background-color 0.3s, min-width 0.3s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
            }} className={styles.siderMask}></div>
              <Sider 
                  width={asideWidth}
                  className={siderClassNames.join(' ')} 
                  style={siderStyles}
                  theme={siderTheme}
                  collapsedWidth={collaspedWidth}                
                  collapsible
                  trigger={null}
                  breakpoint={"md"}
                  collapsed={collapsed}
                  onCollapse={setCollapsed}
                  >
                  { collaspedWidth > 0 ? brandPanel : <></>}                   
                  { props.header }
                  <div style={menuBoxStyle}> 
                      <Menu
                          onClick={onClick}     
                          onOpenChange={(e) => {   
                            setOpenKeys(e)
                          }}                   
                          style={menuStyle}
                          mode={layoutConfig.asideMenuInline ? "inline" : "vertical"}
                          selectedKeys={props.selectedKeys} 
                          openKeys={ collapsed ? undefined : openKeys} 
                          defaultSelectedKeys={props.selectedKeys}
                          defaultOpenKeys={defaultOpenKeysRef.current}
                          theme={menuTheme}
                          items={menuData}
                          />
                  </div>
                  { props.footer }
                  {layoutConfig.avatarPosition  == "leftBottom" ? <AvatarPanel collapsed={collapsed} iconSize={iconSize} /> : <></>}
                  {collapsedMenu}
              </Sider>
        </>
    )
}

