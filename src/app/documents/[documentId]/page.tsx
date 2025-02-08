import React from 'react'
import Editor from './editor'
import Toolbar from './toolbar'

const DocumentIdPage = async ({params}:{params:Promise<{documentId: string}>}) => {
    const documentId = (await params).documentId
  return (
    
    <div className='min-h-screen bg-[#FAFBFD]'>
      <Toolbar />
      <Editor />
      
    </div>
  )
}

export default DocumentIdPage
