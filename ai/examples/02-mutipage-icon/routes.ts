import { LazyPage } from "@adminui-dev/antd-layout"
import { createBrowserRouter,redirect } from "react-router-dom"

const DashboardLayout = LazyPage(()=>import("./layouts"))
const LoginPage = LazyPage(()=>import("./pages/login"))
const ConfigPage = LazyPage(()=>import("./pages/system/config"))
const LogsPage = LazyPage(()=>import("./pages/system/logs"))
const OrderPage = LazyPage(()=>import("./pages/transaction/order"))
const ProductPage = LazyPage(()=>import("./pages/transaction/product"))
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
        {path:"system",children:[
            {index:true,loader:()=>redirect("/system/config")},
            {path:"config",Component:ConfigPage},
            {path:"logs",Component:LogsPage}
        ]},
        {path:"transaction",children:[
            {index:true,loader:()=>redirect("/transaction/order")},
            {path:"order",Component:OrderPage},
            {path:"product",Component:ProductPage}
        ]}
       ]},
       { path:"/login",Component:LoginPage }
    ]
)

export { routers }

