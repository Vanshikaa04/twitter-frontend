import React, { Children } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homescreen from '../components/homescreen/Homescreen'

export const MainRouter = () => {

    const routesData = createBrowserRouter([
        {
            path : '',
            element:<HomeScreen/>,
            errorElement:<div>Error 404</div>
        }
    ]) 
  return (
    <div>
        <React.Fragment>
            <RouterProvider router={routesData}>{Children}</RouterProvider>
        </React.Fragment>
    </div>
  )
}
