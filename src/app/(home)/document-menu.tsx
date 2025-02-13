import { Button } from '@/components/ui/button'
import { ExternalLink, MoreVertical, TrashIcon } from 'lucide-react'
import React from 'react'
import { Id } from '../../../convex/_generated/dataModel'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { RemoveDialog } from '@/components/remove-dialog'

interface DocuemntMenuProps {
    documentId:Id<"documents">,
    title: string,
    onNewTab:(id:Id<"documents">)=>void 
}

const DocumentMenu = ({documentId, onNewTab}: DocuemntMenuProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className='rounded-full'>
                <MoreVertical className='size-4' />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <RemoveDialog documentId={documentId}>
                <DropdownMenuItem
                onSelect={(e)=>e.preventDefault ()}
                onClick={(e)=>e.stopPropagation()}
                >
                    <TrashIcon className='size-4 mr-2' />
                    Remove
                </DropdownMenuItem>
            </RemoveDialog>
            <DropdownMenuItem onClick={()=>onNewTab(documentId)}>
                <ExternalLink className='size-4 mr-2' />
                Open in new tab
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DocumentMenu
