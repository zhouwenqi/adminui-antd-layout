import { Container, useConfigAction, useConfigState } from '@adminui-dev/antd-layout';
import type { AvatarPosition, LayoutType, Position, Theme } from '@adminui-dev/antd-layout';
import { Segmented, Switch, theme } from 'antd';

const {useToken} = theme

interface ConfigData {
    title:string,
    element:React.ReactNode
}
const itemStyles:React.CSSProperties = {
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%",
    height:"46px",
    minHeight:"46px",
    gap:"10px"
}
const boxStyles:React.CSSProperties = {
    width:"100%",
    padding:"12px"
}
const titleStyles:React.CSSProperties = {
    fontWeight:"600",
    paddingBottom:"8px",
}
const footerStyles:React.CSSProperties = {
    paddingTop:"8px",
    textAlign:"right"
}

export default function(){
    const { token } = useToken()
    const { setLayoutConfig } = useConfigAction()
    const { layoutConfig } = useConfigState()
    
    const data:ConfigData[]=[
        {title:"Theme",element:(<Segmented options={["light","dark","system"]} defaultValue={layoutConfig.theme} value={layoutConfig.theme} onChange={(e)=>{setLayoutConfig({...layoutConfig,theme: e as Theme})}} />)},
        {title:"Layout type",element:(<Segmented options={["leftMenu","headMenu"]} defaultValue={layoutConfig.layoutType} value={layoutConfig.layoutType} onChange={(e)=>{setLayoutConfig({...layoutConfig,layoutType: e as LayoutType})}} />)},
        {title:"Large brand logo",element:(<Switch defaultChecked={layoutConfig.largeBrand} checked={layoutConfig.largeBrand} onChange={(e)=>{setLayoutConfig({...layoutConfig,largeBrand:e})}} />)},
        {title:"Aside inline",element:(<Switch defaultChecked={layoutConfig.asideMenuInline} checked={layoutConfig.asideMenuInline} onChange={(e)=>{setLayoutConfig({...layoutConfig,asideMenuInline:e})}} />)},
        {title:"Collapsed position",element:(<Segmented options={["top","center","bottom"]} defaultValue={layoutConfig.collapsedPosition} value={layoutConfig.collapsedPosition} onChange={(e)=>{setLayoutConfig({...layoutConfig,collapsedPosition: e as Position})}} />)},
        {title:"Avatar position",element:(<Segmented options={["rightTop","leftBottom","none"]} defaultValue={layoutConfig.avatarPosition} value={layoutConfig.avatarPosition} onChange={(e)=>{setLayoutConfig({...layoutConfig,avatarPosition: e as AvatarPosition})}} />)},
    ]    

    let items:React.ReactNode[]=[]
    data.forEach((item,index)=>{
        items.push(<ConfigItem data={item} key={index} style={{borderBottom:`solid 1px ${token.colorBorderSecondary}`}} />)
    })

    return(
        <Container mode='panel'>
            <div style={boxStyles}>
                <div style={{...titleStyles,borderBottom:`solid 1px ${token.colorBorderSecondary}`}}>🗼 This is just the basic configuration</div>
                {items}
                <div style={{...footerStyles,color:token.colorTextSecondary}}>More configurations are available 👉 <a href='https://github.com/zhouwenqi/adminui-antd-layout' target='_blank'>here</a> </div>
            </div>           
        </Container>
    )
}



function ConfigItem(props:{data:ConfigData} & React.HTMLAttributes<HTMLDivElement>){
    const {data} = props
    return(
        <div style={{...itemStyles,...props.style}}>
            <span>{data.title}</span>
            <div>{data.element}</div>
        </div>
    )
}