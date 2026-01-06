import { Breadcrumb } from "antd";
import { useIntl } from "react-intl";
import { Link,useMatches } from "react-router";
import { useConfigState, type LayoutProps } from "@adminui-dev/layout";
import { getRouterLabel } from "./common/MenuUtil";

function MainBreadcrumb(props:LayoutProps){
    const matches = useMatches()
    const {layoutConfig} = useConfigState()
    const intl = useIntl()
    const t = layoutConfig.disabledLocale ? undefined : intl

    const breadcrumbItems:any[] = []
    matches.forEach((item,index)=>{
        const label = getRouterLabel(item,t)
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