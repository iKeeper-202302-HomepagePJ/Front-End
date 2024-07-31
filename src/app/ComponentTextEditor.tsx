'use client'

import "./globals.css";
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { EditorProvider, useEditor, EditorContent } from '@tiptap/react'

export const TextEditor = (setPost:Function) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '',
        
    })
    if (!editor) return null;
    return (
        <div className='flex flex-col w-full grow overflow-auto bg-black-500 h-fit'>
            <div className='flex bg-black rounded-lg h-[30px] w-full items-center'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <img src="/IconTextBold.svg"></img>
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    strike
                </button>
            </div>
            <div className='bg-black-200 w-full h-fit'>
                <EditorContent editor={editor} className='mt-[20px] w-full h-auto bg-black min-h-[1000px]' />
                <EditorContent editor={editor} className='mt-[20px] w-full h-auto bg-black min-h-[1000px]' />
            </div>
            <button className='text-black bg-green w-[100px] h-[50px] rounded-lg mt-[20px] justify-self-end font-bold' onClick={() => {if (editor) setPost(JSON.stringify(editor.getJSON().content));}}>제출하기</button>
        </div>
    )
}
const extensions = [
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]

/*export default function textEditor(content:any){
    return (
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} children={content}></EditorProvider>
    )
  }*/