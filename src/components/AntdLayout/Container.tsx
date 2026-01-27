import { useConfigState, } from "@adminui-dev/layout"
import type { ContainerProps, LayoutProps } from "@adminui-dev/layout"
import { useContainerOutlet } from "./MainContext"
import {Divider, theme,Grid} from "antd"
import { ROLE_CONTENT_FOOTER } from "./MainContext"
import styles from "./index.module.css"
import MainBreadcrumb from "./MainBreadcrumb"
import { HeaderToolbar } from "./ToolbarPanel"
import { BrandMobilePanel } from "./BrandPanel"
import { CollapsedContainerMenu, CollapsedMobileMenu } from "./CollapsedPanel"

const {useToken} = theme
const { useBreakpoint } = Grid
/**
 * Container - layout
 * Recommend using this component comprehensively as the main content shell
 * @author zhouwenqi
 * @param props 
 * @returns 
 */
function Container(props:ContainerProps){
    const {mode = "inline",stretch="inline"} = props
    const {token} = useToken()
    const { xs } = useBreakpoint()
    const { layoutConfig } = useConfigState()
    const { footer,title } = useContainerOutlet()
    const { containerMargin = 0 } = layoutConfig
    let layoutStyles:React.CSSProperties = {}
    let mainStyles:React.CSSProperties = {
        flex:"none"
    }
    let contentStyles:React.CSSProperties = {
        borderRadius: layoutConfig.compact ? token.borderRadius : token.borderRadiusLG
    }
    let headerStyles:React.CSSProperties = {
        display:"flex",
    }    

    // Container border,breadcrumb,title
    const hideBorder = props.hideBorder || layoutConfig.hideBorder
    const hideBreadcrumb = props.hideBreadcrumb || layoutConfig.hideBreadcrumb
    const hideTitle = props.hideTitle || layoutConfig.hideTitle

    const noneHeader = layoutConfig.noneHeader && layoutConfig.layoutType=="leftMenu"

    // conainter style
    if(mode=="box" || mode=="panel"){
        layoutStyles = {
            padding:token.padding   
        }
        if(mode=="panel"){
            contentStyles = {
                ...contentStyles,
                padding:token.padding,                
                backgroundColor:token.colorBgContainer,
                
            }
            if(!hideBorder){
                contentStyles = {
                    ...contentStyles,
                    border:`solid 1px ${token.colorBorderSecondary}`
                }
            }
        }

    }

    // main style
    if(stretch == "fill" || stretch == "auto"){
        mainStyles = {
            ...mainStyles,
            flex:"auto"
        }
        if(stretch == "fill"){
            contentStyles = {
                ...contentStyles,
                minHeight:"100%"
            }
        }
    }

    if(noneHeader){
        layoutStyles = {
            ...layoutStyles,
            backgroundColor:token.colorBgContainer,
            borderRadius:containerMargin > 0 ? token.padding : `${token.padding}px 0px 0px ${token.padding}px`,
            padding:"0px",
            margin:containerMargin
        }

        headerStyles = {
            ...headerStyles,
            padding:token.paddingXS,
            borderBlockEnd:`solid 1px ${token.colorBorderSecondary} `
        }
    }
    
    const breadcrumbPanel =  hideBreadcrumb ? <></> : <MainBreadcrumb />
    const titlePanel = hideTitle ? <></> : <h3>{ props.title || title}</h3>   

    contentStyles = {
        ...contentStyles,
        ...props.style
    } 
    
    const mobileBrandPanel = noneHeader ? <BrandMobilePanel>{props.title || title}</BrandMobilePanel> : <></>
    const mobileCollapsedMenu = noneHeader ? <CollapsedMobileMenu iconSize={layoutConfig.compact ? 12 : 14} /> : <></>
    const containerCollapsedMenu = noneHeader && layoutConfig.collapsedPosition == "top" && !xs ? <><CollapsedContainerMenu iconSize={layoutConfig.compact ? 12 : 14} /><Divider orientation="vertical" /></> : <></>

    const hideFooter = props.hideFooter || layoutConfig.hideFooter
    const footerPanel =  !hideFooter && props.children && footer ? <footer>{footer}</footer> : <></>
    const toolbarPanel = noneHeader ? <HeaderToolbar showAvatar={layoutConfig.avatarPosition == "rightTop"} /> : <></>
    const headerPanel = noneHeader && xs ? <></> : (<div className={styles.contentHeaderMenu}>{breadcrumbPanel}{titlePanel}</div>)
    return(
        <div className={styles.containerBox} style={layoutStyles}>
            <div className={styles.containerHeader} style={headerStyles}>
                {mobileCollapsedMenu}
                {mobileBrandPanel} 
                {containerCollapsedMenu}
                {headerPanel}
                <div className={styles.containerHeaderToolbar}>
                    {toolbarPanel}                  
                </div>
            </div>            
            <main style={mainStyles}>
                <div style={contentStyles}>
                    {props.children}
                </div> 
            </main>
            {footerPanel}
        </div>
    )

}


const ContainerFooter=(props:LayoutProps)=>{
    return(
        <div {...props}>{props.children}</div>
    )
}
ContainerFooter.displayName = "ContentFooter"
ContainerFooter.role = ROLE_CONTENT_FOOTER

export { ContainerFooter }
export default Container