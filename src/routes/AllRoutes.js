import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartPage, Dashboard, Home, Login, OrderPage, PageNotFound, Products, Register } from '../pages'
import { ProductDetail } from '../pages/ProductDetails'
import { Protected,AdminProtected, UserDashProtected, UserINFOProtected } from './Protected'
import { AdminDashboard } from '../pages/Dashboard/AdminDashboard'

import { FilterProvider, FilterProviderDash } from '../context';
import { UserINFO } from '../pages'
import { AdminINFO } from '../pages/UserINFO/AdminINFO'

export const AllRoutes = () => {

//all possible webpages that a user or an Admin to visit
//webpages with ...
//<Protected></Protected> can not be visited by non-logged in user
//<UserProtected></UserProtected> are for Type Users only since non logged in shouldn't access it and admin have their own version that webpage in a different path
//<AdminProtected></AdminProtected> can only be visited by Admin only
//<FilterProvider>/<FilterProviderDash> have a fliter the user can interact with
  return (
    <Routes>
      
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<FilterProvider><Products/></FilterProvider>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Protected> <CartPage/> </Protected>}/>
        
        <Route path='/userINFO' element={<Protected> <UserINFOProtected> <UserINFO/> </UserINFOProtected> </Protected>}/>
        <Route path='/adminINFO' element={<Protected><AdminProtected> <AdminINFO/> </AdminProtected></Protected>}/>

        <Route path='/order' element={<Protected> <OrderPage/> </Protected>}/>
        <Route path='/dashboard' element={<Protected> <UserDashProtected> <Dashboard/> </UserDashProtected> </Protected>}/>

        <Route path='/adminDashboard' element={<Protected> <AdminProtected><FilterProviderDash><AdminDashboard/></FilterProviderDash></AdminProtected> </Protected>}/>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}
