import { AntdLayout } from "@adminui-dev/antd-layout"
import type { LayoutConfig, MenuData,LocaleMessage } from "@adminui-dev/antd-layout"
import antdZhCN from 'antd/locale/zh_CN'
import antdEnUS from 'antd/locale/en_US'
import zhCN from "../locales/zh-CN"
import enUS from "../locales/en-US"
/**
 * Menu data
 * A menu corresponds to a route, and the root menu is not displayed, but it must correspond to a layout route because an item may have a layout.
 */
const menuData:MenuData = {
    name:"",
    path:"/",
    label:"Dashboard",
    children:[
        {name:"welcome",path:"welcome",label:"Welcome"},   
    ]
}
/**
 * locales data
 * Merge ant design internationalization data with local internationalization data
 */
const localeMessages:Record<string,LocaleMessage> = {   
    "zh-CN":{
        locale:antdZhCN.locale,
        name:"简体中文",
        flag:"🇨🇳",
        messages:zhCN,            
        antdLocale:antdZhCN
    },
    "en-US":{
        locale:antdEnUS.locale,
        name:"English",
        flag:"🇺🇸",
        messages:enUS,
        antdLocale:antdEnUS
    },
}
/**
 * =========
 *  layout
 * =========
 * The most essential component
 * 
 * @returns 
 */
export default function(){      
    // layout config
    const layoutConfig:LayoutConfig = {
        disabledLocale:true,
        largeBrand:true,    
        brandInfo:{
            logo:"/vite.svg",
            name:"Vite.dev",
            title:"Build tool for the web"
        },
        userInfo:{
            uid:"warden.vip",
            title:"zhouwenqi@me.com",
            avatar:"https://api.dicebear.com/9.x/miniavs/svg?seed=8"
        }
    }
    return(
        <>
            <AntdLayout layoutConfig={layoutConfig} menuData={menuData} localeMessages={localeMessages} />
        </>
    )
}