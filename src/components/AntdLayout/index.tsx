import { createConfigActionContext,createConfigStateContext,getLayoutTheme,defaultConfig as initConfig, } from "@adminui-dev/layout"
import type { LayoutConfig, RootLayoutProps, Language, ConfigActionDispatcher,ConfigStateDispatcher,Theme, ThemeSkin, SkinType } from "@adminui-dev/layout"
import { useEffect, useMemo, useState } from "react"
import {ConfigProvider,App,theme as antdTheme} from 'antd'
import  "./index.css"
import type { IconComponents, LocaleMessage } from "./typings"
import { IntlProvider } from "react-intl"
import MainLayout from "./MainLayout"
import { getBlackColors } from './common/ColorUtil'
import { AsideHeader, AsideFooter} from "./AsidePanel"
import { getStorageConfig, setSkinConfig, setStorageConfig } from "./common/StringUtil"
import { transformMenuData} from "./common/RouteUtil"
import { useMatches } from "react-router"
import { ContainerFooter } from "./Container"
import { AvatarPopoverContent } from "./AvatarPanel"
import { BrandPopoverContent } from "./BrandPanel"
import { SoltPanel } from "./SoltPanel"
import { ToolbarExtraItems } from "./ToolbarPanel"

// localStorage key for Local
const LOCALE_STORAGE_KEY = "adminui-locale"

// get language list
const getLanguages=(data:Record<string, LocaleMessage>):Language[]=>{
    let languages:Language[] = []
    Object.entries(data).forEach(([key, value])=>{           
        languages.push({
            name:value["name"],
            locale:key,
            flag:value["flag"]
        })        
    })
    return languages
}

// get theme skin list
const getThemeSkins=(data:ThemeSkin[]):Record<string,ThemeSkin[]>=> {
    let skinsMap:Record<SkinType,ThemeSkin[]> = {
        "tidy":[],
        "rich":[]
    }
    data.forEach((item)=>{
        if(item.skinType == "rich"){
            skinsMap["rich"].push(item)
        }else{
            skinsMap["tidy"].push(item)
        }
    })

    return skinsMap
}

// get current theme
const getCurrentThemeSkin=(skinName:string, skinMap:Record<SkinType,ThemeSkin[]>):ThemeSkin | undefined => {
    let themeSkin = undefined
    Object.entries(skinMap).forEach(([key, value])=>{   
        value.forEach((item)=>{
            if(item.name == skinName){
                themeSkin = item
            }
        })   
    })
    return themeSkin
}


/**
 * adminui-dev / antd layout
 * @param props layout properites
 * @returns 
 */
