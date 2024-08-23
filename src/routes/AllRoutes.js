import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartPage, Dashboard, Home, Login, OrderPage, PageNotFound, Products, Register } from '../pages'
import { ProductDetail } from '../pages/ProductDetails'
import { Protected,AdminProtected, UserProtected } from './Protected'
import { AdminDashboard } from '../pages/Dashboard/AdminDashboard'

import { FilterProvider, FilterProviderDash } from '../context';

export const AllRoutes = () => {


  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<FilterProvider><Products/></FilterProvider>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
        <Route path='/order' element={<Protected><OrderPage/></Protected>}/>
        <Route path='/dashboard' element={<Protected><UserProtected><Dashboard/></UserProtected></Protected>}/>
        <Route path='/adminDashboard' element={<Protected><AdminProtected><FilterProviderDash><AdminDashboard/></FilterProviderDash></AdminProtected></Protected>}/>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}
