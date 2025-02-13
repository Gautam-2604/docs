'use client'
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import {Color} from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TextStyle from '@tiptap/extension-text-style'
import ImageResize from 'tiptap-extension-resize-image'
import TableCell from '@tiptap/extension-table-cell'
import Image from '@tiptap/extension-image'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import StarterKit from '@tiptap/starter-kit'
import FontFamily from '@tiptap/extension-font-family'
import Underline from '@tiptap/extension-underline'
import { useEditorStore } from '@/store/use-editor-store'
import Ruler from './ruler'
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from './threads'
import { useStorage } from '@liveblocks/react'

const Editor = () => {
  const leftMargin = useStorage((root)=>root.leftMargin)
  const rightMargin = useStorage((root)=>root.rightMargin)
  const liveblocks = useLiveblocksExtension();
  const {setEditor} = useEditorStore()
  const editor = useEditor({
  editorProps:{
    attributes:{
        style:`padding-left: ${leftMargin}; padding-right: ${rightMargin};`,
        class:"focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10  cursor-text"
    }
  },
  onCreate({editor}) {
      setEditor(editor )
  },
  onDestroy() {
      setEditor(null)
  },
  onSelectionUpdate({editor}) {
      setEditor(editor)
  },
  onTransaction({editor}) {
    setEditor(editor)
  },
  onFocus({editor}) {
    setEditor(editor)
  },
  onBlur({editor}) {
    setEditor(editor)
  },
  onContentError({editor}) {
    setEditor(editor)
  },
  extensions: [StarterKit.configure({history: false}), TaskItem.configure({nested: true}), TaskList, Table.configure({resizable: true}), TableRow, TableHeader, TableCell, Image, ImageResize, Underline, FontFamily, TextStyle, Color, Highlight, Link.configure({openOnClick: false,
                  autolink: true,
                  defaultProtocol: 'https',}), liveblocks],
  content: `<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td>Cyndi Lauper</td>
      <td>Singer</td>
      <td>Songwriter</td>
      <td>Actress</td>
    </tr>
  </tbody>
</table>`,
  })
  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible '>
      <Ruler />
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  )
}

export default Editor
