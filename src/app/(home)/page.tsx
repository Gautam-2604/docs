'use client'
import React from 'react'
import Navbar from './navbar'
import TemplateGallery from './template-gallery'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const Home = () => {
  const documents = useQuery(api.document.get);
  return (
    <div className='flex flex-col min-h-screen '>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <TemplateGallery />
    </div>
  )
}

export default Home
