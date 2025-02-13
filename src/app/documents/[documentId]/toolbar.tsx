'use client'
import {type ColorResult, CirclePicker} from 'react-color'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import { BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListTodoIcon, LucideIcon, MessageSquareIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheck2Icon, UnderlineIcon, Undo2Icon, UploadIcon } from 'lucide-react'
import React, { useState } from 'react'
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogHeader} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { type Level } from '@tiptap/extension-heading'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



const ImageButton = () =>{
  const {editor} = useEditorStore()
  const [isDialogueOpen, setIsDialogueOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
   const [setValue] = useState(editor?.getAttributes("link").href || "")

   const onChange = (src: string) =>{
    editor?.chain().focus().setImage({src}).run()
    setValue("")
   }

   const onUpload = ()=>{
    const input = document.createElement('input')
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e)=>{
      const file = (e.target as HTMLInputElement).files?.[0];
      if(file){
        const imgUrl = URL.createObjectURL(file)
        onChange(imgUrl)
      }
    }

    input.click()
   }

   const handleImageUrlSubmit = () => {
    if(imageUrl){
      onChange(imageUrl)
      setImageUrl("")
      setIsDialogueOpen(false)
    }
   }

   return(
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
     <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" >
        <ImageIcon className='size-4 mr-2' />
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className='size-4 mr-2' />
            Upload
            </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setIsDialogueOpen(true)}>
            <SearchIcon className='size-4 mr-2' />
            Search
            </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


    <Dialog open={isDialogueOpen} onOpenChange={setIsDialogueOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image URL</DialogTitle>
        </DialogHeader>
        <Input placeholder='insert Image URL' value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} onKeyDown={(e)=>{
          if(e.key==='ENTER'){
            handleImageUrlSubmit()
          }
        }}/>
      <DialogFooter>
        <Button onClick={()=>handleImageUrlSubmit}>
          Insert
        </Button>
      </DialogFooter>
      </DialogContent>
      
    </Dialog>
    </>
  )
}



