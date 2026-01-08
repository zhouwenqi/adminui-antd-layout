import { useConfigState, } from "@adminui-dev/layout"
import type { ContainerProps, LayoutProps } from "@adminui-dev/layout"
import { useContainerOutlet } from "./MainContext"
import {theme} from "antd"
import type {} from "antd"
import { ROLE_CONTENT_FOOTER } from "./MainContext"
import styles from "./index.module.css"
import MainBreadcrumb from "./MainBreadcrumb"
const {useToken} = theme

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
    const {layoutConfig} = useConfigState()
    const {footer,title} = useContainerOutlet()
    let layoutStyles:React.CSSProperties = {}
    let mainStyles:React.CSSProperties = {
        flex:"none"
    }
    let contentStyles:React.CSSProperties = {
        borderRadius: layoutConfig.compact ? token.borderRadius : token.borderRadiusLG
    }

    // Container border,breadcrumb,title
    const hideBorder = props.hideBorder || layoutConfig.hideBorder
    const hideBreadcrumb = props.hideBreadcrumb || layoutConfig.hideBreadcrumb
    const hideTitle = props.hideTitle || layoutConfig.hideTitle

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

 

    const breadcrumbStyles = {
        margin:hideTitle ? "0 0 1rem" : "0px"
    }
    
    const breadcrumbPanel =  hideBreadcrumb ? <></> : <MainBreadcrumb style={breadcrumbStyles} />
    const titlePanel = hideTitle ? <></> : <h3>{ props.title || title}</h3>   

    contentStyles = {
        ...contentStyles,
        ...props.style
    } 

    const hideFooter = props.hideFooter || layoutConfig.hideFooter
    let footerPanel =  !hideFooter && props.children ? <footer>{footer}</footer> : <></>
    return(
        <div className={styles.containerBox} style={layoutStyles}>
            {breadcrumbPanel}
            {titlePanel}
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