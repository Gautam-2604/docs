'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DocumentInput from './document-input'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'
import { FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, PrinterIcon, TrashIcon } from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'
import { useEditorStore } from '@/store/use-editor-store'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Avatars } from './avatars'







const Navbar = () => {
    const {editor} = useEditorStore()

const onDownload = (blob: Blob, filename: string)=>{
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url ;
    a.download= filename;
    a.click()


     
}

const onSaveJSON = ()=>{
    if(!editor){
        return;
    }
    const content = editor.getJSON()
    const blob = new Blob([JSON.stringify(content)],{
        type:"application/json"
    })
    onDownload(blob, `document.json`)

}
const onSaveText = ()=>{
    if(!editor){
        return;
    }
    const content = editor.getText()
    const blob = new Blob([JSON.stringify(content)],{
        type:"text/plain"
    })
    onDownload(blob, `document.txt`)

}
const onSaveHTML = ()=>{
    if(!editor){
        return;
    }
    const content = editor.getHTML()
    const blob = new Blob([content],{
        type:"text/html"
    })
    onDownload(blob, `document.html`)

}
  return (
    <nav className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <Link href="/">
                <Image src="/vercel.svg" alt="Logo" width={36} height={36} />
            </Link>
            <div className='flex flex-col '>
                <DocumentInput />
                <div className='flex'>
                    <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5px px-[7px] rounded-sm hover:bg-muted h-auto'>
                                File
                            </MenubarTrigger>
                            <MenubarContent className='print:hidden'>
                                <MenubarSub>
                                    <MenubarSubTrigger> 
                                    <FileIcon className='size-4 mr-2' />
                                    Save
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={onSaveJSON}>
                                            <FileJsonIcon className='size-4 mr-2' />
                                            JSON
                                        </MenubarItem>
                                        <MenubarItem onClick={onSaveHTML}> 
                                            <GlobeIcon  className='size-4 mr-2' />
                                            HTML
                                        </MenubarItem>
                                        <MenubarItem onClick={()=>window.print()}>
                                            <BsFilePdf className='size-4 mr-2' />
                                            PDF
                                        </MenubarItem>
                                        <MenubarItem onClick={onSaveText}>
                                            <FileTextIcon className='size-4 mr-2' />
                                            Text
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarItem>
                                    <FilePlusIcon className='size-4 mr-2' />
                                    New Document
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <FilePenIcon className='size-4 mr-2' />
                                    Rename
                                </MenubarItem>
                                <MenubarItem>
                                    <TrashIcon className='size-4 mr-2' />
                                    Remove
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem onClick={()=>window.print()}>
                                    <PrinterIcon className='size-4 mr-2' />
                                    Print
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5px px-[7px] rounded-sm hover:bg-muted h-auto'>
                                Edit
                            </MenubarTrigger>
                            
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5px px-[7px] rounded-sm hover:bg-muted h-auto'>
                                Insert
                            </MenubarTrigger>
                            
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className='text-sm font-normal py-0.5px px-[7px] rounded-sm hover:bg-muted h-auto'>
                                Format
                            </MenubarTrigger>
                            
                        </MenubarMenu>
                    </Menubar>

                </div>
            </div>
        </div>
        <div className='flex gap-3 items-center pl-6'>
            <Avatars />
        <OrganizationSwitcher
        afterCreateOrganizationUrl="/"
        afterLeaveOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        afterSelectPersonalUrl="/"
         />
        <UserButton />
        </div>

    </nav>
  )
}

export default Navbar
