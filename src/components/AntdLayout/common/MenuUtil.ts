import type { MenuData } from "@adminui-dev/layout";
import type { AntdMenuData } from "../typings";
import { type IntlShape } from "react-intl"
import { type UIMatch } from "react-router-dom"

/**
 * separate menu data
 * @param antdMenuData menu data
 * @param selectKeys 
 * @returns current select keys
 */
function separateMenuData(antdMenuData:AntdMenuData[],selectKeys?:string[]){    
    let rootMenuItems:AntdMenuData[]=[]
    let childrenMenuItems:AntdMenuData[]=[]
    antdMenuData.forEach((item)=>{        
        if(item.key == selectKeys![1]){
            childrenMenuItems = item.children ?? []
        }
        const menu = {...item,children:undefined}
        rootMenuItems.push(menu)
    })   
    return {rootMenuItems,childrenMenuItems}
}

/**
 * transform antd-menu data 
 * @param menuData menu data
 * @returns 
 */
const transformToAntdMenuData=(menuData?:MenuData[])=>{    
    let antdMenuData:AntdMenuData[]=[]
    if(menuData == undefined || menuData.length <= 0) {
        return undefined
    }
    menuData.forEach((item)=>{
        let menuItem = getAntdMenuItem(item)
        menuItem.children = transformToAntdMenuData(item.children)
        antdMenuData.push(menuItem)
    })
    return antdMenuData
}

/**
 * locale menu data
 * @param menuData menu data
 * @param intl i18n shape
 * @returns 
 */
const localeMenuData=(menuData?: MenuData[],intl?:IntlShape):MenuData[] | undefined =>{
  if (!menuData) return undefined;
  return menuData.map(item => {   
    const menuLabel = getMenuLabel(item,intl)
    const updatedNode = {
      ...item,
      label: menuLabel,
    }
    if (item.children) {
      updatedNode.children = localeMenuData(item.children,intl)
    }
    return updatedNode;
  })
}

const getLocalLabel=(path:string,name:string,label?:string,intl?:IntlShape)=>{
    if(intl){
      const msgId = "menu" + path.replaceAll("/",".")
      return intl.formatMessage({id:msgId,defaultMessage:label || name})
    }else{
      return label || name
    }
}

const getMenuLabel=(menuData:MenuData,intl?:IntlShape)=>{
  const path = menuData.path || ""
  return getLocalLabel(path,menuData.name,menuData.label,intl)
}

const getRouterLabel=(route:UIMatch,intl?:IntlShape)=>{  
    return getLocalLabel(route.pathname,route.id,"",intl)  
}

/**
 * get antd menu item
 * @param menuDataItem menu data item
 * @returns 
 */
const getAntdMenuItem=(menuDataItem:MenuData) =>  {
    const antdMenu:AntdMenuData = {
        key:menuDataItem.path || menuDataItem.name,
        label:menuDataItem.label || menuDataItem.name,
        icon:menuDataItem.icon,    
        extra:menuDataItem.extra, 
        title:menuDataItem.label   
    }
    return antdMenu
}

export {separateMenuData,transformToAntdMenuData,localeMenuData,getAntdMenuItem,getMenuLabel,getRouterLabel}