import { BrandPopoverPanel, UserPopoverPanel } from "../../components/PopoverPanel"
import { ThemeButton } from "../../components/ThemeButton"
import { AntdLayout } from "@adminui-dev/antd-layout"
import type { LayoutConfig, MenuData } from "@adminui-dev/antd-layout"
import { DashboardOutlined, SmileOutlined,BlockOutlined,CarryOutOutlined,ProductOutlined,DesktopOutlined,CodeOutlined,SettingOutlined } from "@ant-design/icons"

/**
 * Menu data
 * A menu corresponds to a route, and the root menu is not displayed, but it must correspond to a layout route because an item may have a layout.
 * Recommend using `lucide-react` and `@ant-design/icons` for icon libraries
 */
const menuData:MenuData = {
    name:"",
    path:"/",
    label:"Dashboard",
    icon:<DashboardOutlined />,
    children:[
        {name:"welcome",path:"welcome",label:"Welcome",icon:<SmileOutlined />},
        {name:"transaction",path:"transaction",label:"Transaction",icon:<BlockOutlined />,children:[
            {name:"order",path:"order",label:"Order",icon:<CarryOutOutlined />},
            {name:"product",path:"product",label:"Product",icon:<ProductOutlined />},
        ]},
        {name:"system",path:"system",label:"System",icon:<DesktopOutlined />,children:[
            {name:"config",path:"config",label:"Config",icon:<SettingOutlined />},
            {name:"logs",path:"logs",label:"Logs",icon:<CodeOutlined />},
        ]},
    ]
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
            <AntdLayout layoutConfig={layoutConfig} menuData={menuData}>
                <AntdLayout.BrandPopoverContent>
                    <BrandPopoverPanel />
                </AntdLayout.BrandPopoverContent>
                <AntdLayout.AvatarPopoverContent>
                    <UserPopoverPanel />
                </AntdLayout.AvatarPopoverContent>
                <AntdLayout.HeaderToolbarExtra>
                    <ThemeButton />
                </AntdLayout.HeaderToolbarExtra>
            </AntdLayout>
        </>
    )
}