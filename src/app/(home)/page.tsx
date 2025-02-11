'use client'
import React from 'react'
import Navbar from './navbar'
import TemplateGallery from './template-gallery'
import { usePaginatedQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import DocumentsTable from './documents-table'

const Home = () => {
  const {results, status, loadMore} =  usePaginatedQuery(api.documents.get,{},{initialNumItems:5});
  

  return (
    <div className='flex flex-col min-h-screen '>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <TemplateGallery />
      <DocumentsTable
      documents={results}
      loadMore={loadMore}
      status={status}
      />
    </div>
  )
}

export default Home
