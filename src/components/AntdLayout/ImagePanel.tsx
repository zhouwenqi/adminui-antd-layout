import { useEffect, useState } from "react";
import {Avatar, Spin} from "antd"
import type { AvatarProps } from "antd";

/**
 * Avatar lazy
 * @param props 
 * @returns 
 */
function LazyAvatar(props:AvatarProps){
    const [loaded, setLoaded] = useState(false);    
    useEffect(() => {
        if (!props.src) return
        if(typeof props.src == "string"){
        const img = new Image()
        img.src = props.src as string
        img.onload = () => setLoaded(true)
        img.onerror = () => setLoaded(true)
        }else{
             setLoaded(true);
        }
    }, [props.src])

    return(
        <Avatar {...props} style={{...props.style,opacity:loaded ? 1 : 0, transition: 'opacity 0.3s ease-out'}}></Avatar>
    )    
}

/**
 * Image lazy
 * @param props 
 * @returns 
 */
function LazyImage(props:React.ImgHTMLAttributes<HTMLImageElement>&{hasChild?:boolean}){
    const [loaded, setLoaded] = useState(false);    
    const {hasChild,...domProps} = props
    useEffect(() => {
        if (!props.src) return
        if(typeof props.src == "string"){
        const img = new Image()
        img.src = props.src as string
        img.onload = () => setLoaded(true)
        img.onerror = () => setLoaded(true)
        }else{
             setLoaded(true);
        }
    }, [props.src])

    const imgBox:React.CSSProperties = {
        ...props.style,        
        transition: 'opacity 0.3s ease-out',
        opacity:loaded ? 1 : 0,      
        display:"flex",
        justifyItems:"center",
        alignItems:"center"
    }
    const imageElement = <img {...domProps} />
    return props.hasChild ? imageElement : <div style={imgBox}>{imageElement}</div>  
}

/**
 * Spin image
 * @param props 
 * @returns 
 */
function SpinImage(props:React.ImgHTMLAttributes<HTMLImageElement>&{hasChild?:boolean}){
    const [loaded, setLoaded] = useState(false);    
    const {hasChild,...domProps} = props
    useEffect(() => {
        if (!props.src) return
        if(typeof props.src == "string"){
            const img = new Image()
            img.src = props.src as string
            img.onload = () => setLoaded(true)
            img.onerror = () => setLoaded(true)
        }else{
             setLoaded(true);
        }
    }, [props.src])

    const imgBox:React.CSSProperties = {
        ...props.style,        
        transition: 'opacity 0.3s ease-out',
        opacity:loaded ? 1 : 0,
        display:"flex",
        justifyItems:"center",
        alignItems:"center"
    }
    const imageElement = <img {...domProps} />
    return (
        <Spin spinning={!loaded}>{props.hasChild ? imageElement : <div style={imgBox}>{imageElement}</div>}</Spin>
    )
}

/**
 * lazy images
 * @param imgs image list
 * @returns 
 */
const useLazyImages=(imgs:string[])=>{  
  const [loading,setLoading] = useState<boolean>(false)
  useEffect(()=>{
      setLoading(true);
      let loaded = 0;
      imgs.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loaded++;
          if(loaded === imgs.length){
            setLoading(false);
          }
        };
        img.onerror=()=>{
          loaded++;
          if(loaded === imgs.length){
            setLoading(false);
          }
        }
      });    
  },[])
  return {
    loading
  }
}


export { LazyAvatar,LazyImage,useLazyImages,SpinImage }