import { Button } from "antd"
import { SunOutlined,MoonOutlined,LaptopOutlined } from "@ant-design/icons"
import { useConfigAction, useConfigState, type Theme } from "@adminui-dev/antd-layout"

/**
 * header toolbar button - demo
 * To maintain a consistent style, it is recommended to use antd's button component
 * @returns 
 */
function ThemeButton(){
    const { layoutConfig } = useConfigState()
    const { setLayoutConfig } = useConfigAction()
    let icon = <LaptopOutlined />
    let t:Theme = "system"
    switch(layoutConfig.theme){
        case "light":
            icon = <SunOutlined />
            t = "dark"
            break
        case "dark":
            icon = <MoonOutlined />
            t = "system"
            break
        default:       
            t= "light"     
            break
    }
   
    return(
        <Button title={t} type="text" icon={icon} onClick={()=>{setLayoutConfig({...layoutConfig,theme:t})}}></Button>
    )
}


export {ThemeButton}