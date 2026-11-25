import { Suspense } from 'react';
import { PageLoading } from '@adminui-dev/antd-layout'
import { RouterProvider } from 'react-router'
import { routers } from './routes'

function App() {  
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <RouterProvider router={routers} />
      </Suspense>
    </>
  )
}

export default App