const LinkButton = () =>{
  const {editor} = useEditorStore()
   const [value, setValue] = useState(editor?.getAttributes("link").href || "")

   const onChange = (href: string) =>{
    editor?.chain().focus().extendMarkRange("link").setLink({href}).run()
    setValue("")
   }

   return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
     <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" >
        <Link2Icon className='size-4' /> 
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
          <Input placeholder='Link' value={value} onChange={(e)=>setValue(e.target.value)} />
          <Button onClick={()=>onChange(value)}>
            Apply
          </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const HighlightColorButton = ()=>{
  const {editor} = useEditorStore()
  const value = editor?.getAttributes('highlight').color || '#FFFFFF'
  const onChange = (color : ColorResult) => {
    editor?.chain().focus().setHighlight({color: color.hex}).run()
  }

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
     <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" >
        <HighlighterIcon className='size-4' /> 
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5'>
        <CirclePicker
        color={value}
          onChange={onChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
   
}



const TextVolourButton = ()=>{
    const {editor} = useEditorStore()
    const value = editor?.getAttributes('textStyle').color || '#000000'

    const onChange = (color : ColorResult) => {
      editor?.chain().focus().setColor(color.hex).run()
    }

    return(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
       <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" >
          <span className='truncate'>
            A
          </span>
          <div className='h-0.5 w-full' style={{backgroundColor: value}} />
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2.5'>
          <CirclePicker 
            color={value}
            onChange={onChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    )
     
}


const HeadingLevelButton = () =>{
  const {editor} = useEditorStore()
  const headings = [
    {label: "Normal Text", value:0, fontSize:"16px"},
    {label: "Heading 1", value:1, fontSize:"32px"},
    {label: "Heading 2", value:2, fontSize:"24px"},
    {label: "Heading 3", value:3, fontSize:"20px"},
    {label: "Heading 4", value:4, fontSize:"18px"},
    {label: "Heading 5", value:5, fontSize:"16px"},
  ]

  const getCurrentHeading = ()=>{
    for(let level =1 ;level<=5;level++){
      if(editor?.isActive("heading",{level})){
        return `Heading ${level}`
      }
    }

    return "Normal Text"
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" >
          <span className='truncate'>
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({label, value, fontSize})=>(
          <button key={value} style={{fontSize}} className={cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80', (value ===0 && !editor?.isActive("heading")) || editor?.isActive("heading", {level: value}) && "bg-neutral-200/80")} onClick={()=>{
            if(value===0){
              editor?.chain().focus().setParagraph().run()
            }
            else{
              editor?.chain().focus().toggleHeading({level:value as Level}).run()
            }
          }}>
            {label}
        </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


interface ToolbarButtonProps{
  onClick?:()=>void,
  isActive?:boolean,
  icon: LucideIcon
}

const FontFamilyButton = ()=>{
  const {editor} = useEditorStore()
  const fonts = [
    {label:"Arial", value:"Arial"},
    {label:"TimesNewRoman", value:"TimesNewRoman"},
    {label:"Courier New", value:"Courier New"},
    {label:"Geogia", value:"Geogia"},
    {label:"Verdana", value:"Verdana"},

  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm" >
          <span className='truncate'>
            {editor?.getAttributes('textStyle').fontFamily || "Ariel"}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {
          fonts.map(({label,value})=>(
            <button onClick={()=>editor?.chain().focus().setFontFamily(value).run()} key={value} className={cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80', editor?.getAttributes('textStyle').fontFamily===value && "bg-neutral-200")}
            style={{fontFamily: value}}
            >
               <span className='text-sm'>{label}</span>
            </button>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ToolbarButton = ({onClick, isActive, icon: Icon}:ToolbarButtonProps)=>{
  return(
    <button onClick= {onClick} className={cn("text-smh-7 min-2-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/80")}>
     <Icon className='size-4' />
    </button>
  )
}



const Toolbar = () => {
  const {editor} = useEditorStore()
  
  const sections : { label: string, icon: LucideIcon, onClick:()=>void, isActive?:boolean}[][] = [[
    {
      label:"Undo",
      icon: Undo2Icon,
      onClick:()=>editor?.chain().focus().undo().run()
      
      
    },
    {
      label: "Redo",
      icon: Redo2Icon,
      onClick:()=>editor?.chain().focus().redo().run()
    },
    {
      label: "Print",
      icon: PrinterIcon,
      onClick:()=>window.print()
    },
    {
      label:"Spell Check",
      icon: SpellCheck2Icon,
      onClick:()=>{
        const current = editor?.view.dom.getAttribute('spellcheck');
        editor?.view.dom.setAttribute("spellcheck", current==='false'?"true":"false")
      }
    }
  ],
  [
    {
      label:"Bold",
      icon:BoldIcon,
      isActive: editor?.isActive("bold"),
      onClick:()=>editor?.chain().focus().toggleBold().run()
    },
    {
      label:"Italic",
      icon:ItalicIcon,
      isActive: editor?.isActive("italic"),
      onClick:()=>editor?.chain().focus().toggleItalic().run()
    },
    {
      label:"Underline",
      icon:UnderlineIcon,
      isActive: editor?.isActive("underline"),
      onClick:()=>editor?.chain().focus().toggleUnderline().run()
    }
  ],
  [
    {
      label:"Comment",
      icon: MessageSquareIcon,
      onClick : ()=>editor?.chain().focus().addPendingComment().run(),
      isActive: editor?.isActive("liveblocksCommentMark")

    },
    {
      label:"ListToDo",
      icon: ListTodoIcon,
      onClick : ()=>editor?.chain().focus().toggleTaskList().run(),

    },
    {
      label:"Remove Formatting",
      icon: RemoveFormattingIcon,
      onClick : ()=>editor?.chain().focus().unsetAllMarks().run(),
      isActive: false

    },
    
  ]
]
  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-0.5 overflow-x-auto text-black'>
      {sections[0].map((item)=>(
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((item)=>(
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <TextVolourButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[2].map((item)=>(
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <LinkButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <ImageButton />
      
    </div>
    

  )
}

export default Toolbar
