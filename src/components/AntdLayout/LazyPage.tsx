import {lazy, Suspense, useEffect} from "react"
import nprogress from "nprogress"

export function LazyPage<T extends React.ComponentType<any>>(
    loader:()=>Promise<{default:T}>
) {
    const LazyComp =  lazy(loader)       
    return function Page(props:React.ComponentProps<T>) {
        return(
            <Suspense fallback={<PageLoading />}>
                <LazyComp {...props} />
            </Suspense>
        )
    }
}
export const PageLoading=()=>{
    useEffect(()=>{
        const timer = setTimeout(() => {
            nprogress.start();
        }, 200)

        return () => {
            clearTimeout(timer)
            nprogress.done()
        }
    },[])
    return(
        <div style={{height:"auto"}}></div>
    )
}

export const RouteLoading=()=>{

    useEffect(()=>{
        nprogress.start()
        return () => {
            nprogress.done()
        }
    },[location.hostname])
    return(
        <div style={{height:"auto"}}></div>
    )
}
