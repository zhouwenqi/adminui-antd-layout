import type { CollapsedPanelProps } from "./typings"
import {Button, theme } from 'antd'
import styles from "./index.module.css"
import { useMainContext } from "./MainContext";
import { ChevronLeft, ChevronRight, ListIndentDecrease,ListIndentIncrease } from "./SvgPanel"
const {useToken} = theme;

/**
 * Default collapsed button
 * @param props 
 * @returns 
 */
function CollapsedMenu(props:CollapsedPanelProps){
  const {style} = props
  const {collapsed,setCollapsed,layoutIcons} = useMainContext()
  const panelStyles:React.CSSProperties = {
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"center",
    width:"100%",
    height:style?.width,
    backgroundColor:"transparent"
  }
  const boxStyles:React.CSSProperties = {
    display:"flex",
    width:style?.width,
    height:"100%",    
    cursor:"pointer",
    justifyContent:"center",
    alignItems:"center"
  }

  const [leftIcon, rightIcon] = layoutIcons?.collapsedIcons?.slice(0, 2) || [    
    <ChevronRight />,
    <ChevronLeft />
  ]

  return(
    <div style={panelStyles}>
      <div style={boxStyles} onClick={()=>{setCollapsed(!collapsed)}}>
      { collapsed ? leftIcon : rightIcon }
      </div>
    </div>
  )
}

/**
 * Track collapsed button
 * @param props 
 * @returns 
 */
function CollapsedTrack(props:CollapsedPanelProps&{offset?:number,top?:boolean,flated?:boolean}){
  const {style,offset = 0, top } = props
  const {collapsed,setCollapsed,layoutIcons} = useMainContext()
  const { token } = useToken()

  let trackBox:React.CSSProperties = {
    right: "-14px"
  }
  let trackIconBox:React.CSSProperties = {  
    backgroundColor:style?.backgroundColor,
    border:`solid 1px ${token.colorBorderSecondary}`,
  }
  if(top){
    trackBox = {
        ...trackBox,
        right: "-12px",
        display:"initial"
    } 
    trackIconBox = {
        ...trackIconBox,
        width:"24px",
        height:"24px",
        borderRadius:"12px",
        transform: `translateY(${offset + 10}px)`
    }
  } 

  const [leftIcon, rightIcon] = layoutIcons?.collapsedIcons?.slice(0, 2) || [
    <ChevronRight />,
    <ChevronLeft />,      
  ]

  return(
    <div className={styles.collapsedTrack} style={trackBox} onClick={()=>{setCollapsed(!collapsed)}}>
      <div style={trackIconBox} className={styles.collapsedTrackButton}>
        {collapsed ? leftIcon :  rightIcon}
      </div>
    </div>
  )
}


/**
 * Mobile collapsed button
 * @param props 
 * @returns 
 */
function CollapsedMobileMenu(props:CollapsedPanelProps){
    const {collapsed,setCollapsed,layoutIcons} = useMainContext()
  
    const btnStyles:React.CSSProperties = {
        cursor:"pointer",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
    
    const [leftIcon, rightIcon] = layoutIcons?.mobileAsideIcons?.slice(0, 2) || [ 
      <ListIndentIncrease />,
      <ListIndentDecrease />
    ]

    return(
        <div className={styles.collapsedMobile}>
            <Button type="text" style={{...btnStyles,...props.style}} icon={ collapsed ? leftIcon : rightIcon} onClick={()=>{setCollapsed(!collapsed)}}></Button>            
        </div>
    )   
}

export {CollapsedMenu,CollapsedTrack,CollapsedMobileMenu}