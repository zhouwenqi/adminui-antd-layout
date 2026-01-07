import {AntdLayout} from "./AntdLayout"
import {PageLoading,RouteLoading,LazyPage} from "./AntdLayout/LazyPage"
import {useAvatarPopover,useBrandPopover,useMainCollapsed,useContainerOutlet} from "./AntdLayout/MainContext"
import { FullScreenButton, useConfigAction,useConfigState,useTheme} from "@adminui-dev/layout"
export *  from "./AntdLayout/common/ColorUtil"
export * from "./AntdLayout/common/MenuUtil"
export * from "./AntdLayout/common/RouteUtil"
export * from "./AntdLayout/common/StringUtil"

export {useConfigAction,useConfigState,FullScreenButton,useTheme}
export {useAvatarPopover,useBrandPopover,useMainCollapsed,useContainerOutlet}
export {AntdLayout,PageLoading,RouteLoading,LazyPage}