import { hexToRgbaString, useConfigState, useTheme } from "@adminui-dev/layout";
import { BrandMobilePanel, BrandPanel } from "./BrandPanel"
import styles from "./index.module.css"
import { HeaderToolbar } from "./ToolbarPanel"

import type { MenuProps } from 'antd';
import { Menu,Layout, ConfigProvider, theme as antdTheme } from 'antd'
import type { CSSProperties } from "react";
import { useNavigate } from "react-router";
import type { HeaderLayoutProps } from "./typings";
import { CollapsedMobileMenu } from "./CollapsedPanel";


const {Header} = Layout
const { useToken } = antdTheme

export default function(props:HeaderLayoutProps){  
    const {layoutConfig} = useConfigState()
    
    const {token} = useToken()
    const navigate = useNavigate()

    const onClick: MenuProps['onClick'] = (e) => {      
      navigate(e.key)
    }

    const borderColor = layoutConfig.headerTransparent || layoutConfig.headerBlur ? hexToRgbaString(token.colorBorderSecondary,0.6) : token.colorBorderSecondary
    const borderBottom = layoutConfig.hideBorder ? "0px" : "1px solid " + borderColor  
    const headTheme = layoutConfig.flated && layoutConfig.layoutType=="headMenu" ? "dark" : layoutConfig.theme == "dark" ? "dark" : "light"
    const menuTheme = (layoutConfig.flated && layoutConfig.layoutType=="headMenu") ? "dark" : "light"
    const menuBgColor = layoutConfig.flated && layoutConfig.layoutType=="headMenu" ? token.colorPrimary : token.colorBgContainer

    const layoutStyles:React.CSSProperties = {
        height:props.height+"px",
        lineHeight:props.height+"px"
    }

    let headMaskElement = <></>

    let headerBoxStyles = {
      ...layoutStyles,
      borderBottom:borderBottom,
      backgroundColor: layoutConfig.headerTransparent ? "transparent" : menuBgColor
    }
    if(layoutConfig.headerBlur){
      headerBoxStyles = {
        ...headerBoxStyles,
        backgroundColor: hexToRgbaString(menuBgColor,0.6),
        transform: "translateZ(0)",
        backdropFilter: "blur(8px)"
      }
    }
   
    let headerStyles:CSSProperties = {
      ...layoutStyles,
      fontSize:token.Menu?.iconSize,
      backgroundColor:"transparent",     
      flex:"none" 
    }
    
    let headerClasss = [styles.headerLayout]

    let brandPanel = <></>
    if (layoutConfig.layoutType == "headMenu"){
        headMaskElement = <div style={layoutStyles}></div>
        headerBoxStyles = {...headerBoxStyles,paddingInlineEnd:token.paddingXS+"px"}
        brandPanel = (<div className={styles.headerBrandBox} style={{width:layoutConfig?.asideWidth+"px"}}><BrandPanel collapsed={false} iconSize={token.Menu?.iconSize} hideTitle /></div>)
        headerClasss.push(styles.headerLayoutFixed)
    }else{
        headerBoxStyles = {...headerBoxStyles,paddingInline:token.paddingXS+"px"}        
        headerClasss.push(styles.headerLayoutSticky)
    }

    let mobileBrandPanel = <BrandMobilePanel>{props.title}</BrandMobilePanel>
    let mobileCollapsedMenu = <CollapsedMobileMenu iconSize={layoutConfig.compact ? 12 : 14} />
    const layoutBoxClasss=[styles.headerLayoutBox]
    if(!layoutConfig.flated){
      layoutBoxClasss.push(styles.round)
    }
    let algorithms = headTheme=="dark" ? [antdTheme.darkAlgorithm] : [antdTheme.defaultAlgorithm] 

    return(
        <>          
            {headMaskElement}
            <ConfigProvider theme={{algorithm:algorithms}}>
            <Layout className={headerClasss.join(" ")} style={headerStyles}>              
              <Header className={layoutBoxClasss.join(" ")} style={headerBoxStyles}>
                  {mobileCollapsedMenu}
                  {brandPanel}                  
                  {mobileBrandPanel}                  
                  <Menu
                      onClick={onClick}                    
                      defaultSelectedKeys={props.selectedKeys}
                      selectedKeys={props.selectedKeys}
                      mode="horizontal"
                      theme={menuTheme}
                      classNames={{root:styles.headerMenu}}
                      items={props.menuData || []}
                      />
                  <HeaderToolbar showAvatar={layoutConfig.avatarPosition == "rightTop"} />
              </Header>
            </Layout>
            </ConfigProvider>
        </>
    )
}
