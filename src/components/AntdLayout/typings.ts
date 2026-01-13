import type { LocaleMessageData, MenuData } from "@adminui-dev/layout";
import type { Locale } from "antd/es/locale";
import type { ReactNode } from "react";

interface LocaleMessage extends LocaleMessageData {
    antdLocale:Locale
}
interface IconComponents{
    fullScreenIcons?:React.ReactNode[],
    collapsedIcons?:React.ReactNode[],
    mobileAsideIcons?:React.ReactNode[],
    expandIcon?:React.ReactNode[],
    itemMoreIcon?:React.ReactNode
}
interface MainDispatcher {
    collapsed:boolean,
    headerHeight:number,
    layoutIcons?:IconComponents,
    containerBackground:string,
    brandPopoverContent?:React.ReactNode,
    avatarPopoverContent?:React.ReactNode,
    toolbarExtraItems?:React.ReactNode,
    flattenMenuMap:Record<string,MenuData>,
    setCollapsed:(collapsed:boolean)=>void
}
interface PopoverDispatcher<T>{
    close?:()=>void,
    record?:T
}
interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement>  {
   menuData?:MenuData[],
   layoutIcons?:IconComponents,
   brandPopover?:ReactNode,
}

interface AsidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?:boolean,    
    width?:number,    
    iconSize?:number,
    
}

interface AsideContentProps extends AsidePanelProps {

}

interface CollapsedPanelProps  extends React.HTMLAttributes<HTMLDivElement> { 
    width?:number,    
    iconSize?:number,
}
interface BrandPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?:boolean,    
    width?:number,    
    iconSize?:number,
    hideTitle?:boolean,
}

interface AvatarPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?:boolean,    
    width?:number,    
    iconSize?:number,
}

interface AsideLayoutProps {
    menuData?:any[],
    headerHeight:number,
    header?:React.ReactNode,
    footer?:React.ReactNode,
    selectedKeys?:string[],
    openerKeys?:string[],
}

interface HeaderLayoutProps {
    menuData?:any[],
    height:number,
    title?:string,
    selectedKeys?:string[]
    openerKeys?:string[]
}

interface AntdMenuData {
    key:string,
    label:ReactNode | string,
    icon?:ReactNode,
    theme?:string,
    children?:AntdMenuData[],
    title?:string,
    extra?:ReactNode,
}

export type {
    LocaleMessage,
    IconComponents,
    MainDispatcher,
    PopoverDispatcher,
    MainLayoutProps,
    AsidePanelProps,
    AsideContentProps,
    CollapsedPanelProps,
    BrandPanelProps,
    AvatarPanelProps,
    AsideLayoutProps,
    HeaderLayoutProps,
    AntdMenuData
}