import { createContext,useContext } from "react";
import type { PopoverDispatcher, MainDispatcher } from "./typings";
import { useOutletContext } from "react-router";
import type { BrandInfo, UserInfo,  OutletContainer } from "@adminui-dev/layout";

const MainContext = createContext<MainDispatcher>({
    collapsed:false,
    headerHeight:50,
    containerBackground:"transparent",
    flattenMenuMap:{},
    setCollapsed:()=>{}
})
const AvatarPopoverContext = createContext<PopoverDispatcher<UserInfo>>({
    close:()=>{}
})
const BrandPopoverContext = createContext<PopoverDispatcher<BrandInfo>>({
    close:()=>{},
})
export const ROLE_ASIDE_HEADER = Symbol("AsideFooter")
export const ROLE_ASIDE_FOOTER = Symbol("AsideHeader")
export const ROLE_ASIDE_CONTENT_ITEMS = Symbol("AsideContentItems")
export const ROLE_ASIDE_CONTENT_ITEM = Symbol("AsideContentItem")
export const ROLE_CONTENT_FOOTER = Symbol("ContentFooter")
export const ROLE_AVATAR_POPOVER_CONTENT = Symbol("AvatarPopoverContent")
export const ROLE_BRAND_POPOVER_CONTENT = Symbol("BrandPopoverContent")
export const ROLE_SOLT_CONTENT = Symbol("SoltContent")
export const ROLE_TOOLBAR_EXTRA_ITEMS = Symbol("ToolbarExtraItems")

export const createMainContext=()=>MainContext
export const useMainContext=()=>useContext(MainContext)
export const useMainCollapsed=()=>{
    const context = useMainContext()
    return context.collapsed
}
export const useContainerOutlet=()=>useOutletContext<OutletContainer>()
export const createAvatarPopoverContext=()=>AvatarPopoverContext
export const createBrandPopoverContext=()=>BrandPopoverContext
export const useAvatarPopover=()=>useContext(AvatarPopoverContext)
export const useBrandPopover=()=>useContext(BrandPopoverContext)