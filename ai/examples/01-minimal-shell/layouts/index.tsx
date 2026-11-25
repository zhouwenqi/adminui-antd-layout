import { AntdLayout } from "@adminui-dev/antd-layout"
import type { LayoutConfig, MenuData } from "@adminui-dev/antd-layout"

/**
* menu data
*/
const menuData:MenuData = {
    name:"",
    path:"/",
    label:"Dashboard",
    children:[
        {name:"welcome",path:"welcome",label:"Welcome"}
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
      layoutType:"leftMenu"  
  }
  return(
  <>
    <AntdLayout layoutConfig={layoutConfig} menuData={menuData} />
  </>
  )
}