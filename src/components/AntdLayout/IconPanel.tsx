import React from "react"

/**
 * Icon panel
 * Recommend using @ant-design/icons and lucide-react
 * @author zhouwenqi
 * @param props 
 * @returns 
 */
function ToolbarIcon(props:React.HTMLAttributes<HTMLDivElement>& {icon:React.ReactNode,size:number}){
    const {icon,size} = props
    return React.isValidElement(icon) ? React.cloneElement(icon as any, {size,style:{fontSize:size-2+"px",...props.style}}) : icon
}

export { ToolbarIcon }