import { LazyPage } from "@adminui-dev/antd-layout"
import { createBrowserRouter,redirect } from "react-router-dom"

const DashboardLayout = LazyPage(()=>import("./layouts"))
const WelcomePage = LazyPage(()=>import("./pages/welcome"))

/**
 * global router data
 * standard react-router solution
 * reference: https://reactrouter.com/start/data/routing
 *  
 */
const routers = createBrowserRouter(
    [
        {path:"/",Component:DashboardLayout, children:[
            {index:true,loader:()=>redirect("/welcome")},
            {path:"welcome",Component:WelcomePage},
        ]}
    ]
)

export { routers }