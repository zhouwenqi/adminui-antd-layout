import { Breadcrumb } from "antd";
import { Link,useMatches } from "react-router";
import { useConfigState, type LayoutProps } from "@adminui-dev/layout";
import styles from "./index.module.css"
import { useMainContext } from "./MainContext";

function MainBreadcrumb(props:LayoutProps){
    const matches = useMatches()
    const { flattenMenuMap } = useMainContext()
    const { layoutConfig } = useConfigState()

    const breadcrumbItems:any[] = []
    matches.forEach((item,index)=>{
        const menuItem = flattenMenuMap[item.pathname]
        const label = menuItem ? menuItem.label : ""
        breadcrumbItems.push(
            {
                path:item.pathname,
                title:label,     
                icon:menuItem.icon       
            }
        )
    })
    let boxClass = [styles.breadcrumbBox]
    if(layoutConfig.visibleBreadcrumbIcon == "first"){
        boxClass.push(styles.breadcrumbFirstIcon)
    }else if(layoutConfig.visibleBreadcrumbIcon == "all"){
        boxClass.push(styles.breadcrumbAllIcon)
    }

    return(
        <Breadcrumb classNames={{"root":boxClass.join(" ")}} style={props.style} items={breadcrumbItems} itemRender={itemRender} />
    )
}

function itemRender(currentRoute:any, params:any, items:any, paths:any) { 
    const isLast = currentRoute?.path === items[items.length - 1]?.path   
    return isLast ? (
        <span className="adminui-breadcrumb-link">{currentRoute.icon}{currentRoute.title}</span>
    ) : (            
        <Link className="adminui-breadcrumb-link" to={"/" + paths[paths.length-1]}>{currentRoute.icon}{currentRoute.title}</Link>
    )
}

export default MainBreadcrumb