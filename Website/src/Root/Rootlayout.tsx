import React from 'react'
import Navbar from '../commanComponenet/Navbar'
import { Outlet } from 'react-router-dom'
import Header2 from '../commanComponenet/Header2'
import Header from '../commanComponenet/Header'
import Footer from '../commanComponenet/Footer'

export default function Rootlayout() {
  return (
      <div> 
          <Header />
          <section className='container horizontalline'>
               <hr></hr>
          </section>
          <Header2 />
          <Navbar />
          <Outlet />
          <Footer />
    </div>
  )
}
