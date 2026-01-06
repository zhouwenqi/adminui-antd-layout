import type { MenuData } from "@adminui-dev/layout"
import React from "react"
import { generatePath, type RouteObject } from "react-router-dom"

function pathToKeys(pathname:string){
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, ''); 
    if (cleanPath === '/') return ['/'];
    const segments = cleanPath.split('/').filter(Boolean);
    const paths = ['/'];
    let current = '';        
    for (const segment of segments) {
        current += `/${segment}`;
        paths.push(current);
    }
    return paths;
}

function matchPathToKeys(pathname:string) {
    let keys = pathToKeys(pathname)
    if(keys && keys.length > 1 && keys[0]=="/"){
        keys.splice(0,1)
    }
    return keys
}

function splitMenuKeys(arr: string[]): [string[], string[]] {
  const len = arr.length;
  if (len === 0) return [[], []];
  const first = [arr[1]];
  const rest = new Array<string>(len - 2);

  for (let i = 1; i < len; i++) {
    rest[i - 1] = arr[i];
  }
  return [first, rest];
}

function transformMenuData(rootPath:string,routes?:MenuData[]):MenuData[] | undefined {
    if(!routes) return undefined
    if(!rootPath.endsWith("/") && rootPath.length > 1){
        rootPath = rootPath + "/"
    }  
    return routes
        .map(item=>{
            const menuData = transformMenuItem(rootPath,item)
            if(item.children){
                menuData.children = transformMenuData(menuData.path!,item.children)
            }
            return menuData
        })
}
function transformMenuItem(parentPath:string,routeItem:MenuData) {             
    let path = routeItem.path || routeItem.name
    if(path?.startsWith("/")){
        path = path.slice(1)
    }
    if(path?.startsWith("./")){
      path = path.slice(2)
    }
    let spath = parentPath + path
    let menuData:MenuData = {
      name:spath,
      path:spath,
      originalPath:spath,
      extra:convertToNode(routeItem.extra),
      icon:convertToNode(routeItem.icon)
    }
  return menuData
}

/**
 * transform route object to menu data
 * @param rootPath root path
 * @param routes router data
 * @returns 
 */
function transformRouteToMenuData(rootPath:string,routes?:RouteObject[]):MenuData[] | undefined {
    if(!routes) return undefined
    if(!rootPath.endsWith("/") && rootPath.length > 1){
        rootPath = rootPath + "/"
    }
    return routes
        .filter(item=>!!item.handle)
        .map(item=>{
            const menuData = routeItemToMenuData(rootPath,item)
            if(item.children){
                menuData.children = transformRouteToMenuData(menuData.path!,item.children)
            }
            return menuData
        })
}

/**
 * transform route item to menu item
 * @param parentPath 
 * @param routeItem 
 * @returns 
 */
function routeItemToMenuData(parentPath:string,routeItem:RouteObject){
  const { handle } = routeItem          
    let path = routeItem.path
    if(path && handle.params){                
        path = generatePath(path,handle.params)
    }
    if(path?.startsWith("/")){
        path = path.slice(1)
    }
    let spath = parentPath + path
    let menuData:MenuData = {...handle,
      path:spath,
      originalPath:routeItem.path,
      extra:convertToNode(handle.extra),
      icon:convertToNode(handle.icon)
    }
  return menuData
}



function buildRouteWithParams(
  baseRoute: string,
  params: Record<string, any> = {}
): string {
  const hasValidParams = Object.keys(params).some(
    key => params[key] != null
  );

  if (!hasValidParams) {
    return baseRoute.split('/:')[0];
  }

  const segments = baseRoute.split('/');
  const resultSegments: string[] = [];

  for (const segment of segments) {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1);
      const paramValue = params[paramName];

      if (paramValue != null) {
        resultSegments.push(encodeURIComponent(String(paramValue)));
      } else {
        break;
      }
    } else {
      resultSegments.push(segment);
    }
  }

  return resultSegments.join('/');
}



const convertToNode = (Icon:any) => {  
  if (React.isValidElement(Icon)) return Icon;
  
  if (typeof Icon === 'function' || typeof Icon === 'object') {
    return React.createElement(Icon);
  }
  
  return null;
}


export {
  pathToKeys,
  matchPathToKeys,
  transformRouteToMenuData,
  buildRouteWithParams,
  splitMenuKeys,
  transformMenuData
}