import { hexToRgbaString, useConfigState } from '@adminui-dev/layout';
import { generate } from '@ant-design/colors';

const DEFAULT_BLACK_COLOR = '#000000';
const DEFAULT_WHITE_COLOR = '#FFFFFF';
const DEFAULT_PRIMARY_COLOR = '#417ffb';

const getColors=(color:string):string[]=>{
    return generate(color)
}
const getBlackColors=():string[]=>{
    return getColors(DEFAULT_BLACK_COLOR)
}
const getWhiteColors=():string[]=>{
    return getColors(DEFAULT_WHITE_COLOR)
}
const useBlurBackgroundColor=(conainerBgColor:string)=>{
    let { layoutConfig } = useConfigState()    
    return layoutConfig.containerBlur ? hexToRgbaString(conainerBgColor,0.6) : conainerBgColor
}

const useBlurStyles = (conainerBgColor:string):React.CSSProperties => {
    const bgColor = useBlurBackgroundColor(conainerBgColor)
    return {
        backgroundColor: bgColor,
        transform: "translateZ(0)",
        backdropFilter: "blur(8px)"
    }
}

export { generate, getBlackColors, getWhiteColors,useBlurBackgroundColor,useBlurStyles,DEFAULT_PRIMARY_COLOR }
