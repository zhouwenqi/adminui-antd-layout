import { generate } from '@ant-design/colors';

const DEFAULT_BLACK_COLOR = '#22222222';
const DEFAULT_WHITE_COLOR = '#FFFFFF';

const getColors=(color:string):string[]=>{
    return generate(color)
}
const getBlackColors=():string[]=>{
    return getColors(DEFAULT_BLACK_COLOR)
}
const getWhiteColors=():string[]=>{
    return getColors(DEFAULT_WHITE_COLOR)
}
export { generate, getBlackColors,getWhiteColors }