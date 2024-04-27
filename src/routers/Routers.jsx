import React, { Children } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from '../components/login/Login'
import Signup from '../components/signup/Signup'

import HomeScreen from '../components/homescreen/Homescreen'

export const MainRouter = () => {

    const routesData = createBrowserRouter([
        {
            path : '',
            element:<Login/>,
            errorElement:<div>Error 404</div>
        },
        {
            path : '/login',
            element:<Login/>,
            errorElement:<div>Error 404</div>
        },
        {
            path : '/home',
            element:<HomeScreen/>,
            errorElement:<div>Error 404</div>
        },
       {
            path : '/signup',
            element:<Signup/>,
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
