import { BaseLayout, useConfigState } from "@adminui-dev/layout"
import { Outlet, useLocation, useMatches,useNavigation } from "react-router"
import { theme as antdTheme, Spin } from "antd"
import MainHeader from "./MainHeader"
import MainAside from "./MainAside"
import type { AntdMenuData, MainDispatcher, MainLayoutProps } from "./typings"
import React, {  useMemo, useState } from "react"
import { createMainContext, ROLE_ASIDE_FOOTER, ROLE_ASIDE_HEADER, ROLE_AVATAR_POPOVER_CONTENT, ROLE_BRAND_POPOVER_CONTENT, ROLE_CONTENT_FOOTER, ROLE_SOLT_CONTENT, ROLE_TOOLBAR_EXTRA_ITEMS } from "./MainContext"
import { flattenMenuData, localeMenuData, separateMenuData, transformToAntdMenuData } from "./common/MenuUtil"
import { matchPathToKeys, splitMenuKeys } from "./common/RouteUtil"
import { useIntl } from "react-intl"

const { useToken } = antdTheme
const DEFAULT_HEADER_HEIGHT = 56;

/**
 * Main layout
 * header,aside,content,outlet
 * @author zhouwenqi
 * @param props 
 * @returns 
 */
function MainLayout(props:MainLayoutProps){
  
    const { layoutConfig,themeSkin } = useConfigState()
    const intl = useIntl()
    const {token} = useToken()    
    const [collapsed,setCollapsed] = useState(false)   

    const baseStyles = {
        backgroundColor:token.colorBgLayout,  
    }

    let headerHeight = layoutConfig.headerHeight || DEFAULT_HEADER_HEIGHT;
    if(layoutConfig.compact){
      headerHeight -= 4
    }  


    const rootMenuData = layoutConfig.disabledLocale ? props.menuData : localeMenuData(props.menuData,intl)
    const menuData = rootMenuData && rootMenuData?.length > 0 ? rootMenuData[0].children :[]

    const rootFlattenMenudata = flattenMenuData(rootMenuData || [])
    
    // locale menu data
    const antdMenuData = transformToAntdMenuData(menuData)    

    const location = useLocation() 

    const matches = useMatches()  
    const {pathname} = location
    const menuKeys = matchPathToKeys(pathname) 
    const lastRoute = matches[matches.length-1]    

    let headerSelectKeys:string[]=[]
    let asideSelectKeys:string[]=[]
    let headerMenuData:AntdMenuData[]=[]
    let asideMenuData:AntdMenuData[]=[]
    
    if(layoutConfig.layoutType=="leftMenu"){
        asideMenuData = antdMenuData || []
        asideSelectKeys = menuKeys
    }else{
        headerMenuData = antdMenuData || []
        headerSelectKeys = menuKeys
    }

    if(layoutConfig.splitMenu && menuKeys.length > 1){   
        const [first,rest] = splitMenuKeys(menuKeys)
        
        const {rootMenuItems,childrenMenuItems} = separateMenuData(antdMenuData!,menuKeys)

        if(layoutConfig.layoutType=="leftMenu") {
            asideMenuData = rootMenuItems
            headerMenuData = childrenMenuItems
            asideSelectKeys = first
            headerSelectKeys = rest
        }else{
            asideMenuData = childrenMenuItems
            headerMenuData = rootMenuItems
            headerSelectKeys = first
            asideSelectKeys = rest
        }
    }
    
    // loading layout extra element
    const childrenArray = React.Children.toArray(props.children)
    const asideHeader = childrenArray.find(c => React.isValidElement(c) && (c.type as any).role === ROLE_ASIDE_HEADER)
    const asideFooter = childrenArray.find(c => React.isValidElement(c) && (c.type as any).role === ROLE_ASIDE_FOOTER)
    const contentFooter = childrenArray.find(c => React.isValidElement(c) && (c.type as any).role === ROLE_CONTENT_FOOTER)
    const avatarPopoverContent = childrenArray.find(c => React.isValidElement(c) && (c.type as any).role === ROLE_AVATAR_POPOVER_CONTENT)
    const brandPopoverContent = childrenArray.find(c => React.isValidElement(c) && (c.type as any).role === ROLE_BRAND_POPOVER_CONTENT)
    const soleContent = childrenArray.find(c => React.isValidElement(c) && (c.type as any).role === ROLE_SOLT_CONTENT)
    const toolbarExtraItems = childrenArray.find(c => React.isValidElement(c) && (c.type as any).role === ROLE_TOOLBAR_EXTRA_ITEMS)
    const AsideContextProvider = createMainContext()
    const asideContextDispatcher:MainDispatcher = useMemo(()=>({
        collapsed,
        headerHeight,
        layoutIcons:props.layoutIcons,
        avatarPopoverContent,
        brandPopoverContent,
        toolbarExtraItems,
        flattenMenuMap:rootFlattenMenudata,
        setCollapsed
    }),[collapsed,headerHeight,props.layoutIcons,rootFlattenMenudata])      

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);
  
    const lastRouteMenu = rootFlattenMenudata[lastRoute.pathname]

    const title = lastRouteMenu.label || ""
    document.title = title

    return(
        <>
        <AsideContextProvider value={asideContextDispatcher}>
            <BaseLayout {...props} style={baseStyles}>                
                <BaseLayout.Aside>
                    <MainAside headerHeight={headerHeight} header={asideHeader} footer={asideFooter} menuData={asideMenuData} selectedKeys={asideSelectKeys} openerKeys={asideSelectKeys} />
                </BaseLayout.Aside>
                <BaseLayout.Header>
                    <MainHeader height={headerHeight} menuData={headerMenuData} selectedKeys={headerSelectKeys} title={title} />
                </BaseLayout.Header>
                <BaseLayout.Content>
                    <Outlet context={{title:title,footer:contentFooter}} />                    
                </BaseLayout.Content>
                <BaseLayout.Background>
                    {themeSkin ? themeSkin.backgroundContent : <></>}
                </BaseLayout.Background>             
            </BaseLayout>
        </AsideContextProvider>
        {soleContent}
        </>
    )
}

export default MainLayout