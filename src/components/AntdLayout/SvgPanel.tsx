import { useId } from "react"

function SvgIcon(props:{size?:number,children:React.ReactNode}){
    const {size,children} = props
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
    )
}
/**
 * ChevronLeft
 * default svg
 * @param props 
 * @returns 
 */
function ChevronLeft(props:{size?:number}){
    const {size=16} = props
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
    )
}
/**
 * ChevronRight
 * default svg
 * @param props 
 * @returns 
 */
function ChevronRight(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    )

}

/**
 * ListIndentDecrease
 * default svg
 * @param props 
 * @returns 
 */
function ListIndentDecrease(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m7 8-4 4 4 4"/></svg>
    )

}
/**
 * ListIndentIncrease
 * default svg
 * @param props 
 * @returns 
 */
function ListIndentIncrease(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5H11"/><path d="M21 12H11"/><path d="M21 19H11"/><path d="m3 8 4 4-4 4"/></svg>
    )

}
/**
 * ChevronsUpDown
 * default svg
 * @param props 
 * @returns 
 */
function ChevronsUpDown(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    )

}
/**
 * ChevronsDownUp
 * default svg
 * @param props 
 * @returns 
 */
function ChevronsDownUp(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 20 5-5 5 5"/><path d="m7 4 5 5 5-5"/></svg>
    )

}
/**
 * User
 * default svg
 * @param props 
 * @returns 
 */
function User(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )

}
/**
 * Minimize
 * default svg
 * @param props 
 * @returns 
 */
function Minimize(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
    )

}
/**
 * Minimize
 * default svg
 * @param props 
 * @returns 
 */
function Maximize(props:{size?:number}){
    const {size=16} = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
    )

}


function DefaultLogo(props:{size?:number,color?:string,linearColor?:string[]}){
    const id = useId()
    const {size="100%",color,linearColor} = props
    let c1 = "currentColor";
    let c2 = "currentColor";
    if(linearColor && linearColor.length > 1){
        c1 = linearColor[0]
        c2 = linearColor[1]
    }else if (color){
        c1 = color
        c2 = color
    }
    return(
        <svg width={size} height={size} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient y1="0" x1="0" y2="1" x2="0" id={`default-warden-logo-${id}`}>
                <stop offset="0%" stopColor={c1} />
                <stop offset="100%" stopColor={c2} />
                </linearGradient>
            </defs>
            <path d="M36.0917 31.5709C36.0917 33.3559 34.6447 34.8029 32.8597 34.8029C31.7701 34.8029 30.8073 34.2631 30.2219 33.4371L23.7184 26.9336L16.9007 33.7511C16.3098 34.3974 15.4599 34.8028 14.5152 34.8028C12.7303 34.8028 11.2833 33.3558 11.2833 31.5709V12.1791C11.2833 10.3942 12.7303 8.94713 14.5152 8.94713C16.3002 8.94713 17.7473 10.3942 17.7473 12.1791V23.7634L21.4319 20.0786L21.433 20.0776C21.6698 19.8409 21.9339 19.6486 22.2154 19.5007C23.4351 18.8597 24.9783 19.052 26.0038 20.0775L26.0069 20.0807L29.6278 23.7017V18.6431C29.6278 16.8581 31.0748 15.4111 32.8598 15.4111C34.6448 15.4111 36.0918 16.8581 36.0918 18.6431L36.0917 31.5709Z" fill="white" />
            <path d="M22.875 1H1V22.875C1 34.9563 10.7937 44.75 22.875 44.75C34.9562 44.75 44.75 34.9563 44.75 22.875C44.75 10.7937 34.9563 1 22.875 1ZM36.0917 31.5709C36.0917 33.3559 34.6447 34.8029 32.8597 34.8029C31.7701 34.8029 30.8073 34.2631 30.2219 33.4371L23.7184 26.9336L16.9007 33.7511C16.3098 34.3974 15.4599 34.8028 14.5152 34.8028C12.7303 34.8028 11.2833 33.3558 11.2833 31.5709V12.1791C11.2833 10.3942 12.7303 8.94713 14.5152 8.94713C16.3002 8.94713 17.7473 10.3942 17.7473 12.1791V23.7634L21.4319 20.0786L21.433 20.0776C21.6698 19.8409 21.9339 19.6486 22.2154 19.5007C23.4351 18.8597 24.9783 19.052 26.0038 20.0775L26.0069 20.0807L29.6278 23.7017V18.6431C29.6278 16.8581 31.0748 15.4111 32.8598 15.4111C34.6448 15.4111 36.0918 16.8581 36.0918 18.6431L36.0917 31.5709Z" fill={`url(#default-warden-logo-${id})`}/>
        </svg>
    )
}

export { ChevronLeft,ChevronRight,ListIndentDecrease,ListIndentIncrease,ChevronsUpDown,ChevronsDownUp,User,Minimize,Maximize,DefaultLogo }