function AntdLayout(props:RootLayoutProps<LocaleMessage> & { 

    layoutIcons?:IconComponents,
 }){
    const matches = useMatches()
    const {pathname} = matches[0]
   
    const defaultConfig = {...initConfig, ...props.layoutConfig,...( props.disabledStorageConfig ? {} : getStorageConfig(pathname)) }  
    // skins
    let themeSkins = props.themeSkins || []
    const themeSkinsData = useMemo(()=>{ return getThemeSkins(themeSkins)},[themeSkins])

    const defaultLocale = props.locale || localStorage.getItem(LOCALE_STORAGE_KEY) as string || defaultConfig.locale || "en-US" 

    const menuData = props.menuData ?  transformMenuData("/",[props.menuData]) : []

    const [layoutConfig,setLayoutConfig] = useState<LayoutConfig>(()=>{        
        if(defaultConfig.skinName){
            const currentThemeSkin =  getCurrentThemeSkin(defaultConfig.skinName,themeSkinsData)
            return setSkinConfig(defaultConfig,currentThemeSkin)
        }
        return defaultConfig
    })       
    const [locale,setLocale]=useState<string>(defaultLocale)
    const LayoutStateProviderContext = createConfigStateContext()
    const LayoutActionProviderContext = createConfigActionContext()    
    
   
    // locale data
    let localeMessageData:Record<string,LocaleMessage> = props.localeMessages || {}

    // language list
    const languages = useMemo(()=>{ return getLanguages(localeMessageData) },[localeMessageData])   

    // setter current locale
    const setCurrentLocale=(locale:string)=>{
        localStorage.setItem(LOCALE_STORAGE_KEY,locale)
        setLocale(locale)
    } 

    document.documentElement.style.setProperty('--pageload-bar-color', layoutConfig.primaryColor!);
 
    // save theme to localStorage
    useEffect(()=>{        
        const root = window.document.documentElement        
        root.classList.remove("light", "dark")         
        if (layoutConfig.theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"  
            root.classList.add(systemTheme)
            return
        }
        root.classList.add(layoutConfig.theme as string)
    },[layoutConfig.theme])   

    const currentSkinData = useMemo(()=>{ 
        
        if(layoutConfig.skinName){
            return getCurrentThemeSkin(layoutConfig.skinName,themeSkinsData)
        }     
        return undefined   
     },[themeSkins,layoutConfig.skinName]) 

    const layoutTheme = getLayoutTheme(layoutConfig.theme!)

    const onChangeLayoutConfig=(config:LayoutConfig)=>{        
        setLayoutConfig(config)
        if(!props.disabledStorageConfig){
            setStorageConfig(config,pathname)
        }
    }

    const configStatusContext:ConfigStateDispatcher =  useMemo(()=>({
        layoutConfig,              
        locale,        
        languages,
        themeSkin:currentSkinData,
        themeSkinMap:themeSkinsData
    }),[languages,locale,languages,themeSkinsData,currentSkinData,layoutConfig])

    const configActionContext:ConfigActionDispatcher = useMemo(()=>({
        setLayoutConfig:onChangeLayoutConfig,     
        setLocale:setCurrentLocale,
    }),[])    
    
    // antd locale data
    const currentLocaleData = localeMessageData[locale] || localeMessageData["en-US"];
    const direction =  ['he', 'ar', 'fa', 'ku'].filter(lng => locale.startsWith(lng)).length ? 'rtl' : 'ltr';

    let algorithms = layoutTheme === "dark" ? [antdTheme.darkAlgorithm] : [antdTheme.defaultAlgorithm] 
    let menuIconSize = layoutConfig.menuIconSize || 14
    const iconMarginInlineEnd = layoutConfig.menuIconSize ? (menuIconSize - 10) * 0.1 + 10 : 10
    if(layoutConfig.compact){
        algorithms.push(antdTheme.compactAlgorithm)
        menuIconSize -= 2;
    }

    let menuStyles = {
        "darkSubMenuItemBg":"transparent",
        "subMenuItemBg":"transparent",      
        "iconSize":menuIconSize,
        "fontSize":menuIconSize,
        "itemMarginInline": layoutConfig.flated ? 0 : 4,
        "iconMarginInlineEnd":iconMarginInlineEnd,
        "activeBarHeight": layoutConfig.compact ? 2 : 4,
        "darkPopupBg": getBlackColors()[4]
    }
    let layoutStyles = {
        "siderBg":"transparent",
        "triggerBg":"transparent",
        "lightSiderBg":"transparent",
        "lightTriggerBg":"transparent"
    }
    // antd theme config
    const antdThemeConfig = {
        algorithm:algorithms,
        token:{
            colorPrimary:layoutConfig.primaryColor,     
            borderRadius:layoutConfig.flated ? 0 : 6,
        },
        components:{
            "Menu":menuStyles,
            "Layout":layoutStyles
        }
    }

    const modalToken = {
      mask: {
        blur: false,
      },
    }

    const drawerToken = {
      mask: {
        blur: false,
      },
    }

    return(
        <LayoutStateProviderContext.Provider value={configStatusContext}>
            <LayoutActionProviderContext.Provider value={configActionContext}>
                    <ConfigProvider theme={antdThemeConfig} locale={currentLocaleData?.antdLocale} direction={direction} modal={modalToken} drawer={drawerToken} prefixCls="adminui">
                        <App style={{height:"100%",width:"100%"}}>
                            <IntlProvider locale={locale} messages={currentLocaleData?.messages}>
                                <MainLayout menuData={menuData} layoutIcons={props.layoutIcons}>{props.children}</MainLayout>                                                            
                            </IntlProvider>
                        </App>
                    </ConfigProvider>
            </LayoutActionProviderContext.Provider>
        </LayoutStateProviderContext.Provider>
    )
}

AntdLayout.AsideHeader = AsideHeader
AntdLayout.AsideFooter = AsideFooter
AntdLayout.Footer = ContainerFooter
AntdLayout.AvatarPopoverContent = AvatarPopoverContent
AntdLayout.BrandPopoverContent = BrandPopoverContent
AntdLayout.SoltContent = SoltPanel
AntdLayout.HeaderToolbarExtra = ToolbarExtraItems

export {AntdLayout}