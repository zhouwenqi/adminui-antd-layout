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

export { generate, getBlackColors, getWhiteColors,DEFAULT_PRIMARY_COLOR }
