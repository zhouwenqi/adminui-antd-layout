import { useConfigState, type LayoutConfig, type Theme, type ThemeSkin } from "@adminui-dev/layout"
import { useIntl, type IntlShape } from "react-intl"

const DEFAULT_CONFIG_STORAGE_KEY = "adminui-default-config"

const useAppIntl = () => {
    const intl = useIntl()
    const {layoutConfig} = useConfigState()
    const {f,t} = getAppIntl(layoutConfig.disabledLocale ? undefined : intl)
    return {...intl,f,t}
}
const getAppIntl=(intl?:IntlShape)=>{
    const f = (msg:{id:string,defaultMessage:string})=>{
        const {id,defaultMessage} = msg
        if(!intl){
            return defaultMessage || id.split(".").pop()
        }
        return intl.formatMessage({id,defaultMessage})
    }
    const t = (id:string,defaultMessage:string)=>{
        if(!intl){
            return defaultMessage || id.split(".").pop()
        }
        return intl.formatMessage({id,defaultMessage})
    }

    return {f,t}
}

const getBasicLayoutConfig=(config:LayoutConfig)=>{
    const {brandInfo,userInfo,...initConfig} = config
    return initConfig
}

/**
 * Retrieve the configuration stored in the storage
 * @param name key
 * @returns 
 */
const getStorageConfig = (name?:string):LayoutConfig | undefined => {    
    if(!name){
        name = DEFAULT_CONFIG_STORAGE_KEY
    }
    const json = window.localStorage.getItem(name)
    try{
        if(json){
            return JSON.parse(json) as LayoutConfig
        }
    }catch(ex){
        console.error(ex)    
    }
}


/**
 * Save configuration to storage
 * @param config configuration
 * @param name key
 */
const setStorageConfig=(config:LayoutConfig,name?:string)=>{
    if(!name){
        name = DEFAULT_CONFIG_STORAGE_KEY
    }
    const {brandInfo,userInfo,...saveConfig} = config
    const json = JSON.stringify(saveConfig)
    window.localStorage.setItem(name,json)
}

/**
 * Setting layout config for skin
 * @param layoutConfig 
 * @param themeSkin 
 * @returns 
 */
const setSkinConfig=(layoutConfig:LayoutConfig, themeSkin?:ThemeSkin):LayoutConfig => {
    let config:LayoutConfig = {...layoutConfig}
    if(themeSkin){
        const theme = themeSkin.theme.length < 2 ? themeSkin.theme[0] as Theme : config.theme
        config = {
            ...config,
            primaryColor:themeSkin.primaryColor ?? config.primaryColor,
            containerBlur:themeSkin.containerBlur ?? config.containerBlur,
            asideBlur:themeSkin.asideBlur ?? config.asideBlur,
            asideWidth:themeSkin.asideWidth ?? config.asideWidth,
            headerBlur:themeSkin.asideBlur ?? config.headerBlur,            
            theme,
        }
    }
    return config
}

export {useAppIntl,getAppIntl,getStorageConfig, setStorageConfig,getBasicLayoutConfig, setSkinConfig}