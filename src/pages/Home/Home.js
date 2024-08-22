import React from 'react'
import { Hero } from './components/Hero'
import { FeaturedProduct } from './components/FeturedProduct'
import { Faq} from './components/Faq'
import { useTitle } from '../../hooks/useTitle'



export const Home = () => {
  useTitle("Home")
  return (
    <main>
      <Hero/>
      <FeaturedProduct/>
      <Faq/>
    </main>
  )
}
