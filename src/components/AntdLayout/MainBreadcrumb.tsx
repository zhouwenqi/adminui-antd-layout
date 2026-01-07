import { Breadcrumb } from "antd";
import { Link,useMatches } from "react-router";
import { type LayoutProps } from "@adminui-dev/layout";

import { useMainContext } from "./MainContext";

function MainBreadcrumb(props:LayoutProps){
    const matches = useMatches()
    const {flattenMenuMap} = useMainContext()

    const breadcrumbItems:any[] = []
    matches.forEach((item,index)=>{
        const menuItem = flattenMenuMap[item.pathname]
        const label =menuItem ? menuItem.label : ""
        breadcrumbItems.push(
            {
                path:item.pathname,
                title:label,
            }
        )
    })

    return(
        <Breadcrumb style={props.style} items={breadcrumbItems} itemRender={itemRender} />
    )
}

function itemRender(currentRoute:any, params:any, items:any, paths:any) { 
    const isLast = currentRoute?.path === items[items.length - 1]?.path       
    return isLast ? (
        <span>{currentRoute.title}</span>
    ) : (            
        <Link className={"adminui-breadcrumb-link"} to={"/" + paths[paths.length-1]}>{currentRoute.title}</Link>
    )
}

export default MainBreadcrumb