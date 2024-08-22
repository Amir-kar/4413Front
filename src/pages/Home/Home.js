import React from 'react'
import { Hero } from './components/Hero'
import { FeaturedProduct } from './components/FeturedProduct'
import { Testimo} from './components/Testim'
import { Faq} from './components/Faq'
import { useTitle } from '../../hooks/useTitle'



export const Home = () => {
  useTitle("Home")
  return (
    <main>
      <Hero/>
      <FeaturedProduct/>
      <Testimo/>
      <Faq/>
    </main>
  )
}
