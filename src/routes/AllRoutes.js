import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartPage, Dashboard, Home, Login, OrderPage, PageNotFound, Products, Register } from '../pages'
import { ProductDetail } from '../pages/ProductDetails'
import { Protected } from './Protected'
import { AdminProtected } from './AdminProtected'
import { AdminDashboard } from '../pages/Dashboard/AdminDashboard'

export const AllRoutes = () => {


  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
        <Route path='/order' element={<Protected><OrderPage/></Protected>}/>
        <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}/>
        <Route path='/adminDashboard' element={<Protected><AdminProtected><AdminDashboard/></AdminProtected></Protected>}/>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}
