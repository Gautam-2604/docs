import React from 'react'
import Editor from './editor'
import Toolbar from './toolbar'
import Navbar from './navbar'
import { Room } from './room'

const DocumentIdPage = async () => {
  return (
    
    <div className='min-h-screen bg-[#FAFBFD]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
      <Navbar />
      <Toolbar />
      </div>
      <div className='pt-[114px] print:pt-0'>
      <Room>
      <Editor />
      </Room>
      </div>
      
    </div>
  )
}

export default DocumentIdPage
