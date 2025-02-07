import React from 'react'
import Editor from './editor'

const DocumentIdPage = async ({params}:{params:Promise<{documentId: string}>}) => {
    const documentId = (await params).documentId
  return (
    
    <div className='min-h-screen bg-[#FAFBFD]'>
      <Editor />
    </div>
  )
}

export default DocumentIdPage
