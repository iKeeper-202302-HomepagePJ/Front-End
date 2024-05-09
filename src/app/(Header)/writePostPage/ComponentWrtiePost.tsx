"use client"

import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import { category, categoryList, headline, headlineList } from './page'
import { toggleItemBox } from '../../ComponentToggle'
import { MenuBar } from '../../ComponentTextEditor'

export default function WritePost() {
    const [nondisclosure, setNondisclosure] = useState(false);
    const [commentAllowed, setCommentAllowed] = useState(true);
    const [showToggle, setShowToggle] = useState("")
    const [openModal, setOpenModal] = useState("")
    const [selectCategory, setCategory] = useState(category)
    const [selectHeadline, setHeadline] = useState(headline)
    const [title, setTitle] = useState("")
    const [titleLength, setTitleLength] = useState(0)
    const [post, setPost] = useState("")
    const [postLength, setPostLength] = useState(0)
    const textRef = useRef<HTMLTextAreaElement | null>(null)
    /*const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]
        return  <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme='snow'
        value={Content}
        onChange={setContent}
        ref={quillRef}
        style={{
          height: '460px',
          width: '100%',
        }}
   />/*/

    /*
    
             <div className='bg-deepBlue rounded-lg w-full h-auto p-[50px] font-bold text-[20px]'>
                 <button className='h-[50px] w-full relative bg-black rounded-lg' onClick={() => setShowToggle("categoryToggle")}>{showToggle=="categoryToggle" && toggleItemBox(categoryList, selectCategory, setCategory)}{selectCategory}<img src='/IconToggle.svg'></img></button>
             </div>
    */
    return (
        <div className='flex'>
            <div className='grow w-full justify-end'>
                <div className='bg-deepBlue rounded-lg w-full grow p-[30px] space-y-[20px]'>
                    <div className='w-full flex'>
                        <button className='relative w-[350px] grow h-[50px] bg-black rounded-lg text-[20px] bold flex items-center justify-between px-[10px]' onClick={() => setShowToggle("category")}>
                            <div className='w-full truncate text-left'>{selectCategory}</div>
                            <img src='/IconToggle.svg' />{showToggle == "category" && toggleItemBox(categoryList, selectCategory, setCategory, setShowToggle, 'h-[50px] text-[20px] font-bold')}
                        </button>
                        <button className='relative w-[300px] h-[50px] ml-[20px] bg-black rounded-lg text-[20px] bold flex items-center justify-between px-[10px]' onClick={() => setShowToggle("headline")}>
                            <div className='w-full truncate text-left'>{selectHeadline}</div>
                            <img src='/IconToggle.svg' />{showToggle == "headline" && toggleItemBox(headlineList, selectHeadline, setHeadline, setShowToggle, 'h-[50px] text-[20px] font-bold')}
                        </button>
                    </div>
                    <div className="w-full h-[50px] bg-black text-white text-[20px] rounded-lg py-[10px] px-[10px] flex items-center">
                        <textarea placeholder="제목을 입력하세요." rows={1} maxLength={500} className={`w-full h-full bg-black resize-none text-white w-full`} onChange={(e) => { setTitle(e.target.value); setTitleLength(e.target.textLength) }} />
                        <div className="w-auto whitespace-pre text-gray-400 text-[16px]">{`${titleLength} / 100 자`}</div>
                    </div>
                    {<div className='w-full h-fit flex '>
                        {MenuBar()}
                    </div>}
                    {false && <div className="bg-black w-full h-auto min-h-[50px] rounded-lg py-[10px] px-[10px] text-[16px]">
                        <textarea placeholder="내용을 입력하세요." rows={5} maxLength={750} ref={textRef} className={`resize-none bg-black text-white w-full h-auto min-h-[500px]`} onChange={(e) => { setPost(e.target.value); if (textRef.current) { textRef.current.style.height = "0px"; textRef.current.style.height = `${textRef.current.scrollHeight}px` }; setPostLength(e.target.textLength) }} />
                        <div className="w-full text-gray-400 text-[16px] text-right">{`${postLength} / 5000 자`}</div>
                    </div>}
                </div>
                <button className='text-black bg-green w-[100px] h-[50px] rounded-lg mt-[20px] justify-self-end font-bold'>제출하기</button>
            </div>
            <div className='bg-deepBlue rounded-lg w-[300px] h-auto ml-[50px] p-[20px]'>
                <div className='flex content-center rounded-lg bg-black p-[7px] w-auto h-auto' >
                    <input id={`nondisclosureSetting`} type="checkbox" value="" checked={nondisclosure} className="w-[20px] h-[20px] rounded mr-[10px]" onClick={() => { (setNondisclosure(!nondisclosure)) }}></input>
                    비공개
                </div>
                <div className='flex content-center rounded-lg mt-[20px] bg-black p-[7px] w-auto h-auto' >
                    <input id={`nondisclosureSetting`} type="checkbox" value="" checked={commentAllowed} className="w-[20px] h-[20px] rounded mr-[10px]" onClick={() => { (setCommentAllowed(!commentAllowed)) }}></input>
                    댓글 비허용
                </div>
            </div>
        </div>
    )
}